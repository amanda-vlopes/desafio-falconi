import { IsOptional, IsString } from "class-validator";

export class UpdateUserRequest {
    @IsString()
    public id: string;

    @IsString()
    @IsOptional()
    public firstName?: string;

    @IsString()
    @IsOptional()
    public lastName?: string;

    @IsString()
    @IsOptional()
    public email?: string;

    @IsString()
    @IsOptional()
    public profileId?: string;
}