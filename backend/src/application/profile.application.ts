import { Injectable } from "@nestjs/common";
import { Profile } from "src/entities/profile.entity";
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class ProfileApplication {
    private profiles: Profile[] = [
        { id: uuid4(), name: 'Admin' },
        { id: uuid4(), name: 'User' },
        { id: uuid4(), name: 'Manager' },
    ];

    public list(): Profile[] {
        return this.profiles;
    }

    public findById(id: string): Profile {
        const profile: Profile | undefined = this.profiles.find((profile) => profile.id === id);
        if (!profile) throw new Error('Profile not found');
        return profile;
    }
}