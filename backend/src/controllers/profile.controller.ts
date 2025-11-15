import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { ProfileService } from "src/services/profile.service";

@Controller('profiles')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    public list() {
        return this.profileService.list();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    public findById(id: string) {
        return this.profileService.findById(id);
    }
}