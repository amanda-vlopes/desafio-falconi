import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from "@nestjs/common";
import { UserApplication } from "src/application/user.application";
import type { User } from "src/entities/user.entity";
import { CreateUserRequest } from "src/helpers/request/user/create-user.request";
import { UpdateUserRequest } from "src/helpers/request/user/update-user.request";


@Controller('users')
export class UserController {
    constructor(private readonly userApplication: UserApplication) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    public list(@Query('profileId') profileId?: string): User[] {
        if (profileId) {
            return this.userApplication.listByProfile(profileId);
        }
        return this.userApplication.list();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    public findById(@Query('id') id: string): User {
        return this.userApplication.findById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    public create(@Body() request: CreateUserRequest): User {
        return this.userApplication.create(request);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    public update(@Body() request: UpdateUserRequest): User {
        return this.userApplication.update(request);
    }

    @Put(':id/toggle-active')
    @HttpCode(HttpStatus.OK)
    public toggleActive(@Param('id') id: string): User {
        return this.userApplication.toggleActive(id);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    public delete(@Param('id') id: string): void {
        this.userApplication.delete(id);
    }
}