export interface Profile {
    id: string;
    name: string;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
    profileId: string;
}
