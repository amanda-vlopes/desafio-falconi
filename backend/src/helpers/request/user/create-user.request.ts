import { IsString } from "class-validator";

export class CreateUserRequest {
    @IsString()
    public firstName: string;

    @IsString()
    public lastName: string;

    @IsString()
    public email: string;

    @IsString()
    public profileId: string;
}