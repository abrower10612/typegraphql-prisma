"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const context_1 = require("./context");
const TaskResolver_1 = __importDefault(require("./resolvers/TaskResolver"));
const UserResolver_1 = __importDefault(require("./resolvers/UserResolver"));
const jwt = __importStar(require("express-jwt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const main = async () => {
    const app = (0, express_1.default)();
    const path = '/graphql';
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [UserResolver_1.default, TaskResolver_1.default],
        validate: false,
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({ schema, context: context_1.context });
    app.use('/graphql', jwt.expressjwt({
        secret: process.env.JWT_SECRET,
        credentialsRequired: false,
        algorithms: ['RS256'],
    }));
    apolloServer.applyMiddleware({ app, path });
    app.listen(5000, () => {
        console.log('server running on http://localhost:5000/graphql');
    });
};
main();
