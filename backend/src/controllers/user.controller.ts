import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from "@nestjs/common";
import { UserService } from "src/services/user.service";
import type { User } from "src/entities/user.entity";
import { CreateUserRequest } from "src/helpers/request/user/create-user.request";
import { UpdateUserRequest } from "src/helpers/request/user/update-user.request";


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    public list(@Query('profileId') profileId?: string): User[] {
        if (profileId) {
            return this.userService.listByProfile(profileId);
        }
        return this.userService.list();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    public findById(@Param('id') id: string): User {
        return this.userService.findById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    public create(@Body() request: CreateUserRequest): User {
        return this.userService.create(request);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    public update(@Body() request: UpdateUserRequest): User {
        return this.userService.update(request);
    }

    @Put(':id/toggle-active')
    @HttpCode(HttpStatus.OK)
    public toggleActive(@Param('id') id: string): User {
        return this.userService.toggleActive(id);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    public delete(@Param('id') id: string): void {
        this.userService.delete(id);
    }
}