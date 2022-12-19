"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const type_graphql_1 = require("type-graphql");
const RegisterInput_1 = __importDefault(require("../entities/user/register/RegisterInput"));
const User_1 = __importDefault(require("../entities/user/User"));
let UserResolver = class UserResolver {
    /**
     * get all users
     * @param ctx
     * @returns
     */
    async getUsers(ctx) {
        return ctx.prisma.user.findMany();
    }
    /**
     * get one user by id
     * @param id
     * @param ctx
     * @returns
     */
    async getOneUser(id, ctx) {
        return ctx.prisma.user.findFirstOrThrow({
            where: {
                id,
            },
        });
    }
    /**
     * create a new user
     * @param data
     * @param ctx
     * @returns
     */
    async createUser(data, ctx) {
        const passwordHash = await bcryptjs_1.default.hash(data.password, 10);
        return ctx.prisma.user.create({
            data: {
                email: data.email,
                password: passwordHash,
                name: data.name,
            },
        });
    }
    /**
     * delete a user by email address
     * @param email
     * @param ctx
     * @returns
     */
    deleteUser(email, ctx) {
        return ctx.prisma.user.delete({
            where: {
                email,
            },
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.default]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUsers", null);
__decorate([
    (0, type_graphql_1.Query)(() => User_1.default),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getOneUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.default),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterInput_1.default, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.default),
    __param(0, (0, type_graphql_1.Arg)('email', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "deleteUser", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.default = UserResolver;
