(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/cors/lib/index.js":
/*!*****************************************!*\
  !*** ../node_modules/cors/lib/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("(function () {\n\n  'use strict';\n\n  var assign = __webpack_require__(/*! object-assign */ \"object-assign\");\n  var vary = __webpack_require__(/*! vary */ \"vary\");\n\n  var defaults = {\n    origin: '*',\n    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',\n    preflightContinue: false,\n    optionsSuccessStatus: 204\n  };\n\n  function isString(s) {\n    return typeof s === 'string' || s instanceof String;\n  }\n\n  function isOriginAllowed(origin, allowedOrigin) {\n    if (Array.isArray(allowedOrigin)) {\n      for (var i = 0; i < allowedOrigin.length; ++i) {\n        if (isOriginAllowed(origin, allowedOrigin[i])) {\n          return true;\n        }\n      }\n      return false;\n    } else if (isString(allowedOrigin)) {\n      return origin === allowedOrigin;\n    } else if (allowedOrigin instanceof RegExp) {\n      return allowedOrigin.test(origin);\n    } else {\n      return !!allowedOrigin;\n    }\n  }\n\n  function configureOrigin(options, req) {\n    var requestOrigin = req.headers.origin,\n      headers = [],\n      isAllowed;\n\n    if (!options.origin || options.origin === '*') {\n      // allow any origin\n      headers.push([{\n        key: 'Access-Control-Allow-Origin',\n        value: '*'\n      }]);\n    } else if (isString(options.origin)) {\n      // fixed origin\n      headers.push([{\n        key: 'Access-Control-Allow-Origin',\n        value: options.origin\n      }]);\n      headers.push([{\n        key: 'Vary',\n        value: 'Origin'\n      }]);\n    } else {\n      isAllowed = isOriginAllowed(requestOrigin, options.origin);\n      // reflect origin\n      headers.push([{\n        key: 'Access-Control-Allow-Origin',\n        value: isAllowed ? requestOrigin : false\n      }]);\n      headers.push([{\n        key: 'Vary',\n        value: 'Origin'\n      }]);\n    }\n\n    return headers;\n  }\n\n  function configureMethods(options) {\n    var methods = options.methods;\n    if (methods.join) {\n      methods = options.methods.join(','); // .methods is an array, so turn it into a string\n    }\n    return {\n      key: 'Access-Control-Allow-Methods',\n      value: methods\n    };\n  }\n\n  function configureCredentials(options) {\n    if (options.credentials === true) {\n      return {\n        key: 'Access-Control-Allow-Credentials',\n        value: 'true'\n      };\n    }\n    return null;\n  }\n\n  function configureAllowedHeaders(options, req) {\n    var allowedHeaders = options.allowedHeaders || options.headers;\n    var headers = [];\n\n    if (!allowedHeaders) {\n      allowedHeaders = req.headers['access-control-request-headers']; // .headers wasn't specified, so reflect the request headers\n      headers.push([{\n        key: 'Vary',\n        value: 'Access-Control-Request-Headers'\n      }]);\n    } else if (allowedHeaders.join) {\n      allowedHeaders = allowedHeaders.join(','); // .headers is an array, so turn it into a string\n    }\n    if (allowedHeaders && allowedHeaders.length) {\n      headers.push([{\n        key: 'Access-Control-Allow-Headers',\n        value: allowedHeaders\n      }]);\n    }\n\n    return headers;\n  }\n\n  function configureExposedHeaders(options) {\n    var headers = options.exposedHeaders;\n    if (!headers) {\n      return null;\n    } else if (headers.join) {\n      headers = headers.join(','); // .headers is an array, so turn it into a string\n    }\n    if (headers && headers.length) {\n      return {\n        key: 'Access-Control-Expose-Headers',\n        value: headers\n      };\n    }\n    return null;\n  }\n\n  function configureMaxAge(options) {\n    var maxAge = (typeof options.maxAge === 'number' || options.maxAge) && options.maxAge.toString()\n    if (maxAge && maxAge.length) {\n      return {\n        key: 'Access-Control-Max-Age',\n        value: maxAge\n      };\n    }\n    return null;\n  }\n\n  function applyHeaders(headers, res) {\n    for (var i = 0, n = headers.length; i < n; i++) {\n      var header = headers[i];\n      if (header) {\n        if (Array.isArray(header)) {\n          applyHeaders(header, res);\n        } else if (header.key === 'Vary' && header.value) {\n          vary(res, header.value);\n        } else if (header.value) {\n          res.setHeader(header.key, header.value);\n        }\n      }\n    }\n  }\n\n  function cors(options, req, res, next) {\n    var headers = [],\n      method = req.method && req.method.toUpperCase && req.method.toUpperCase();\n\n    if (method === 'OPTIONS') {\n      // preflight\n      headers.push(configureOrigin(options, req));\n      headers.push(configureCredentials(options, req));\n      headers.push(configureMethods(options, req));\n      headers.push(configureAllowedHeaders(options, req));\n      headers.push(configureMaxAge(options, req));\n      headers.push(configureExposedHeaders(options, req));\n      applyHeaders(headers, res);\n\n      if (options.preflightContinue) {\n        next();\n      } else {\n        // Safari (and potentially other browsers) need content-length 0,\n        //   for 204 or they just hang waiting for a body\n        res.statusCode = options.optionsSuccessStatus;\n        res.setHeader('Content-Length', '0');\n        res.end();\n      }\n    } else {\n      // actual response\n      headers.push(configureOrigin(options, req));\n      headers.push(configureCredentials(options, req));\n      headers.push(configureExposedHeaders(options, req));\n      applyHeaders(headers, res);\n      next();\n    }\n  }\n\n  function middlewareWrapper(o) {\n    // if options are static (either via defaults or custom options passed in), wrap in a function\n    var optionsCallback = null;\n    if (typeof o === 'function') {\n      optionsCallback = o;\n    } else {\n      optionsCallback = function (req, cb) {\n        cb(null, o);\n      };\n    }\n\n    return function corsMiddleware(req, res, next) {\n      optionsCallback(req, function (err, options) {\n        if (err) {\n          next(err);\n        } else {\n          var corsOptions = assign({}, defaults, options);\n          var originCallback = null;\n          if (corsOptions.origin && typeof corsOptions.origin === 'function') {\n            originCallback = corsOptions.origin;\n          } else if (corsOptions.origin) {\n            originCallback = function (origin, cb) {\n              cb(null, corsOptions.origin);\n            };\n          }\n\n          if (originCallback) {\n            originCallback(req.headers.origin, function (err2, origin) {\n              if (err2 || !origin) {\n                next(err2);\n              } else {\n                corsOptions.origin = origin;\n                cors(corsOptions, req, res, next);\n              }\n            });\n          } else {\n            next();\n          }\n        }\n      });\n    };\n  }\n\n  // can pass either an options hash, an options delegate, or nothing\n  module.exports = middlewareWrapper;\n\n}());\n\n\n//# sourceURL=webpack:///../node_modules/cors/lib/index.js?");

/***/ }),

/***/ "../node_modules/express-async-handler/index.js":
/*!******************************************************!*\
  !*** ../node_modules/express-async-handler/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const asyncUtil = fn =>\nfunction asyncUtilWrap(...args) {\n  const fnReturn = fn(...args)\n  const next = args[args.length-1]\n  return Promise.resolve(fnReturn).catch(next)\n}\n\nmodule.exports = asyncUtil\n\n\n//# sourceURL=webpack:///../node_modules/express-async-handler/index.js?");

/***/ }),

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst express = __webpack_require__(/*! express */ \"express\");\n\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nconst cors = __webpack_require__(/*! cors */ \"../node_modules/cors/lib/index.js\");\n\nconst session = __webpack_require__(/*! express-session */ \"express-session\");\n\nconst cookieParser = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n\nconst morgan = __webpack_require__(/*! morgan */ \"morgan\");\n\nconst router = __webpack_require__(/*! ./routes */ \"./routes/index.js\");\n\nconst app = express();\nconst port = 3001;\napp.use(session({\n  secret: '@warrmansion',\n  resave: false,\n  saveUninitialized: true\n}));\napp.use(cookieParser());\napp.use(bodyParser.json());\napp.use(bodyParser.urlencoded({\n  extended: false\n}));\napp.use(cors({\n  origin: ['http://localhost:3000'],\n  methods: ['GET', 'POST'],\n  credentials: true\n}));\napp.use(morgan('dev'));\napp.use('/', router);\napp.set('port', port);\napp.listen(app.get('port'), () => {\n  console.log(`app is listening in PORT ${app.get('port')}`);\n});\nmodule.exports = app;\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./controller/auth/csignin.js":
/*!************************************!*\
  !*** ./controller/auth/csignin.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {\n  function adopt(value) {\n    return value instanceof P ? value : new P(function (resolve) {\n      resolve(value);\n    });\n  }\n\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function step(result) {\n      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);\n    }\n\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\nconst asyncHandler = __webpack_require__(/*! express-async-handler */ \"../node_modules/express-async-handler/index.js\");\n\nconst {\n  tokenGenerator\n} = __webpack_require__(/*! ../../utils/token */ \"./utils/token.js\");\n\nconst {\n  companyService\n} = __webpack_require__(/*! ../../services */ \"./services/index.js\");\n\nmodule.exports = {\n  post: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const {\n      company_code,\n      email,\n      username,\n      password\n    } = req.body;\n    const emailOrUsername = email || username;\n    const signinResult = yield companyService.signin(company_code, emailOrUsername, password);\n\n    if (!signinResult.success) {\n      res.status(404).send(signinResult.message);\n      return;\n    }\n\n    const token = yield tokenGenerator({\n      email: signinResult.payload.email,\n      password: signinResult.payload.password,\n      user_type: 'company'\n    });\n    res.cookie('token', token).status(200).send({\n      message: 'Token generated'\n    });\n  }))\n};\n\n//# sourceURL=webpack:///./controller/auth/csignin.js?");

/***/ }),

/***/ "./controller/auth/csignup.js":
/*!************************************!*\
  !*** ./controller/auth/csignup.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {\n  function adopt(value) {\n    return value instanceof P ? value : new P(function (resolve) {\n      resolve(value);\n    });\n  }\n\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function step(result) {\n      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);\n    }\n\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\nconst asyncHandler = __webpack_require__(/*! express-async-handler */ \"../node_modules/express-async-handler/index.js\");\n\nconst {\n  companyService\n} = __webpack_require__(/*! ../../services */ \"./services/index.js\");\n\nmodule.exports = {\n  post: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const companyData = req.body;\n    const SigninResult = yield companyService.signup(companyData);\n\n    if (!SigninResult.success) {\n      res.status(409).send(SigninResult.message);\n      return;\n    }\n\n    const company_id = SigninResult.payload.id;\n    res.status(200).send({\n      company_id,\n      message: 'Company successfully created!'\n    });\n  }))\n};\n\n//# sourceURL=webpack:///./controller/auth/csignup.js?");

/***/ }),

/***/ "./controller/auth/duplicate.js":
/*!**************************************!*\
  !*** ./controller/auth/duplicate.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {\n  function adopt(value) {\n    return value instanceof P ? value : new P(function (resolve) {\n      resolve(value);\n    });\n  }\n\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function step(result) {\n      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);\n    }\n\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\nconst asyncHandler = __webpack_require__(/*! express-async-handler */ \"../node_modules/express-async-handler/index.js\");\n\nconst {\n  userService\n} = __webpack_require__(/*! ../../services */ \"./services/index.js\");\n\nmodule.exports = {\n  post: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const email = req.body.email;\n    const re = /^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$/;\n\n    if (!re.test(String(email).toLowerCase())) {\n      res.status(400).send('It is not email');\n    }\n\n    let userResult = yield userService.checkEmail(email);\n\n    if (!userResult.success) {\n      res.status(400).send(`This email has already joined`);\n      return;\n    }\n\n    res.status(200).send(`This email is usable!`);\n  }))\n};\n\n//# sourceURL=webpack:///./controller/auth/duplicate.js?");

/***/ }),

/***/ "./controller/auth/index.js":
/*!**********************************!*\
  !*** ./controller/auth/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n  signin: __webpack_require__(/*! ./signin */ \"./controller/auth/signin.js\"),\n  signout: __webpack_require__(/*! ./signout */ \"./controller/auth/signout.js\"),\n  signup: __webpack_require__(/*! ./signup */ \"./controller/auth/signup.js\"),\n  duplicate: __webpack_require__(/*! ./duplicate */ \"./controller/auth/duplicate.js\"),\n  csignup: __webpack_require__(/*! ./csignup */ \"./controller/auth/csignup.js\"),\n  csignin: __webpack_require__(/*! ./csignin */ \"./controller/auth/csignin.js\")\n};\n\n//# sourceURL=webpack:///./controller/auth/index.js?");

/***/ }),

/***/ "./controller/auth/signin.js":
/*!***********************************!*\
  !*** ./controller/auth/signin.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {\n  function adopt(value) {\n    return value instanceof P ? value : new P(function (resolve) {\n      resolve(value);\n    });\n  }\n\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function step(result) {\n      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);\n    }\n\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\nconst asyncHandler = __webpack_require__(/*! express-async-handler */ \"../node_modules/express-async-handler/index.js\");\n\nconst {\n  tokenGenerator\n} = __webpack_require__(/*! ../../utils/token */ \"./utils/token.js\");\n\nconst {\n  userService\n} = __webpack_require__(/*! ../../services */ \"./services/index.js\");\n\nmodule.exports = {\n  post: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const {\n      email,\n      username,\n      password\n    } = req.body;\n    const emailOrUsername = email || username;\n    const userData = yield userService.signin(emailOrUsername, password);\n\n    if (!userData.success) {\n      res.status(404).send(`User with ${emailOrUsername} doesn't exist`);\n      return;\n    }\n\n    if (!userData.payload) {\n      res.status(403).send(`wrong password`);\n      return;\n    }\n\n    const token = yield tokenGenerator({\n      email: userData.payload.email,\n      password: userData.payload.password,\n      user_type: 'developer'\n    });\n    let resBody = {\n      message: 'Token generated'\n    };\n\n    if (userData.payload.company_id) {\n      resBody.isCompanyUser = true;\n    }\n\n    res.cookie('token', token).status(200).send(resBody);\n  }))\n};\n\n//# sourceURL=webpack:///./controller/auth/signin.js?");

/***/ }),

/***/ "./controller/auth/signout.js":
/*!************************************!*\
  !*** ./controller/auth/signout.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  post: (req, res) => {\n    res.clearCookie('token').status(200).send('ok');\n  }\n};\n\n//# sourceURL=webpack:///./controller/auth/signout.js?");

/***/ }),

/***/ "./controller/auth/signup.js":
/*!***********************************!*\
  !*** ./controller/auth/signup.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {\n  function adopt(value) {\n    return value instanceof P ? value : new P(function (resolve) {\n      resolve(value);\n    });\n  }\n\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function step(result) {\n      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);\n    }\n\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\nconst asyncHandler = __webpack_require__(/*! express-async-handler */ \"../node_modules/express-async-handler/index.js\");\n\nconst {\n  userService\n} = __webpack_require__(/*! ../../services */ \"./services/index.js\");\n\nmodule.exports = {\n  post: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const userData = req.body;\n    const result = yield userService.signup(userData);\n\n    if (!result.success) {\n      if (result.message === 'duplicated') {\n        res.status(409).send('User already exists');\n        return;\n      } else {\n        res.sendStatus(500);\n        return;\n      }\n    }\n\n    res.status(200).send('User successfully created!');\n  }))\n};\n\n//# sourceURL=webpack:///./controller/auth/signup.js?");

/***/ }),

/***/ "./controller/blog/index.js":
/*!**********************************!*\
  !*** ./controller/blog/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n  main: __webpack_require__(/*! ./main */ \"./controller/blog/main.js\")\n};\n\n//# sourceURL=webpack:///./controller/blog/index.js?");

/***/ }),

/***/ "./controller/blog/main.js":
/*!*********************************!*\
  !*** ./controller/blog/main.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {\n  function adopt(value) {\n    return value instanceof P ? value : new P(function (resolve) {\n      resolve(value);\n    });\n  }\n\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function step(result) {\n      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);\n    }\n\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\nconst asyncHandler = __webpack_require__(/*! express-async-handler */ \"../node_modules/express-async-handler/index.js\");\n\nconst {\n  userService,\n  postingService\n} = __webpack_require__(/*! ../../services */ \"./services/index.js\");\n\nmodule.exports = {\n  get: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const {\n      token\n    } = req.cookies;\n    const userResult = yield userService.findByToken(token);\n\n    if (!userResult.success) {\n      res.status(403).send('login required');\n      return;\n    }\n\n    let userData = userResult.payload;\n    let blogPostDatas = yield postingService.findBlog(userData.id);\n    res.status(200).send(blogPostDatas.payload);\n  }))\n};\n\n//# sourceURL=webpack:///./controller/blog/main.js?");

/***/ }),

/***/ "./controller/company/index.js":
/*!*************************************!*\
  !*** ./controller/company/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {\n  function adopt(value) {\n    return value instanceof P ? value : new P(function (resolve) {\n      resolve(value);\n    });\n  }\n\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function step(result) {\n      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);\n    }\n\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\nconst asyncHandler = __webpack_require__(/*! express-async-handler */ \"../node_modules/express-async-handler/index.js\");\n\nconst {\n  userService,\n  companyService\n} = __webpack_require__(/*! ../../services */ \"./services/index.js\");\n\nmodule.exports = {\n  get: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const {\n      token\n    } = req.cookies;\n    const userData = yield userService.findByToken(token);\n    const findCompanyResult = yield companyService.find(userData.payload.company_id);\n\n    if (!findCompanyResult.success) {\n      res.status(404).send(`There's an error while finding your company`);\n      return;\n    }\n\n    let companyData = findCompanyResult.payload;\n    companyData.Users = companyData.Users.map(user => {\n      if (user.id === userData.payload.id) {\n        user.dataValues.isUser = true;\n      }\n\n      return user;\n    });\n    const developerDatas = yield companyService.findDeveloper(companyData.id);\n\n    if (!developerDatas.success) {\n      res.status(404).send(`There's an error while finding developers`);\n      return;\n    }\n\n    companyData.recommended_developers = developerDatas.payload;\n    res.status(200).send(companyData);\n  })),\n  put: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const companyUpdateData = req.body;\n    const {\n      company_tags\n    } = companyUpdateData;\n    const {\n      token\n    } = req.cookies;\n    const userResult = yield userService.findByToken(token);\n\n    if (!userResult.success) {\n      res.status(403).send('login required');\n      return;\n    }\n\n    if (userResult.payload.company_id !== companyUpdateData.id) {\n      res.status(403).send(\"you're not company user\");\n      return;\n    }\n\n    const companyUpdateResult = yield companyService.update(companyUpdateData);\n\n    if (!companyUpdateResult.success) {\n      res.status(404).send(companyUpdateResult.message);\n      return;\n    }\n\n    const company_id = companyUpdateData.id;\n    const updateTagResult = yield companyService.addTags(company_id, company_tags);\n\n    if (!updateTagResult.success) {\n      res.status(404).send(updateTagResult.message);\n      return;\n    }\n\n    res.status(200).send('Company successfully updated');\n  })),\n  member: __webpack_require__(/*! ./member */ \"./controller/company/member.js\"),\n  memberbyid: __webpack_require__(/*! ./memberbyid */ \"./controller/company/memberbyid.js\")\n};\n\n//# sourceURL=webpack:///./controller/company/index.js?");

/***/ }),

/***/ "./controller/company/member.js":
/*!**************************************!*\
  !*** ./controller/company/member.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {\n  function adopt(value) {\n    return value instanceof P ? value : new P(function (resolve) {\n      resolve(value);\n    });\n  }\n\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function step(result) {\n      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);\n    }\n\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\nconst asyncHandler = __webpack_require__(/*! express-async-handler */ \"../node_modules/express-async-handler/index.js\");\n\nconst {\n  userService,\n  companyService\n} = __webpack_require__(/*! ../../services */ \"./services/index.js\");\n\nmodule.exports = {\n  put: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const {\n      token\n    } = req.cookies;\n    const userUpdateData = req.body;\n    const userResult = yield userService.findByToken(token);\n\n    if (!userResult.success) {\n      res.status(403).send('login required');\n      return;\n    }\n\n    const findCompanyResult = yield companyService.find(userResult.payload.company_id);\n\n    if (!findCompanyResult.success) {\n      res.status(404).send(`There's an error while finding your company`);\n      return;\n    }\n\n    if (userResult.payload.company_id === findCompanyResult.payload.id) {\n      const userUpdateResult = yield userService.updatebyId(userUpdateData);\n\n      if (!userUpdateResult.success) {\n        res.status(404).send(userUpdateResult.message);\n        return;\n      }\n    } else {\n      res.status(404).send('it is not your company');\n      return;\n    }\n\n    res.status(200).send('Member successfully updated');\n  })),\n  delete: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const {\n      token\n    } = req.cookies;\n    const {\n      user_id\n    } = req.body;\n    const userResult = yield userService.findByToken(token);\n\n    if (!userResult.success) {\n      res.status(403).send('login required');\n      return;\n    }\n\n    const findCompanyResult = yield companyService.find(userResult.payload.company_id);\n\n    if (!findCompanyResult.success) {\n      res.status(404).send(`There's an error while finding your company`);\n      return;\n    }\n\n    if (userResult.payload.company_id === findCompanyResult.payload.id) {\n      const userDeleteResult = yield userService.delete(user_id);\n\n      if (!userDeleteResult.success) {\n        res.status(404).send(userDeleteResult.message);\n        return;\n      }\n    } else {\n      res.status(404).send('it is not your company');\n      return;\n    }\n\n    res.status(200).send('Member successfully deleted');\n  }))\n};\n\n//# sourceURL=webpack:///./controller/company/member.js?");

/***/ }),

/***/ "./controller/company/memberbyid.js":
/*!******************************************!*\
  !*** ./controller/company/memberbyid.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {\n  function adopt(value) {\n    return value instanceof P ? value : new P(function (resolve) {\n      resolve(value);\n    });\n  }\n\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function step(result) {\n      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);\n    }\n\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\nconst asyncHandler = __webpack_require__(/*! express-async-handler */ \"../node_modules/express-async-handler/index.js\");\n\nconst {\n  userService,\n  companyService\n} = __webpack_require__(/*! ../../services */ \"./services/index.js\");\n\nmodule.exports = {\n  delete: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const {\n      token\n    } = req.cookies;\n    const id = req.params.id;\n    const userResult = yield userService.findByToken(token);\n\n    if (!userResult.success) {\n      res.status(403).send('login required');\n      return;\n    }\n\n    const findCompanyResult = yield companyService.find(userResult.payload.company_id);\n\n    if (!findCompanyResult.success) {\n      res.status(404).send(`There's an error while finding your company`);\n      return;\n    }\n\n    if (userResult.payload.company_id === findCompanyResult.payload.id) {\n      const userDeleteResult = yield userService.delete(id);\n\n      if (!userDeleteResult.success) {\n        res.status(404).send(userDeleteResult.message);\n        return;\n      }\n    } else {\n      res.status(404).send('it is not your company');\n      return;\n    }\n\n    res.status(200).send('Member successfully deleted');\n  }))\n};\n\n//# sourceURL=webpack:///./controller/company/memberbyid.js?");

/***/ }),

/***/ "./controller/home/index.js":
/*!**********************************!*\
  !*** ./controller/home/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {\n  function adopt(value) {\n    return value instanceof P ? value : new P(function (resolve) {\n      resolve(value);\n    });\n  }\n\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function step(result) {\n      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);\n    }\n\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\nconst asyncHandler = __webpack_require__(/*! express-async-handler */ \"../node_modules/express-async-handler/index.js\");\n\nconst {\n  postingService\n} = __webpack_require__(/*! ../../services */ \"./services/index.js\");\n\nmodule.exports = {\n  get: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const homeResult = yield postingService.getHome();\n\n    if (!homeResult.success) {\n      res.status(404).send(homeResult.message);\n      return;\n    }\n\n    res.status(200).send(homeResult.payload);\n  }))\n};\n\n//# sourceURL=webpack:///./controller/home/index.js?");

/***/ }),

/***/ "./controller/index.js":
/*!*****************************!*\
  !*** ./controller/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n  authController: __webpack_require__(/*! ./auth */ \"./controller/auth/index.js\"),\n  postController: __webpack_require__(/*! ./post */ \"./controller/post/index.js\"),\n  blogController: __webpack_require__(/*! ./blog */ \"./controller/blog/index.js\"),\n  mypageController: __webpack_require__(/*! ./mypage */ \"./controller/mypage/index.js\"),\n  companyController: __webpack_require__(/*! ./company */ \"./controller/company/index.js\"),\n  tagController: __webpack_require__(/*! ./tags */ \"./controller/tags/index.js\"),\n  homeController: __webpack_require__(/*! ./home */ \"./controller/home/index.js\"),\n  verify: __webpack_require__(/*! ./verify */ \"./controller/verify/index.js\")\n};\n\n//# sourceURL=webpack:///./controller/index.js?");

/***/ }),

/***/ "./controller/mypage/index.js":
/*!************************************!*\
  !*** ./controller/mypage/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {\n  function adopt(value) {\n    return value instanceof P ? value : new P(function (resolve) {\n      resolve(value);\n    });\n  }\n\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function step(result) {\n      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);\n    }\n\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\nconst asyncHandler = __webpack_require__(/*! express-async-handler */ \"../node_modules/express-async-handler/index.js\");\n\nconst {\n  userService,\n  postingService\n} = __webpack_require__(/*! ../../services */ \"./services/index.js\");\n\nmodule.exports = {\n  get: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const {\n      token\n    } = req.cookies;\n    const userResult = yield userService.findByToken(token);\n\n    if (!userResult.success) {\n      res.status(403).send('login required');\n      return;\n    }\n\n    let userData = userResult.payload;\n    const postingResult = yield postingService.findBlog(userData.id);\n\n    if (!postingResult.success) {\n      res.status(404).send(postingResult.message);\n      return;\n    }\n\n    let post_count = 0;\n    let tags = {};\n    let themePosts;\n\n    for (themePosts of Object.values(postingResult.payload)) {\n      post_count += themePosts.length;\n      themePosts.map(themePost => {\n        if (themePost.selected_tags.length !== 0) {\n          themePost.selected_tags.map(el => {\n            tags[el] = 1;\n          });\n        }\n      });\n    }\n\n    tags = Object.keys(tags);\n    userData.post_count = post_count;\n    userData.tag_count = tags.length;\n    userData.tags = tags;\n    res.status(200).send(userData);\n  })),\n  put: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const userUpdateData = req.body;\n    const {\n      token\n    } = req.cookies;\n    const userResult = yield userService.findByToken(token);\n\n    if (!userResult.success) {\n      res.status(403).send('login required');\n      return;\n    }\n\n    let userData = userResult.payload;\n\n    if (userUpdateData.email !== userData.email) {\n      res.status(404).send(\"can't update email\");\n      return;\n    }\n\n    const userUpdateResult = yield userService.update(userUpdateData);\n\n    if (!userUpdateResult.success) {\n      res.status(404).send(userUpdateResult.message);\n      return;\n    }\n\n    res.status(200).send(userUpdateResult.payload);\n  }))\n};\n\n//# sourceURL=webpack:///./controller/mypage/index.js?");

/***/ }),

/***/ "./controller/post/board.js":
/*!**********************************!*\
  !*** ./controller/post/board.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {\n  function adopt(value) {\n    return value instanceof P ? value : new P(function (resolve) {\n      resolve(value);\n    });\n  }\n\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function step(result) {\n      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);\n    }\n\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\nconst asyncHandler = __webpack_require__(/*! express-async-handler */ \"../node_modules/express-async-handler/index.js\");\n\nconst {\n  userService,\n  postingService\n} = __webpack_require__(/*! ../../services */ \"./services/index.js\");\n\nmodule.exports = {\n  post: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const postingData = req.body;\n    const {\n      selected_tags\n    } = postingData;\n    const {\n      token\n    } = req.cookies;\n    const userResult = yield userService.findByToken(token);\n\n    if (!userResult.success) {\n      res.status(403).send('login required');\n      return;\n    }\n\n    postingData.user_id = userResult.payload.id;\n    const postResult = yield postingService.create(postingData);\n\n    if (!postResult.success) {\n      res.status(404).send(postResult.message);\n      return;\n    }\n\n    const {\n      id\n    } = postResult.payload;\n    const tagResult = yield postingService.addTags(id, selected_tags);\n\n    if (!tagResult.success) {\n      res.status(201).send({\n        post_id: id,\n        message: `it successfully created but can't put tags in\"}`\n      });\n    }\n\n    res.status(201).send({\n      post_id: id,\n      message: `it successfully created!`\n    });\n  })),\n  get: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const {\n      id\n    } = req.body;\n    const {\n      token\n    } = req.cookies;\n    const findresult = yield postingService.find(id);\n\n    if (!findresult.success) {\n      res.status(404).send(\"i can't find your postings\");\n      return;\n    }\n\n    let postingInfo = findresult.payload;\n\n    if (token) {\n      const userResult = yield userService.findByToken(token);\n\n      if (!userResult.success) {\n        res.status(403).send('login required');\n        return;\n      }\n\n      const user_id = userResult.payload.id;\n      postingInfo.isAuthor = postingInfo.user_id === user_id;\n    }\n\n    res.status(200).send(postingInfo);\n  })),\n  put: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const postingData = req.body;\n    const {\n      token\n    } = req.cookies;\n    const userResult = yield userService.findByToken(token);\n\n    if (!userResult.success) {\n      res.status(403).send('login required');\n      return;\n    }\n\n    const user_id = userResult.payload.id;\n    const updateResult = yield postingService.update(user_id, postingData);\n\n    if (!updateResult.success) {\n      res.status(404).send(updateResult.message);\n      return;\n    }\n\n    const {\n      id,\n      selected_tags\n    } = postingData;\n    const addTagResult = yield postingService.addTags(id, selected_tags);\n\n    if (!addTagResult.success) {\n      res.status(404).send(addTagResult.message);\n      return;\n    }\n\n    res.status(201).send('Posting successfully updated!');\n  })),\n  delete: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const {\n      id\n    } = req.body;\n    const {\n      token\n    } = req.cookies;\n    const userResult = yield userService.findByToken(token);\n\n    if (!userResult.success) {\n      res.status(403).send('login required');\n      return;\n    }\n\n    const user_id = userResult.payload.id;\n    const postingInfo = yield postingService.find(id);\n\n    if (!postingInfo.success) {\n      res.status(404).send(\"i can't find your postings\");\n      return;\n    }\n\n    if (postingInfo.payload.user_id !== user_id) {\n      res.status(403).send('It is not your posting');\n      return;\n    }\n\n    const deleteResult = yield postingService.delete(id);\n\n    if (!deleteResult.success) {\n      res.status(404).send(deleteResult.message);\n      return;\n    }\n\n    res.status(200).send('successfully deleted');\n  })),\n  test: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const {\n      id\n    } = req.body;\n    const postingInfo = yield postingService.test(id);\n\n    if (!postingInfo.success) {\n      res.status(404).send(\"i can't find your postings\");\n      return;\n    }\n\n    res.status(200).send(postingInfo);\n  }))\n};\n\n//# sourceURL=webpack:///./controller/post/board.js?");

/***/ }),

/***/ "./controller/post/boardbyid.js":
/*!**************************************!*\
  !*** ./controller/post/boardbyid.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {\n  function adopt(value) {\n    return value instanceof P ? value : new P(function (resolve) {\n      resolve(value);\n    });\n  }\n\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function step(result) {\n      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);\n    }\n\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\nconst asyncHandler = __webpack_require__(/*! express-async-handler */ \"../node_modules/express-async-handler/index.js\");\n\nconst {\n  postingService,\n  userService\n} = __webpack_require__(/*! ../../services */ \"./services/index.js\");\n\nmodule.exports = {\n  get: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const id = req.params.id;\n    const {\n      token\n    } = req.cookies;\n    const findresult = yield postingService.find(id);\n\n    if (!findresult.success) {\n      res.status(404).send(\"i can't find your postings\");\n      return;\n    }\n\n    let postingInfo = findresult.payload;\n\n    if (token) {\n      const userResult = yield userService.findByToken(token);\n\n      if (!userResult.success) {\n        res.status(403).send('login required');\n        return;\n      }\n\n      const user_id = userResult.payload.id;\n      postingInfo.isAuthor = postingInfo.user_id === user_id;\n    }\n\n    res.status(200).send(postingInfo);\n  })),\n  delete: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const id = req.params.id;\n    const {\n      token\n    } = req.cookies;\n    const userResult = yield userService.findByToken(token);\n\n    if (!userResult.success) {\n      res.status(403).send('login required');\n      return;\n    }\n\n    const user_id = userResult.payload.id;\n    const postingInfo = yield postingService.find(id);\n\n    if (!postingInfo.success) {\n      res.status(404).send(\"i can't find your postings\");\n      return;\n    }\n\n    if (postingInfo.payload.user_id !== user_id) {\n      res.status(403).send('It is not your posting');\n      return;\n    }\n\n    const deleteResult = yield postingService.delete(id);\n\n    if (!deleteResult.success) {\n      res.status(404).send(\"There's an error while deleting your posting\");\n      return;\n    }\n\n    res.status(200).send('successfully deleted');\n  }))\n};\n\n//# sourceURL=webpack:///./controller/post/boardbyid.js?");

/***/ }),

/***/ "./controller/post/index.js":
/*!**********************************!*\
  !*** ./controller/post/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n  board: __webpack_require__(/*! ./board */ \"./controller/post/board.js\"),\n  boardbyid: __webpack_require__(/*! ./boardbyid */ \"./controller/post/boardbyid.js\"),\n  like: __webpack_require__(/*! ./like */ \"./controller/post/like.js\"),\n  likebyid: __webpack_require__(/*! ./likebyid */ \"./controller/post/likebyid.js\")\n};\n\n//# sourceURL=webpack:///./controller/post/index.js?");

/***/ }),

/***/ "./controller/post/like.js":
/*!*********************************!*\
  !*** ./controller/post/like.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {\n  function adopt(value) {\n    return value instanceof P ? value : new P(function (resolve) {\n      resolve(value);\n    });\n  }\n\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function step(result) {\n      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);\n    }\n\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\nconst asyncHandler = __webpack_require__(/*! express-async-handler */ \"../node_modules/express-async-handler/index.js\");\n\nconst {\n  userService,\n  postingService\n} = __webpack_require__(/*! ../../services */ \"./services/index.js\");\n\nmodule.exports = {\n  post: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const {\n      id\n    } = req.body;\n    const {\n      token\n    } = req.cookies;\n    const userResult = yield userService.findByToken(token);\n\n    if (!userResult.success) {\n      res.status(403).send('login required');\n      return;\n    }\n\n    const user_id = userResult.payload.id;\n    const findresult = yield postingService.find(id);\n\n    if (!findresult.success) {\n      res.status(404).send(\"i can't find your postings\");\n      return;\n    }\n\n    if (findresult.payload.user_id === user_id) {\n      res.status(403).send(\"You can't like yourself\");\n      return;\n    }\n\n    const likeResult = yield postingService.like(id);\n\n    if (!likeResult.success) {\n      res.status(404).send(\"There's an error while liking\");\n      return;\n    }\n\n    res.status(200).send('successfully liked');\n  })),\n  delete: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const {\n      id\n    } = req.body;\n    const {\n      token\n    } = req.cookies;\n    const userResult = yield userService.findByToken(token);\n\n    if (!userResult.success) {\n      res.status(403).send('login required');\n      return;\n    }\n\n    const user_id = userResult.payload.id;\n    const findresult = yield postingService.find(id);\n\n    if (!findresult.success) {\n      res.status(404).send(\"i can't find your postings\");\n      return;\n    }\n\n    if (findresult.payload.user_id === user_id) {\n      res.status(403).send(\"You can't like yourself\");\n      return;\n    }\n\n    const unlikeResult = yield postingService.unlike(id);\n\n    if (!unlikeResult.success) {\n      res.status(404).send(\"There's an error while unliking\");\n      return;\n    }\n\n    res.status(200).send('successfully unliked');\n  }))\n};\n\n//# sourceURL=webpack:///./controller/post/like.js?");

/***/ }),

/***/ "./controller/post/likebyid.js":
/*!*************************************!*\
  !*** ./controller/post/likebyid.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {\n  function adopt(value) {\n    return value instanceof P ? value : new P(function (resolve) {\n      resolve(value);\n    });\n  }\n\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function step(result) {\n      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);\n    }\n\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\nconst asyncHandler = __webpack_require__(/*! express-async-handler */ \"../node_modules/express-async-handler/index.js\");\n\nconst {\n  userService,\n  postingService\n} = __webpack_require__(/*! ../../services */ \"./services/index.js\");\n\nmodule.exports = {\n  post: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const id = req.params.id;\n    const {\n      token\n    } = req.cookies;\n    const userResult = yield userService.findByToken(token);\n\n    if (!userResult.success) {\n      res.status(403).send('login required');\n      return;\n    }\n\n    const user_id = userResult.payload.id;\n    const findresult = yield postingService.find(id);\n\n    if (!findresult.success) {\n      res.status(404).send(\"i can't find your postings\");\n      return;\n    }\n\n    if (findresult.payload.user_id === user_id) {\n      res.status(403).send(\"You can't like yourself\");\n      return;\n    }\n\n    const likeResult = yield postingService.like(id);\n\n    if (!likeResult.success) {\n      res.status(404).send(\"There's an error while liking\");\n      return;\n    }\n\n    res.status(200).send('successfully liked');\n  })),\n  delete: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const id = req.params.id;\n    const {\n      token\n    } = req.cookies;\n    const userResult = yield userService.findByToken(token);\n\n    if (!userResult.success) {\n      res.status(403).send('login required');\n      return;\n    }\n\n    const user_id = userResult.payload.id;\n    const findresult = yield postingService.find(id);\n\n    if (!findresult.success) {\n      res.status(404).send(\"i can't find your postings\");\n      return;\n    }\n\n    if (findresult.payload.user_id === user_id) {\n      res.status(403).send(\"can't like your posting\");\n      return;\n    }\n\n    const unlikeResult = yield postingService.unlike(id);\n\n    if (!unlikeResult.success) {\n      res.status(404).send(\"There's an error while unliking\");\n      return;\n    }\n\n    res.status(200).send('successfully unliked');\n  }))\n};\n\n//# sourceURL=webpack:///./controller/post/likebyid.js?");

/***/ }),

/***/ "./controller/tags/index.js":
/*!**********************************!*\
  !*** ./controller/tags/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {\n  function adopt(value) {\n    return value instanceof P ? value : new P(function (resolve) {\n      resolve(value);\n    });\n  }\n\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function step(result) {\n      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);\n    }\n\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\nconst asyncHandler = __webpack_require__(/*! express-async-handler */ \"../node_modules/express-async-handler/index.js\");\n\nconst {\n  tags\n} = __webpack_require__(/*! ../../services/access */ \"./services/access/index.js\");\n\nmodule.exports = {\n  get: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const getTagResult = yield tags.getPTTags();\n\n    if (!getTagResult) {\n      res.status(404).send(\"There's an error while finding tags\");\n      return;\n    }\n\n    res.status(200).send({\n      tags: getTagResult.map(el => el.name)\n    });\n  }))\n};\n\n//# sourceURL=webpack:///./controller/tags/index.js?");

/***/ }),

/***/ "./controller/verify/index.js":
/*!************************************!*\
  !*** ./controller/verify/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {\n  function adopt(value) {\n    return value instanceof P ? value : new P(function (resolve) {\n      resolve(value);\n    });\n  }\n\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function step(result) {\n      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);\n    }\n\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\nconst asyncHandler = __webpack_require__(/*! express-async-handler */ \"../node_modules/express-async-handler/index.js\");\n\nconst {\n  isValid\n} = __webpack_require__(/*! ../../utils/token */ \"./utils/token.js\");\n\nconst {\n  userService\n} = __webpack_require__(/*! ../../services */ \"./services/index.js\");\n\nmodule.exports = {\n  get: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const {\n      token\n    } = req.cookies;\n    let resBody = {\n      token: false\n    };\n    const decode = yield isValid(token);\n\n    if (decode.isValid) {\n      resBody.token = true;\n      resBody.join_type = decode.userData.user_type;\n    }\n\n    res.status(200).send(resBody);\n  })),\n  post: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const {\n      token\n    } = req.cookies;\n    let userData = null;\n    const userResult = yield userService.findByToken(token);\n\n    if (userResult.success) {\n      userData = userResult.payload;\n      delete userData.password;\n    }\n\n    if (userData) {\n      res.status(200).send({\n        userData\n      });\n    } else {\n      res.status(200).send({\n        isLogin: false\n      });\n    }\n  }))\n};\n\n//# sourceURL=webpack:///./controller/verify/index.js?");

/***/ }),

/***/ "./database/config/config.json":
/*!*************************************!*\
  !*** ./database/config/config.json ***!
  \*************************************/
/*! exports provided: development, test, production, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"development\\\":{\\\"username\\\":\\\"root\\\",\\\"password\\\":\\\"applepie\\\",\\\"database\\\":\\\"codelog\\\",\\\"host\\\":\\\"codelog-database-build.cibnhzur2wz1.ap-northeast-2.rds.amazonaws.com\\\",\\\"port\\\":3306,\\\"dialect\\\":\\\"mysql\\\",\\\"operatorsAliases\\\":false},\\\"test\\\":{\\\"username\\\":\\\"root\\\",\\\"password\\\":null,\\\"database\\\":\\\"codelog_test\\\",\\\"host\\\":\\\"127.0.0.1\\\",\\\"dialect\\\":\\\"mysql\\\",\\\"operatorsAliases\\\":false},\\\"production\\\":{\\\"username\\\":\\\"root\\\",\\\"password\\\":null,\\\"database\\\":\\\"codelog_production\\\",\\\"host\\\":\\\"127.0.0.1\\\",\\\"dialect\\\":\\\"mysql\\\",\\\"operatorsAliases\\\":false}}\");\n\n//# sourceURL=webpack:///./database/config/config.json?");

/***/ }),

/***/ "./database/models/index.js":
/*!**********************************!*\
  !*** ./database/models/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__filename, __dirname) {\n\nconst fs = __webpack_require__(/*! fs */ \"fs\");\n\nconst path = __webpack_require__(/*! path */ \"path\");\n\nconst Sequelize = __webpack_require__(/*! sequelize */ \"sequelize\");\n\nconst basename = path.basename(__filename);\nconst env = \"development\" || false;\n\nconst config = __webpack_require__(/*! ./database/models/../config/config.json */ \"./database/config/config.json\")[env];\n\nconst db = {};\nlet sequelize;\n\nif (config.use_env_variable) {\n  sequelize = new Sequelize(process.env[config.use_env_variable], config);\n} else {\n  sequelize = new Sequelize(config.database, config.username, config.password, config);\n}\n\nfs.readdirSync(__dirname).filter(file => {\n  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';\n}).forEach(file => {\n  const model = sequelize['import'](path.join(__dirname, file));\n  db[model.name] = model;\n});\nObject.keys(db).forEach(modelName => {\n  if (db[modelName].associate) {\n    db[modelName].associate(db);\n  }\n});\ndb.sequelize = sequelize;\ndb.Sequelize = Sequelize;\nmodule.exports = db;\n/* WEBPACK VAR INJECTION */}.call(this, \"/index.js\", \"/\"))\n\n//# sourceURL=webpack:///./database/models/index.js?");

/***/ }),

/***/ "./routes/index.js":
/*!*************************!*\
  !*** ./routes/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\nconst {\n  authController,\n  postController,\n  blogController,\n  mypageController,\n  companyController,\n  tagController,\n  homeController,\n  verify\n} = __webpack_require__(/*! ../controller */ \"./controller/index.js\"); // * AUTH\n\n\nrouter.post('/signup', authController.signup.post);\nrouter.post('/signup/company', authController.csignup.post);\nrouter.post('/signin', authController.signin.post);\nrouter.post('/signin/company', authController.csignin.post);\nrouter.post('/signout', authController.signout.post);\nrouter.post('/duplicate', authController.duplicate.post); // * MYPAGE\n\nrouter.get('/mypage', mypageController.get);\nrouter.put('/mypage', mypageController.put);\nrouter.post('/mypage/update', mypageController.put); // * COMPANY\n\nrouter.get('/company', companyController.get);\nrouter.put('/company', companyController.put);\nrouter.post('/company/update', companyController.put);\nrouter.post('/company/member/update', companyController.member.put);\nrouter.post('/company/member/delete', companyController.member.delete);\nrouter.post('/company/member/delete/:id', companyController.memberbyid.delete); // * POST\n\nrouter.post('/post', postController.board.post);\nrouter.post('/test', postController.board.test);\nrouter.get('/post', postController.board.get);\nrouter.put('/post', postController.board.put);\nrouter.delete('/post', postController.board.delete);\nrouter.post('/post/update', postController.board.put);\nrouter.post('/post/delete', postController.board.delete);\nrouter.post('/post/delete/:id', postController.boardbyid.delete);\nrouter.get('/post/:id', postController.boardbyid.get);\nrouter.delete('/post/:id', postController.boardbyid.delete);\nrouter.post('/post/like', postController.like.post);\nrouter.post('/post/like/:id', postController.likebyid.post);\nrouter.post('/post/dislike', postController.like.delete);\nrouter.post('/post/dislike/:id', postController.likebyid.delete);\nrouter.delete('/post/like', postController.like.delete);\nrouter.delete('/post/like/:id', postController.likebyid.delete); // * BLOG\n\nrouter.get('/blog', blogController.main.get); // * TAG\n\nrouter.get('/tags', tagController.get); // * HOME\n\nrouter.get('/home', homeController.get); // * VERIFY\n\nrouter.get('/auth', verify.get);\nrouter.post('/auth', verify.post);\nmodule.exports = router;\n\n//# sourceURL=webpack:///./routes/index.js?");

/***/ }),

/***/ "./services/access/companies.js":
/*!**************************************!*\
  !*** ./services/access/companies.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n  Companies,\n  Users,\n  companies_tags,\n  Tags\n} = __webpack_require__(/*! ../../database/models */ \"./database/models/index.js\");\n\nconst {\n  handlePromise\n} = __webpack_require__(/*! ../helper */ \"./services/helper.js\");\n\nCompanies.hasMany(Users, {\n  foreignKey: 'company_id'\n});\nUsers.belongsTo(Companies, {\n  foreignKey: 'company_id'\n});\nCompanies.hasMany(companies_tags, {\n  foreignKey: 'company_id'\n});\ncompanies_tags.belongsTo(Companies, {\n  foreignKey: 'company_id'\n});\nTags.hasMany(companies_tags, {\n  foreignKey: 'tag_id'\n});\ncompanies_tags.belongsTo(Tags, {\n  foreignKey: 'tag_id'\n});\nmodule.exports = {\n  create: companyData => handlePromise(Companies.create(companyData)),\n  find: company_id => handlePromise(Companies.findOne({\n    where: {\n      id: company_id\n    },\n    order: [[companies_tags, 'tag_id', 'ASC']],\n    include: [{\n      model: Users,\n      attributes: ['id', 'email', 'username', 'password', 'position']\n    }, {\n      model: companies_tags,\n      attributes: ['tag_id'],\n      include: {\n        model: Tags,\n        attributes: ['name']\n      }\n    }]\n  })),\n  findByNew: num => handlePromise(Companies.findAll({\n    limit: num,\n    order: [['id', 'DESC'], [companies_tags, 'tag_id', 'ASC']],\n    attributes: ['company_name', 'info', 'partner', 'company_homepage'],\n    include: {\n      model: companies_tags,\n      attributes: ['tag_id'],\n      include: {\n        model: Tags,\n        attributes: ['name']\n      }\n    }\n  })),\n  update: companyData => handlePromise(Companies.update(companyData, {\n    where: {\n      id: companyData.id\n    }\n  })),\n  delete: company_id => handlePromise(Companies.destroy({\n    where: {\n      id: company_id\n    }\n  }))\n};\n\n//# sourceURL=webpack:///./services/access/companies.js?");

/***/ }),

/***/ "./services/access/companies_tags.js":
/*!*******************************************!*\
  !*** ./services/access/companies_tags.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n  companies_tags,\n  Tags,\n  postings_tags,\n  Postings,\n  Users\n} = __webpack_require__(/*! ../../database/models */ \"./database/models/index.js\");\n\nconst {\n  handlePromise\n} = __webpack_require__(/*! ../helper */ \"./services/helper.js\");\n\nTags.hasMany(companies_tags, {\n  foreignKey: 'tag_id'\n});\ncompanies_tags.belongsTo(Tags, {\n  foreignKey: 'tag_id'\n});\nTags.hasMany(postings_tags, {\n  foreignKey: 'tag_id'\n});\npostings_tags.belongsTo(Tags, {\n  foreignKey: 'tag_id'\n});\nPostings.hasMany(postings_tags, {\n  foreignKey: 'post_id'\n});\npostings_tags.belongsTo(Postings, {\n  foreignKey: 'post_id'\n});\nUsers.hasMany(Postings, {\n  foreignKey: 'user_id'\n});\nPostings.belongsTo(Users, {\n  foreignKey: 'user_id'\n});\nmodule.exports = {\n  findDeveloper: company_id => handlePromise(companies_tags.findAll({\n    where: {\n      company_id\n    },\n    attributes: ['tag_id'],\n    order: [['tag_id', 'ASC'], [Tags, postings_tags, Postings, 'user_id', 'ASC']],\n    include: {\n      model: Tags,\n      attributes: ['name'],\n      include: {\n        model: postings_tags,\n        attributes: ['post_id'],\n        include: {\n          model: Postings,\n          attributes: ['user_id']\n        }\n      }\n    }\n  }))\n};\n\n//# sourceURL=webpack:///./services/access/companies_tags.js?");

/***/ }),

/***/ "./services/access/contents.js":
/*!*************************************!*\
  !*** ./services/access/contents.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n  Contents,\n  Subtitles\n} = __webpack_require__(/*! ../../database/models */ \"./database/models/index.js\");\n\nconst {\n  handlePromise\n} = __webpack_require__(/*! ../helper */ \"./services/helper.js\");\n\nSubtitles.hasMany(Contents, {\n  foreignKey: 'subtitle_id'\n});\nContents.belongsTo(Subtitles, {\n  foreignKey: 'subtitle_id'\n});\nmodule.exports = {\n  create: (post_id, subtitle_id, body) => handlePromise(Contents.create({\n    post_id,\n    subtitle_id,\n    body\n  })),\n  findByPostId: post_id => handlePromise(Contents.findAll({\n    where: {\n      post_id\n    },\n    include: {\n      model: Subtitles,\n      attributes: ['name']\n    }\n  })),\n  update: updateData => handlePromise(Contents.update(updateData, {\n    where: {\n      id: updateData.id\n    }\n  })),\n  updateMany: updateDatas => handlePromise(Contents.bulkCreate(updateDatas, {\n    updateOnDuplicate: ['post_id', 'subtitle_id'],\n    fields: ['id', 'post_id', 'subtitle_id', 'body']\n  })),\n  deleteByPostId: post_id => handlePromise(Contents.destroy({\n    where: {\n      post_id\n    }\n  }))\n};\n\n//# sourceURL=webpack:///./services/access/contents.js?");

/***/ }),

/***/ "./services/access/index.js":
/*!**********************************!*\
  !*** ./services/access/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n  companies: __webpack_require__(/*! ./companies */ \"./services/access/companies.js\"),\n  postings: __webpack_require__(/*! ./postings */ \"./services/access/postings.js\"),\n  users: __webpack_require__(/*! ./users */ \"./services/access/users.js\"),\n  subtitles: __webpack_require__(/*! ./subtitles */ \"./services/access/subtitles.js\"),\n  contents: __webpack_require__(/*! ./contents */ \"./services/access/contents.js\"),\n  types: __webpack_require__(/*! ./types */ \"./services/access/types.js\"),\n  tags: __webpack_require__(/*! ./tags */ \"./services/access/tags.js\"),\n  companies_tags: __webpack_require__(/*! ./companies_tags */ \"./services/access/companies_tags.js\")\n};\n\n//# sourceURL=webpack:///./services/access/index.js?");

/***/ }),

/***/ "./services/access/postings.js":
/*!*************************************!*\
  !*** ./services/access/postings.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n  Postings,\n  postings_tags,\n  Tags,\n  Contents,\n  Subtitles,\n  Types\n} = __webpack_require__(/*! ../../database/models */ \"./database/models/index.js\");\n\nconst {\n  handlePromise\n} = __webpack_require__(/*! ../helper */ \"./services/helper.js\");\n\nconst Sequelize = __webpack_require__(/*! sequelize */ \"sequelize\");\n\nconst Op = Sequelize.Op;\nPostings.hasMany(Contents, {\n  foreignKey: 'post_id'\n});\nContents.belongsTo(Postings, {\n  foreignKey: 'post_id'\n});\nTypes.hasMany(Postings, {\n  foreignKey: 'type_id'\n});\nPostings.belongsTo(Types, {\n  foreignKey: 'type_id'\n});\nSubtitles.hasMany(Contents, {\n  foreignKey: 'subtitle_id'\n});\nContents.belongsTo(Subtitles, {\n  foreignKey: 'subtitle_id'\n});\nPostings.hasMany(postings_tags, {\n  foreignKey: 'post_id'\n});\npostings_tags.belongsTo(Postings, {\n  foreignKey: 'post_id'\n});\nTags.hasMany(postings_tags, {\n  foreignKey: 'tag_id'\n});\npostings_tags.belongsTo(Tags, {\n  foreignKey: 'tag_id'\n});\nmodule.exports = {\n  create: postingData => handlePromise(Postings.create(postingData)),\n  findById: post_id => handlePromise(Postings.findOne({\n    where: {\n      id: post_id\n    },\n    order: [[postings_tags, 'tag_id', 'ASC']],\n    attributes: {\n      exclude: ['type_id']\n    },\n    include: [{\n      model: Types,\n      attributes: ['name']\n    }, {\n      model: Contents,\n      attributes: ['body', 'subtitle_id'],\n      include: {\n        model: Subtitles,\n        attributes: ['name']\n      }\n    }, {\n      model: postings_tags,\n      attributes: ['tag_id'],\n      include: {\n        model: Tags,\n        where: {\n          type: 'stack'\n        },\n        attributes: ['name']\n      }\n    }]\n  })),\n  findByUser: user_id => handlePromise(Postings.findAll({\n    where: {\n      user_id\n    },\n    order: [['id', 'DESC'], [postings_tags, 'tag_id', 'ASC']],\n    attributes: {\n      exclude: ['type_id', 'user_id']\n    },\n    include: [{\n      model: Types,\n      attributes: ['name']\n    }, {\n      model: Contents,\n      attributes: ['body', 'subtitle_id'],\n      include: {\n        model: Subtitles,\n        attributes: ['name']\n      }\n    }, {\n      model: postings_tags,\n      attributes: ['tag_id'],\n      include: {\n        model: Tags,\n        where: {\n          type: 'stack'\n        },\n        attributes: ['name']\n      }\n    }]\n  })),\n  findByUserTheme: (user_id, type_id) => handlePromise(Postings.findAll({\n    where: {\n      user_id,\n      type_id\n    },\n    order: [['id', 'DESC'], [postings_tags, 'tag_id', 'ASC']],\n    attributes: {\n      exclude: ['type_id', 'user_id']\n    },\n    include: [{\n      model: Types,\n      attributes: ['name']\n    }, {\n      model: Contents,\n      attributes: ['body', 'subtitle_id'],\n      include: {\n        model: Subtitles,\n        attributes: ['name']\n      }\n    }, {\n      model: postings_tags,\n      attributes: ['tag_id'],\n      include: {\n        model: Tags,\n        where: {\n          type: 'stack'\n        },\n        attributes: ['name']\n      }\n    }]\n  })),\n  findByNew: num => handlePromise(Postings.findAll({\n    limit: num,\n    order: [['id', 'DESC'], [postings_tags, 'tag_id', 'ASC']],\n    attributes: {\n      exclude: ['type_id', 'user_id']\n    },\n    include: [{\n      model: Types,\n      attributes: ['name']\n    }, {\n      model: Contents,\n      attributes: ['body', 'subtitle_id'],\n      include: {\n        model: Subtitles,\n        attributes: ['name']\n      }\n    }, {\n      model: postings_tags,\n      attributes: ['tag_id'],\n      include: {\n        model: Tags,\n        where: {\n          type: 'stack'\n        },\n        attributes: ['name']\n      }\n    }]\n  })),\n  findByManyLike: num => handlePromise(Postings.findAll({\n    limit: num,\n    order: Sequelize.literal('likes DESC'),\n    include: [{\n      model: Types,\n      attributes: ['name']\n    }, {\n      model: Contents,\n      attributes: ['body', 'subtitle_id'],\n      include: {\n        model: Subtitles,\n        attributes: ['name']\n      }\n    }, {\n      model: postings_tags,\n      attributes: ['tag_id'],\n      include: {\n        model: Tags,\n        where: {\n          type: 'stack'\n        },\n        attributes: ['name']\n      }\n    }]\n  })),\n  updateTitleById: (id, title) => handlePromise(Postings.update({\n    title\n  }, {\n    where: {\n      id\n    }\n  })),\n  delete: post_id => handlePromise(Postings.destroy({\n    where: {\n      id: post_id\n    }\n  })),\n  increaseLike: post_id => handlePromise(Postings.update({\n    likes: Sequelize.literal('likes + 1')\n  }, {\n    where: {\n      id: post_id\n    }\n  })),\n  decreaseLike: post_id => handlePromise(Postings.update({\n    likes: Sequelize.literal('likes - 1')\n  }, {\n    where: {\n      id: post_id\n    }\n  }))\n};\n\n//# sourceURL=webpack:///./services/access/postings.js?");

/***/ }),

/***/ "./services/access/subtitles.js":
/*!**************************************!*\
  !*** ./services/access/subtitles.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst {\n  Subtitles\n} = __webpack_require__(/*! ../../database/models */ \"./database/models/index.js\");\n\nconst {\n  handlePromise\n} = __webpack_require__(/*! ../helper */ \"./services/helper.js\");\n\nmodule.exports = {\n  findByTypeid: type_id => handlePromise(Subtitles.findAll({\n    where: {\n      type_id\n    }\n  })),\n  getAllSubts: () => {}\n};\n\n//# sourceURL=webpack:///./services/access/subtitles.js?");

/***/ }),

/***/ "./services/access/tags.js":
/*!*********************************!*\
  !*** ./services/access/tags.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n  Tags,\n  postings_tags,\n  companies_tags\n} = __webpack_require__(/*! ../../database/models */ \"./database/models/index.js\");\n\nconst {\n  handlePromise\n} = __webpack_require__(/*! ../helper */ \"./services/helper.js\");\n\nmodule.exports = {\n  getPTTags: () => handlePromise(Tags.findAll({\n    where: {\n      type: 'stack'\n    }\n  })),\n  getCTTags: () => handlePromise(Tags.findAll({\n    where: {\n      type: 'company'\n    }\n  })),\n  findByName: tagname => handlePromise(Tags.findOne({\n    where: {\n      name: tagname\n    }\n  })),\n  deleteByPostId: post_id => handlePromise(postings_tags.destroy({\n    where: {\n      post_id\n    }\n  })),\n  deleteByCompanyId: company_id => handlePromise(companies_tags.destroy({\n    where: {\n      company_id\n    }\n  })),\n  addPTTags: tagDatas => handlePromise(postings_tags.bulkCreate(tagDatas)),\n  addCTTags: tagDatas => handlePromise(companies_tags.bulkCreate(tagDatas))\n};\n\n//# sourceURL=webpack:///./services/access/tags.js?");

/***/ }),

/***/ "./services/access/types.js":
/*!**********************************!*\
  !*** ./services/access/types.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst {\n  Types\n} = __webpack_require__(/*! ../../database/models */ \"./database/models/index.js\");\n\nconst {\n  handlePromise\n} = __webpack_require__(/*! ../helper */ \"./services/helper.js\");\n\nmodule.exports = {\n  findByName: name => handlePromise(Types.findOne({\n    where: {\n      name\n    }\n  })),\n  findById: id => handlePromise(Types.findOne({\n    where: {\n      id\n    }\n  })),\n  findAll: () => handlePromise(Types.findAll())\n};\n\n//# sourceURL=webpack:///./services/access/types.js?");

/***/ }),

/***/ "./services/access/users.js":
/*!**********************************!*\
  !*** ./services/access/users.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n  Users\n} = __webpack_require__(/*! ../../database/models */ \"./database/models/index.js\");\n\nconst {\n  handlePromise\n} = __webpack_require__(/*! ../helper */ \"./services/helper.js\");\n\nmodule.exports = {\n  create: userData => handlePromise(Users.findOrCreate({\n    where: {\n      email: userData.email\n    },\n    defaults: userData\n  }).spread((result, created) => {\n    return created ? 'created' : 'duplicated';\n  })),\n  findByEmail: email => handlePromise(Users.findOne({\n    where: {\n      email\n    }\n  })),\n  findByUsername: username => handlePromise(Users.findOne({\n    where: {\n      username\n    }\n  })),\n  findByCompany: company_id => handlePromise(Users.findAll({\n    where: {\n      company_id\n    }\n  })),\n  findById: id => handlePromise(Users.findOne({\n    where: {\n      id\n    }\n  })),\n  updateByEmail: userData => handlePromise(Users.update(userData, {\n    where: {\n      email: userData.email\n    }\n  })),\n  updateById: userData => handlePromise(Users.update(userData, {\n    where: {\n      id: userData.id\n    }\n  })),\n  delete: user_id => handlePromise(Users.destroy({\n    where: {\n      id: user_id\n    }\n  }))\n};\n\n//# sourceURL=webpack:///./services/access/users.js?");

/***/ }),

/***/ "./services/companyService.js":
/*!************************************!*\
  !*** ./services/companyService.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {\n  function adopt(value) {\n    return value instanceof P ? value : new P(function (resolve) {\n      resolve(value);\n    });\n  }\n\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function step(result) {\n      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);\n    }\n\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\nconst {\n  companies_tags,\n  users,\n  companies,\n  tags\n} = __webpack_require__(/*! ./access */ \"./services/access/index.js\");\n\nconst {\n  handleCompanyData,\n  handleTagDatas\n} = __webpack_require__(/*! ./helper */ \"./services/helper.js\");\n\nconst userService = __webpack_require__(/*! ./userService */ \"./services/userService.js\");\n\nconst CompanyService = {\n  signin: (company_code, emailOrUsername, password) => __awaiter(void 0, void 0, void 0, function* () {\n    const signinResult = yield userService.signin(emailOrUsername, password);\n\n    if (!signinResult.success) {\n      return {\n        success: false,\n        payload: null,\n        message: signinResult.message\n      };\n    }\n\n    let company_id = signinResult.payload.company_id;\n\n    if (!company_id) {\n      return {\n        success: false,\n        payload: null,\n        message: \"you don't have company\"\n      };\n    }\n\n    const companyData = yield companies.find(company_id);\n\n    if (companyData.company_code !== company_code) {\n      return {\n        success: false,\n        payload: null,\n        message: 'wrong code'\n      };\n    }\n\n    return {\n      success: true,\n      payload: signinResult.payload,\n      message: 'found user'\n    };\n  }),\n  signup: companyData => __awaiter(void 0, void 0, void 0, function* () {\n    const companyCreate = yield companies.create(companyData);\n\n    if (!companyCreate) {\n      return {\n        success: false,\n        payload: null,\n        message: 'duplicated'\n      };\n    }\n\n    let member = companyData.member;\n\n    if (!member) {\n      member = {\n        email: '',\n        username: 'admin',\n        password: companyCreate.company_code,\n        company_id: companyCreate.id || null,\n        position: '',\n        certificate: '',\n        personal_homepage: ''\n      };\n    } else {\n      member.company_id = companyCreate.id || null;\n    }\n\n    const memberCreate = yield userService.signup(member);\n\n    if (!memberCreate.success) {\n      const companyDelete = companies.delete(companyCreate.id);\n\n      if (!companyDelete) {\n        return {\n          success: true,\n          payload: null,\n          message: \"can't join member\"\n        };\n      }\n\n      return {\n        success: false,\n        payload: null,\n        message: 'wrong member info'\n      };\n    }\n\n    return {\n      success: true,\n      payload: companyCreate,\n      message: 'successfully created'\n    };\n  }),\n  find: company_id => __awaiter(void 0, void 0, void 0, function* () {\n    const companyData = yield companies.find(company_id);\n\n    if (!companyData) {\n      return {\n        success: false,\n        payload: null,\n        message: \"can't find company\"\n      };\n    }\n\n    return {\n      success: true,\n      payload: handleCompanyData(companyData),\n      message: 'successfully found'\n    };\n  }),\n  update: companyData => __awaiter(void 0, void 0, void 0, function* () {\n    const companyRecord = yield companies.find(companyData.id);\n\n    if (!companyRecord) {\n      return {\n        success: false,\n        payload: null,\n        message: \"can't find company\"\n      };\n    }\n\n    const {\n      company_code,\n      partner\n    } = companyData;\n\n    if (company_code || partner) {\n      if (companyRecord.company_code !== company_code || companyRecord.partner !== partner) {\n        return {\n          success: false,\n          payload: null,\n          message: \"can't update code or partner\"\n        };\n      }\n    }\n\n    const updateRecord = yield companies.update(companyData);\n\n    if (!updateRecord) {\n      return {\n        success: false,\n        payload: null,\n        message: \"can't update company\"\n      };\n    }\n\n    const deleteTags = yield tags.deleteByCompanyId(companyData.id);\n    return {\n      success: true,\n      payload: updateRecord,\n      message: 'successfully update company'\n    };\n  }),\n  addTags: (company_id, company_tags) => __awaiter(void 0, void 0, void 0, function* () {\n    let tagDatas = [];\n\n    for (let tag_name of company_tags) {\n      const findTag = yield tags.findByName(tag_name);\n\n      if (!findTag) {\n        return {\n          success: false,\n          payload: null,\n          message: \"can't find tag\"\n        };\n      }\n\n      tagDatas.push({\n        company_id,\n        tag_id: findTag.id\n      });\n    }\n\n    const addTag = yield tags.addCTTags(tagDatas);\n\n    if (!addTag) {\n      return {\n        success: false,\n        payload: null,\n        message: \"can't put tags in\"\n      };\n    }\n\n    return {\n      success: true,\n      payload: null,\n      message: 'successfully taged'\n    };\n  }),\n  findDeveloper: company_id => __awaiter(void 0, void 0, void 0, function* () {\n    let userids = yield companies_tags.findDeveloper(company_id);\n    let userDatas = [];\n\n    for (let id of handleTagDatas(userids)) {\n      const userData = yield users.findById(id[0]);\n      userDatas.push(userData);\n    }\n\n    return {\n      success: true,\n      payload: userDatas,\n      message: 'successfully found'\n    };\n  })\n};\nmodule.exports = CompanyService;\n\n//# sourceURL=webpack:///./services/companyService.js?");

/***/ }),

/***/ "./services/helper.js":
/*!****************************!*\
  !*** ./services/helper.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {\n  function adopt(value) {\n    return value instanceof P ? value : new P(function (resolve) {\n      resolve(value);\n    });\n  }\n\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function step(result) {\n      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);\n    }\n\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\nmodule.exports = {\n  handlePromise: promise => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n      const res = yield promise;\n\n      if (typeof res === 'string') {\n        return res;\n      }\n\n      if (res === null) {\n        return null;\n      }\n\n      const data = Array.isArray(res) ? res.map(el => el.dataValues) : res.dataValues;\n      return data;\n    } catch (err) {\n      console.log(err);\n      return null;\n    }\n  }),\n  handlePostData: postData => {\n    postData.theme = postData.Type.name;\n    delete postData.Type;\n    let cobj = {};\n\n    for (let content of postData.Contents) {\n      cobj[content.Subtitle.name] = content.body;\n    }\n\n    postData.content = cobj;\n    delete postData.Contents;\n    let tagArr = [];\n\n    for (let ptcon of postData.postings_tags) {\n      tagArr.push(ptcon.Tag.name);\n    }\n\n    postData.selected_tags = tagArr;\n    delete postData.postings_tags;\n    return postData;\n  },\n  handlePostDatas: postDatas => {\n    return postDatas.map(postData => {\n      postData.theme = postData.Type.name;\n      delete postData.Type;\n      let cobj = {};\n\n      for (let content of postData.Contents) {\n        cobj[content.Subtitle.name] = content.body;\n      }\n\n      postData.content = cobj;\n      delete postData.Contents;\n      let tagArr = [];\n\n      for (let ptcon of postData.postings_tags) {\n        tagArr.push(ptcon.Tag.name);\n      }\n\n      postData.selected_tags = tagArr;\n      delete postData.postings_tags;\n      return postData;\n    });\n  },\n  handleCompanyData: companyData => {\n    let ctagArr = [];\n\n    for (let ctag of companyData.companies_tags) {\n      ctagArr.push(ctag.Tag.name);\n    }\n\n    companyData.company_tags = ctagArr;\n    delete companyData.companies_tags;\n    return companyData;\n  },\n  handleCompanyDatas: companyDatas => {\n    return companyDatas.map(companyData => {\n      let ctagArr = [];\n\n      for (let ctag of companyData.companies_tags) {\n        ctagArr.push(ctag.Tag.name);\n      }\n\n      companyData.company_tags = ctagArr;\n      delete companyData.companies_tags;\n      return companyData;\n    });\n  },\n  handleTagDatas: Tags => {\n    let obj = {};\n    Tags.map(tag => {\n      tag.Tag.dataValues.postings_tags.map(post => {\n        if (post.Posting.user_id in obj) {\n          obj[post.Posting.user_id]++;\n        } else {\n          obj[post.Posting.user_id] = 1;\n        }\n      });\n    });\n    return Object.entries(obj).sort((a, b) => b[1] - a[1]);\n  }\n};\n\n//# sourceURL=webpack:///./services/helper.js?");

/***/ }),

/***/ "./services/index.js":
/*!***************************!*\
  !*** ./services/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n  userService: __webpack_require__(/*! ./userService */ \"./services/userService.js\"),\n  postingService: __webpack_require__(/*! ./postingService */ \"./services/postingService.js\"),\n  companyService: __webpack_require__(/*! ./companyService */ \"./services/companyService.js\")\n};\n\n//# sourceURL=webpack:///./services/index.js?");

/***/ }),

/***/ "./services/postingService.js":
/*!************************************!*\
  !*** ./services/postingService.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {\n  function adopt(value) {\n    return value instanceof P ? value : new P(function (resolve) {\n      resolve(value);\n    });\n  }\n\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function step(result) {\n      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);\n    }\n\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\nconst {\n  users,\n  companies,\n  postings,\n  types,\n  subtitles,\n  contents,\n  tags\n} = __webpack_require__(/*! ./access */ \"./services/access/index.js\");\n\nconst {\n  handlePostData,\n  handlePostDatas,\n  handleCompanyDatas\n} = __webpack_require__(/*! ./helper */ \"./services/helper.js\");\n\nconst postingService = {\n  create: postingData => __awaiter(void 0, void 0, void 0, function* () {\n    const typeData = yield types.findByName(postingData.theme);\n\n    if (!typeData) {\n      return {\n        success: false,\n        payload: null,\n        message: \"can't find theme\"\n      };\n    }\n\n    postingData.type_id = typeData.id;\n    const postCreate = yield postings.create(postingData);\n\n    if (!postCreate) {\n      return {\n        success: false,\n        payload: null,\n        message: 'error occurred'\n      };\n    }\n\n    const post_id = postCreate.id;\n    const subtDatas = yield subtitles.findByTypeid(typeData.id);\n\n    for (let subtitle of subtDatas) {\n      const {\n        name,\n        id\n      } = subtitle;\n      const content = postingData.content[name];\n      const contentCreate = yield contents.create(post_id, id, content);\n\n      if (!contentCreate) {\n        const postDelete = yield postings.delete(post_id);\n\n        if (!postDelete) {\n          return {\n            success: false,\n            payload: null,\n            message: \"can't create content, can't delete post\"\n          };\n        }\n\n        return {\n          success: false,\n          payload: null,\n          message: \"can't create content\"\n        };\n      }\n    }\n\n    return {\n      success: true,\n      payload: postCreate,\n      message: 'created'\n    };\n  }),\n  find: post_id => __awaiter(void 0, void 0, void 0, function* () {\n    let postRecord = yield postings.findById(post_id);\n\n    if (!postRecord) {\n      return {\n        success: false,\n        payload: null,\n        message: \"can't find post\"\n      };\n    }\n\n    let postData = handlePostData(postRecord);\n    const userData = yield users.findById(postData.user_id);\n\n    if (userData) {\n      postData.user = {\n        email: userData.email,\n        username: userData.username,\n        position: userData.position,\n        certificate: userData.certificate\n      };\n    }\n\n    return {\n      success: true,\n      payload: postData,\n      message: 'successfully found'\n    };\n  }),\n  getHome: () => __awaiter(void 0, void 0, void 0, function* () {\n    let data = {};\n    let newPostDatas = yield postings.findByNew(10);\n\n    if (!newPostDatas) {\n      return {\n        success: false,\n        payload: null,\n        message: \"can't find new posts\"\n      };\n    }\n\n    data.new_post = handlePostDatas(newPostDatas);\n    let ManyLikePostDatas = yield postings.findByManyLike(10);\n\n    if (!ManyLikePostDatas) {\n      return {\n        success: false,\n        payload: null,\n        message: \"can't find recommended posts\"\n      };\n    }\n\n    data.recommended_post = handlePostDatas(ManyLikePostDatas);\n    let newCompanies = yield companies.findByNew(10);\n\n    if (!newCompanies) {\n      return {\n        success: false,\n        payload: null,\n        message: \"can't find companies\"\n      };\n    }\n\n    data.new_companies = handleCompanyDatas(newCompanies);\n    return {\n      success: true,\n      payload: data,\n      message: 'success'\n    };\n  }),\n  findBlog: user_id => __awaiter(void 0, void 0, void 0, function* () {\n    let blogPostDatas = {};\n    const typeDatas = yield types.findAll();\n\n    if (!typeDatas) {\n      return {\n        success: false,\n        payload: null,\n        message: \"can't find types\"\n      };\n    }\n\n    for (let typeData of typeDatas) {\n      let themePostDatas = yield postings.findByUserTheme(user_id, typeData.id);\n\n      if (!themePostDatas) {\n        return {\n          success: false,\n          payload: null,\n          message: \"can't find post\"\n        };\n      }\n\n      blogPostDatas[typeData.name + '_posts'] = handlePostDatas(themePostDatas);\n    }\n\n    return {\n      success: true,\n      payload: blogPostDatas,\n      message: 'all posts found'\n    };\n  }),\n  findByUser: user_id => __awaiter(void 0, void 0, void 0, function* () {\n    let userPostDatas = yield postings.findByUser(user_id);\n\n    if (!userPostDatas) {\n      return {\n        success: false,\n        payload: null,\n        message: \"can't find post\"\n      };\n    }\n\n    return {\n      success: true,\n      payload: userPostDatas,\n      message: 'all posts found'\n    };\n  }),\n  addTags: (post_id, selected_tags) => __awaiter(void 0, void 0, void 0, function* () {\n    let tagDatas = [];\n\n    for (let tag_name of selected_tags) {\n      const findTag = yield tags.findByName(tag_name);\n\n      if (!findTag) {\n        return {\n          success: false,\n          payload: null,\n          message: \"can't find tag\"\n        };\n      }\n\n      tagDatas.push({\n        post_id,\n        tag_id: findTag.id\n      });\n    }\n\n    const addTag = yield tags.addPTTags(tagDatas);\n\n    if (!addTag) {\n      return {\n        success: false,\n        payload: null,\n        message: \"can't put tags in\"\n      };\n    }\n\n    return {\n      success: true,\n      payload: null,\n      message: 'successfully taged'\n    };\n  }),\n  like: post_id => __awaiter(void 0, void 0, void 0, function* () {\n    const likeResult = yield postings.increaseLike(post_id);\n\n    if (!likeResult) {\n      return {\n        success: false,\n        payload: null,\n        message: \"There's an error while like\"\n      };\n    }\n\n    return {\n      success: true,\n      payload: likeResult,\n      message: 'post liked'\n    };\n  }),\n  unlike: post_id => __awaiter(void 0, void 0, void 0, function* () {\n    const unLikeResult = yield postings.decreaseLike(post_id);\n\n    if (!unLikeResult) {\n      return {\n        success: false,\n        payload: null,\n        message: \"There's an error while undo like\"\n      };\n    }\n\n    return {\n      success: true,\n      payload: unLikeResult,\n      message: 'post unliked'\n    };\n  }),\n  update: (user_id, postingData) => __awaiter(void 0, void 0, void 0, function* () {\n    const {\n      id,\n      title,\n      content\n    } = postingData;\n    const postData = yield postings.findById(id);\n\n    if (!postData) {\n      return {\n        success: false,\n        payload: null,\n        message: \"can't find post\"\n      };\n    }\n\n    if (postData.user_id !== user_id) {\n      return {\n        success: false,\n        payload: null,\n        message: 'it is not your post'\n      };\n    }\n\n    const contentDatas = yield contents.findByPostId(id);\n\n    if (!contentDatas) {\n      return {\n        success: false,\n        payload: null,\n        message: \"can't find content\"\n      };\n    }\n\n    for (let element of contentDatas) {\n      if (element.Subtitle.name in content) {\n        element.body = content[element.Subtitle.name];\n        const updateContents = yield contents.update(element);\n\n        if (!updateContents) {\n          return {\n            success: false,\n            payload: null,\n            message: 'fail to update'\n          };\n        }\n      }\n    }\n\n    const deleteTags = yield tags.deleteByPostId(id);\n    const updateTitles = yield postings.updateTitleById(id, title);\n\n    if (!updateTitles) {\n      return {\n        success: false,\n        payload: null,\n        message: 'fail to update title'\n      };\n    }\n\n    return {\n      success: true,\n      payload: null,\n      message: 'post updated'\n    };\n  }),\n  delete: post_id => __awaiter(void 0, void 0, void 0, function* () {\n    const deleteTags = yield tags.deleteByPostId(post_id);\n    const deleteContents = yield contents.deleteByPostId(post_id);\n    const deleteResult = yield postings.delete(post_id);\n    return {\n      success: true,\n      payload: deleteResult,\n      message: 'deleted'\n    };\n  }),\n  test: id => __awaiter(void 0, void 0, void 0, function* () {\n    let contentDatas = yield contents.findByPostId(id);\n    return {\n      success: true,\n      payload: contentDatas,\n      message: 'deleted'\n    };\n  })\n};\nmodule.exports = postingService;\n\n//# sourceURL=webpack:///./services/postingService.js?");

/***/ }),

/***/ "./services/userService.js":
/*!*********************************!*\
  !*** ./services/userService.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {\n  function adopt(value) {\n    return value instanceof P ? value : new P(function (resolve) {\n      resolve(value);\n    });\n  }\n\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function step(result) {\n      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);\n    }\n\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\nconst users = __webpack_require__(/*! ./access/users */ \"./services/access/users.js\");\n\nconst {\n  isValid\n} = __webpack_require__(/*! ../utils/token */ \"./utils/token.js\");\n\nconst postingService = __webpack_require__(/*! ./postingService */ \"./services/postingService.js\");\n\nconst UserService = {\n  signin: (emailOrUsername, password) => __awaiter(void 0, void 0, void 0, function* () {\n    let userData;\n    userData = yield users.findByEmail(emailOrUsername);\n\n    if (!userData) {\n      userData = yield users.findByUsername(emailOrUsername);\n    }\n\n    if (!userData) {\n      return {\n        success: false,\n        payload: null,\n        message: 'unvalid user'\n      };\n    }\n\n    if (userData.password !== password) {\n      return {\n        success: false,\n        payload: null,\n        message: 'wrong password'\n      };\n    }\n\n    return {\n      success: true,\n      payload: userData,\n      message: 'found user'\n    };\n  }),\n  signup: userData => __awaiter(void 0, void 0, void 0, function* () {\n    const userCreate = yield users.create(userData);\n\n    if (userCreate === 'duplicated') {\n      return {\n        success: false,\n        payload: null,\n        message: 'duplicated'\n      };\n    }\n\n    if (userCreate === 'created') {\n      return {\n        success: true,\n        payload: null,\n        message: 'created'\n      };\n    }\n\n    return {\n      success: false,\n      payload: null,\n      message: String(userCreate)\n    };\n  }),\n  update: userRecord => __awaiter(void 0, void 0, void 0, function* () {\n    const updateRecord = yield users.updateByEmail(userRecord);\n\n    if (!updateRecord) {\n      return {\n        success: false,\n        payload: null,\n        message: \"can't update user\"\n      };\n    }\n\n    return {\n      success: true,\n      payload: updateRecord,\n      message: 'successfully update user'\n    };\n  }),\n  updatebyId: userRecord => __awaiter(void 0, void 0, void 0, function* () {\n    const updateRecord = yield users.updateById(userRecord);\n\n    if (!updateRecord) {\n      return {\n        success: false,\n        payload: null,\n        message: \"can't update user\"\n      };\n    }\n\n    return {\n      success: true,\n      payload: updateRecord,\n      message: 'successfully update user'\n    };\n  }),\n  findByToken: token => __awaiter(void 0, void 0, void 0, function* () {\n    const decode = yield isValid(token);\n\n    if (!decode.isValid) {\n      return {\n        success: false,\n        payload: null,\n        message: 'login required'\n      };\n    }\n\n    const {\n      email,\n      password\n    } = decode.userData;\n    const userData = yield users.findByEmail(email);\n\n    if (!userData) {\n      return {\n        success: false,\n        payload: null,\n        message: 'unvalid user'\n      };\n    }\n\n    if (userData.password !== password) {\n      return {\n        success: false,\n        payload: null,\n        message: 'wrong password'\n      };\n    }\n\n    return {\n      success: true,\n      payload: userData,\n      message: 'id found'\n    };\n  }),\n  checkEmail: email => __awaiter(void 0, void 0, void 0, function* () {\n    const findRecord = yield users.findByEmail(email);\n\n    if (!findRecord) {\n      return {\n        success: true,\n        payload: null,\n        message: 'not duplicated'\n      };\n    }\n\n    return {\n      success: false,\n      payload: null,\n      message: 'duplicated'\n    };\n  }),\n  delete: user_id => __awaiter(void 0, void 0, void 0, function* () {\n    const userPostResult = yield postingService.findByUser(user_id);\n\n    if (!userPostResult.success) {\n      return {\n        success: false,\n        payload: null,\n        message: \"can't find posts\"\n      };\n    }\n\n    for (let userPost of userPostResult.payload) {\n      const deletePostResult = yield postingService.delete(userPost.id);\n\n      if (!deletePostResult.success) {\n        return {\n          success: false,\n          payload: null,\n          message: \"can't delete post\"\n        };\n      }\n    }\n\n    const deleteResult = yield users.delete(user_id);\n    return {\n      success: true,\n      payload: null,\n      message: 'deleted'\n    };\n  })\n};\nmodule.exports = UserService;\n\n//# sourceURL=webpack:///./services/userService.js?");

/***/ }),

/***/ "./utils/token.js":
/*!************************!*\
  !*** ./utils/token.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n\nconst tokenGenerator = data => {\n  return new Promise((res, rej) => {\n    jwt.sign(data, 'secret', {\n      algorithm: 'HS256',\n      expiresIn: '1d'\n    }, function (err, token) {\n      if (err) {\n        throw err;\n      }\n\n      res(token);\n    });\n  });\n};\n\nconst isValid = token => {\n  return new Promise((res, rej) => {\n    jwt.verify(token, 'secret', (err, decode) => {\n      if (err) {\n        res({\n          isValid: false\n        });\n      } else {\n        const exp = new Date(decode.exp * 1000);\n        const now = new Date();\n\n        if (exp < now) {\n          res({\n            isValid: false\n          });\n        } else {\n          res({\n            isValid: true,\n            token: token,\n            userData: decode\n          });\n        }\n      }\n    });\n  });\n};\n\nmodule.exports = {\n  tokenGenerator,\n  isValid\n};\n\n//# sourceURL=webpack:///./utils/token.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cookie-parser\");\n\n//# sourceURL=webpack:///external_%22cookie-parser%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-session\");\n\n//# sourceURL=webpack:///external_%22express-session%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ }),

/***/ "object-assign":
/*!********************************!*\
  !*** external "object-assign" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"object-assign\");\n\n//# sourceURL=webpack:///external_%22object-assign%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"sequelize\");\n\n//# sourceURL=webpack:///external_%22sequelize%22?");

/***/ }),

/***/ "vary":
/*!***********************!*\
  !*** external "vary" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"vary\");\n\n//# sourceURL=webpack:///external_%22vary%22?");

/***/ })

/******/ })));