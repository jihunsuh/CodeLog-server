// src/app.js
import Server from './server';

const server = new Server();

// serverless-http의 entry point
export const { handler } = server;
