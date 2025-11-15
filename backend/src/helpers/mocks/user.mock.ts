import { User } from "src/entities/user.entity";

export const users: User[] = [
    {
        id: '1',
        firstName: 'João',
        lastName: 'Silva',
        email: 'joao@example.com',
        isActive: true,
        profileId: '1',
    },
    {
        id: '2',
        firstName: 'Maria',
        lastName: 'Santos',
        email: 'maria@example.com',
        isActive: true,
        profileId: '2',
    },
    {
        id: '3',
        firstName: 'Pedro',
        lastName: 'Oliveira',
        email: 'pedro@example.com',
        isActive: false,
        profileId: '2',
    },
]