"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { users, companies, postings, types, subtitles, contents, tags } = require('./access');
const { handlePostData, handlePostDatas, handleCompanyDatas } = require('./helper');
const postingService = {
    create: async (postingData) => {
        const typeData = await types.findByName(postingData.theme);
        if (!typeData) {
            return {
                success: false,
                payload: null,
                message: "can't find theme",
            };
        }
        postingData.type_id = typeData.id;
        const postCreate = await postings.create(postingData);
        if (!postCreate) {
            return {
                success: false,
                payload: null,
                message: 'error occurred',
            };
        }
        const post_id = postCreate.id;
        const subtDatas = await subtitles.findByTypeid(typeData.id);
        for (let subtitle of subtDatas) {
            const { name, id } = subtitle;
            const content = postingData.content[name];
            const contentCreate = await contents.create(post_id, id, content);
            if (!contentCreate) {
                const postDelete = await postings.delete(post_id);
                if (!postDelete) {
                    return {
                        success: false,
                        payload: null,
                        message: "can't create content, can't delete post",
                    };
                }
                return {
                    success: false,
                    payload: null,
                    message: "can't create content",
                };
            }
        }
        return {
            success: true,
            payload: postCreate,
            message: 'created',
        };
    },
    find: async (post_id) => {
        let postRecord = await postings.findById(post_id);
        if (!postRecord) {
            return {
                success: false,
                payload: null,
                message: "can't find post",
            };
        }
        let postData = handlePostData(postRecord);
        const userData = await users.findById(postData.user_id);
        if (userData) {
            postData.user = {
                email: userData.email,
                username: userData.username,
                position: userData.position,
                certificate: userData.certificate,
            };
        }
        return {
            success: true,
            payload: postData,
            message: 'successfully found',
        };
    },
    getHome: async () => {
        let data = {};
        let newPostDatas = await postings.findByNew(10);
        if (!newPostDatas) {
            return {
                success: false,
                payload: null,
                message: "can't find new posts",
            };
        }
        data.new_post = handlePostDatas(newPostDatas);
        let ManyLikePostDatas = await postings.findByManyLike(10);
        if (!ManyLikePostDatas) {
            return {
                success: false,
                payload: null,
                message: "can't find recommended posts",
            };
        }
        data.recommended_post = handlePostDatas(ManyLikePostDatas);
        let newCompanies = await companies.findByNew(10);
        if (!newCompanies) {
            return {
                success: false,
                payload: null,
                message: "can't find companies",
            };
        }
        data.new_companies = handleCompanyDatas(newCompanies);
        return {
            success: true,
            payload: data,
            message: 'success',
        };
    },
    findBlog: async (user_id) => {
        let blogPostDatas = {};
        const typeDatas = await types.findAll();
        if (!typeDatas) {
            return {
                success: false,
                payload: null,
                message: "can't find types",
            };
        }
        for (let typeData of typeDatas) {
            let themePostDatas = await postings.findByUserTheme(user_id, typeData.id);
            if (!themePostDatas) {
                return {
                    success: false,
                    payload: null,
                    message: "can't find post",
                };
            }
            blogPostDatas[typeData.name + '_posts'] = handlePostDatas(themePostDatas);
        }
        return {
            success: true,
            payload: blogPostDatas,
            message: 'all posts found',
        };
    },
    findByUser: async (user_id) => {
        let userPostDatas = await postings.findByUser(user_id);
        if (!userPostDatas) {
            return {
                success: false,
                payload: null,
                message: "can't find post",
            };
        }
        return {
            success: true,
            payload: userPostDatas,
            message: 'all posts found',
        };
    },
    addTags: async (post_id, selected_tags) => {
        let tagDatas = [];
        for (let tag_name of selected_tags) {
            const findTag = await tags.findByName(tag_name);
            if (!findTag) {
                return {
                    success: false,
                    payload: null,
                    message: "can't find tag",
                };
            }
            tagDatas.push({
                post_id,
                tag_id: findTag.id,
            });
        }
        const addTag = await tags.addPTTags(tagDatas);
        if (!addTag) {
            return {
                success: false,
                payload: null,
                message: "can't put tags in",
            };
        }
        return {
            success: true,
            payload: null,
            message: 'successfully taged',
        };
    },
    like: async (post_id) => {
        const likeResult = await postings.increaseLike(post_id);
        if (!likeResult) {
            return {
                success: false,
                payload: null,
                message: "There's an error while like",
            };
        }
        return {
            success: true,
            payload: likeResult,
            message: 'post liked',
        };
    },
    unlike: async (post_id) => {
        const unLikeResult = await postings.decreaseLike(post_id);
        if (!unLikeResult) {
            return {
                success: false,
                payload: null,
                message: "There's an error while undo like",
            };
        }
        return {
            success: true,
            payload: unLikeResult,
            message: 'post unliked',
        };
    },
    update: async (user_id, postingData) => {
        const { id, title, content } = postingData;
        const postData = await postings.findById(id);
        if (!postData) {
            return {
                success: false,
                payload: null,
                message: "can't find post",
            };
        }
        if (postData.user_id !== user_id) {
            return {
                success: false,
                payload: null,
                message: 'it is not your post',
            };
        }
        const contentDatas = await contents.findByPostId(id);
        if (!contentDatas) {
            return {
                success: false,
                payload: null,
                message: "can't find content",
            };
        }
        for (let element of contentDatas) {
            if (element.Subtitle.name in content) {
                element.body = content[element.Subtitle.name];
                const updateContents = await contents.update(element);
                if (!updateContents) {
                    return {
                        success: false,
                        payload: null,
                        message: 'fail to update',
                    };
                }
            }
        }
        const deleteTags = await tags.deleteByPostId(id);
        const updateTitles = await postings.updateTitleById(id, title);
        if (!updateTitles) {
            return {
                success: false,
                payload: null,
                message: 'fail to update title',
            };
        }
        return {
            success: true,
            payload: null,
            message: 'post updated',
        };
    },
    delete: async (post_id) => {
        const deleteTags = await tags.deleteByPostId(post_id);
        const deleteContents = await contents.deleteByPostId(post_id);
        const deleteResult = await postings.delete(post_id);
        return {
            success: true,
            payload: deleteResult,
            message: 'deleted',
        };
    },
    test: async (id) => {
        let contentDatas = await contents.findByPostId(id);
        return {
            success: true,
            payload: contentDatas,
            message: 'deleted',
        };
    },
};
module.exports = postingService;
