import { Injectable } from "@nestjs/common";
import { Profile } from "src/entities/profile.entity";
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class ProfileService {
    private profiles: Profile[] = [
        { id: '1', name: 'Admin' },
        { id: '2', name: 'User' },
        { id: '3', name: 'Manager' },
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