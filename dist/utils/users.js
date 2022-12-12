"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOneUser = void 0;
const context_1 = require("../context");
const findOneUser = async (id) => {
    return await context_1.context.prisma.user.findFirstOrThrow({
        where: {
            id,
        },
    });
};
exports.findOneUser = findOneUser;
