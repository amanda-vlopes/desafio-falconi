import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { ProfileApplication } from "src/application/profile.application";

@Controller('profiles')
export class ProfileController {
    constructor(private readonly profileApplication: ProfileApplication) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    public list() {
        return this.profileApplication.list();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    public findById(id: string) {
        return this.profileApplication.findById(id);
    }
}