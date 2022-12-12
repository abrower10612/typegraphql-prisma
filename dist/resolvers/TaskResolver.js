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
exports.TaskStatusInput = exports.TaskCreateInput = void 0;
const type_graphql_1 = require("type-graphql");
const Task_1 = __importDefault(require("../entities/Task"));
const users_1 = require("../utils/users");
/**
 * input fields for creating a task
 */
let TaskCreateInput = class TaskCreateInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], TaskCreateInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], TaskCreateInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], TaskCreateInput.prototype, "ownerId", void 0);
TaskCreateInput = __decorate([
    (0, type_graphql_1.InputType)()
], TaskCreateInput);
exports.TaskCreateInput = TaskCreateInput;
/**
 * input fields for updating status of a task
 */
let TaskStatusInput = class TaskStatusInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], TaskStatusInput.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], TaskStatusInput.prototype, "ownerId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], TaskStatusInput.prototype, "status", void 0);
TaskStatusInput = __decorate([
    (0, type_graphql_1.InputType)()
], TaskStatusInput);
exports.TaskStatusInput = TaskStatusInput;
let TaskResolver = class TaskResolver {
    /**
     * get all tasks for speciic user
     * @param ownerId
     * @param ctx
     * @returns
     */
    async getTasks(ownerId, ctx) {
        const owner = await (0, users_1.findOneUser)(ownerId);
        return ctx.prisma.task.findMany({
            where: {
                owner,
            },
        });
    }
    /**
     * get all tasks with status INCOMPLETE for specific user
     * @param ownerId
     * @param ctx
     * @returns
     */
    async getIncompleteTasks(ownerId, ctx) {
        const owner = await (0, users_1.findOneUser)(ownerId);
        return ctx.prisma.task.findMany({
            where: {
                owner,
                status: 'INCOMPLETE',
            },
        });
    }
    /**
     * get all tasks with status COMPLETE for specific user
     * @param ownerId
     * @param ctx
     * @returns
     */
    async getCompleteTasks(ownerId, ctx) {
        const owner = await (0, users_1.findOneUser)(ownerId);
        return ctx.prisma.task.findMany({
            where: {
                owner,
                status: 'COMPLETE',
            },
        });
    }
    /**
     * create a new task for a specific user
     * @param data
     * @param ctx
     * @returns
     */
    async createTask(data, ctx) {
        const owner = await (0, users_1.findOneUser)(data.ownerId);
        return ctx.prisma.task.create({
            data: {
                title: data.title,
                description: data.description,
                ownerId: owner.id,
            },
        });
    }
    /**
     * toggle the status of a user's task between INCOMPLETE and COMPLETE
     * @param data
     * @param ctx
     * @returns
     */
    async toggleTaskStatus(data, ctx) {
        const owner = await (0, users_1.findOneUser)(data.ownerId);
        const task = await ctx.prisma.task.findFirstOrThrow({
            where: {
                id: data.id,
                ownerId: owner.id,
            },
        });
        return ctx.prisma.task.update({
            where: {
                id: data.id,
            },
            data: {
                status: task.status === 'COMPLETE' ? 'INCOMPLETE' : 'COMPLETE',
            },
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Task_1.default]),
    __param(0, (0, type_graphql_1.Arg)('ownerId')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "getTasks", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Task_1.default]),
    __param(0, (0, type_graphql_1.Arg)('ownerId')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "getIncompleteTasks", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Task_1.default]),
    __param(0, (0, type_graphql_1.Arg)('ownerId')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "getCompleteTasks", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Task_1.default),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TaskCreateInput, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "createTask", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Task_1.default),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TaskStatusInput, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "toggleTaskStatus", null);
TaskResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], TaskResolver);
exports.default = TaskResolver;
