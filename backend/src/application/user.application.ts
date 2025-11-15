import { Injectable } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { users } from "src/helpers/mocks/user.mock";
import { CreateUserRequest } from "src/helpers/request/user/create-user.request";
import { UpdateUserRequest } from "src/helpers/request/user/update-user.request";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserApplication {
    public list(): User[] {
        return users;
    }

    public listByProfile(profileId: string): User[] {
        return users.filter((user) => user.profileId === profileId);
    }

    public findById(id: string): User {
        const user: User | undefined = users.find((user) => user.id === id);
        if (!user) throw new Error('User not found');
        return user;
    }

    public create(request: CreateUserRequest): User {
        const newUser: User = {
            id: uuidv4(),
            firstName: request.firstName,
            lastName: request.lastName,
            email: request.email,
            isActive: true,
            profileId: request.profileId,
        };
        users.push(newUser);
        return newUser;
    }
    
    public update(request: UpdateUserRequest): User {
        const existingUser: User | undefined = this.findUser(request.id);
        
        if(request.firstName) existingUser.firstName = request.firstName;
        if(request.lastName) existingUser.lastName = request.lastName;
        if(request.email) existingUser.email = request.email;
        if(request.profileId) existingUser.profileId = request.profileId;

        this.updateUser(existingUser.id, existingUser);
        
        return existingUser;
    }

    public toggleActive(userId: string) {
        const existingUser: User | undefined = this.findUser(userId);

        existingUser.isActive = !existingUser.isActive;

        this.updateUser(existingUser.id, existingUser);

        return existingUser;
    }

    public delete(userId: string) {
        const existingUser: User | undefined = this.findUser(userId);
        users.filter((user) => user.id !== existingUser.id);
        return true;
    }

    private findUser(id: string): User {
        const existingUser: User | undefined = users.find((user) => user.id === id);
        if (!existingUser) throw new Error('User not found');
        return existingUser;
    }

    private updateUser(id: string, newUserData: User) {
        const updatedUserIndex: number = users.findIndex((user) => user.id === id);
        users[updatedUserIndex] = newUserData;
    }
}