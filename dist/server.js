"use strict";
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
const main = async () => {
    const app = (0, express_1.default)();
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [UserResolver_1.default, TaskResolver_1.default],
        validate: false,
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({ schema, context: context_1.context });
    apolloServer.applyMiddleware({ app });
    app.listen(5000, () => {
        console.log('server running on http://localhost:5000/graphql');
    });
};
main();
