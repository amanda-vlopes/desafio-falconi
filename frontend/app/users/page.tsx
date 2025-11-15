"use client"
import { useEffect, useState } from "react";
import { Profile, User } from "../../types";
import { profileAPI, userAPI } from "../../api";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UsersPage() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedProfileId, setSelectedProfileId] = useState<string>('');

    useEffect(() => {
        fetchData();
    }, []);

  const fetchData = async () => {
    try {
        setLoading(true);
        const [usersRes, profilesRes] = await Promise.all([
            userAPI.getAll(),
            profileAPI.getAll(),
        ]);
        setUsers(usersRes.data);
        setProfiles(profilesRes.data);
        setError(null);
        } catch (err: any) {
        setError(err.message || 'Erro ao carregar dados');
        } finally {
        setLoading(false);
        }
    };

    const handleFilterByProfile = async (profileId: string) => {
        setSelectedProfileId(profileId);
        if (!profileId) {
            fetchData();
            return;
        }
        try {
            const res: AxiosResponse<User[]> = await userAPI.getAll(profileId);
            setUsers(res.data);
        } catch (err: any) {
            setError(err.message || 'Erro ao filtrar usuários');
        }
    };

    const handleToggleActive = async (id: string) => {
        try {
            const res: AxiosResponse<User> = await userAPI.toggleActive(id);
            setUsers(users.map((u: User) => (u.id === id ? res.data : u)));
        } catch (err: any) {
            setError(err.message || 'Erro ao atualizar usuário');
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja deletar este usuário?')) {
            try {
                await userAPI.delete(id);
                setUsers(users.filter((u) => u.id !== id));
            } catch (err: any) {
                setError(err.message || 'Erro ao deletar usuário');
            }
        }
  };

    const getProfileName = (profileId: string) => {
        return profiles.find((p) => p.id === profileId)?.name || 'N/A';
    };

    const goBack = () => {
        router.push('/');
    }

    const createUser = () => {
        router.push('/users/new')
    }

    return (
        <div className="bg-white p-6 gap-6 flex flex-col h-screen">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl text-rose-950">Usuários</h1>
                <div className="flex gap-4 items-center">
                    <button
                        onClick={goBack}
                        className="bg-rose-950 text-white p-2 w-fit rounded-lg cursor-pointer"
                    >
                        Voltar
                    </button>
                    <button
                        onClick={createUser}
                        className="bg-rose-950 text-white p-2 w-fit rounded-lg cursor-pointer"
                    >
                        Criar usuário
                    </button>
                </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
                <label>
                    Filtrar por perfil:{' '}
                    <select
                        value={selectedProfileId}
                        onChange={(e) => handleFilterByProfile(e.target.value)}
                        className="p-1.5 ml-2.5"
                    >
                        <option value="">Todos os perfis</option>
                        {profiles.map((profile) => (
                            <option key={profile.id} value={profile.id}>
                                {profile.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div className="flex gap-4">
            {loading ? (
                <p>Carregando...</p>
            ) : users.length === 0 ? (
                <p>Nenhum usuário encontrado.</p>
            ) : (
                    <table className="border-collapse w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="p-2.5 text-start text-rose-950">
                                    Nome
                                </th>
                                <th className="p-2.5 text-start text-rose-950">
                                    Email
                                </th>
                                <th className="p-2.5 text-start text-rose-950">
                                    Perfil
                                </th>
                                <th className="p-2.5 text-start text-rose-950">
                                    Status
                                </th>
                                <th className="p-2.5 text-start text-rose-950">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="">
                                    <td className="p-2.5 text-black">
                                        {user.firstName} {user.lastName}
                                    </td>
                                    <td className="p-2.5 text-black">{user.email}</td>
                                    <td className="p-2.5 text-black">{getProfileName(user.profileId)}</td>
                                    <td className="p-2.5 text-black">
                                        <span
                                            className={`py-1 px-2 rounded-sm ${
                                            user.isActive
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {user.isActive ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </td>
                                    <td className="p-2.5">
                                        <Link href={`/users/${user.id}`} className="mr-2 text-black py-1 px-2 rounded-sm bg-gray-100 hover:bg-gray-200">
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => handleToggleActive(user.id)}
                                            className={`mr-2 py-1 px-2 rounded-sm cursor-pointer bg-gray-100 text-black hover:bg-gray-200`}
                                        >
                                            {user.isActive ? 'Desativar' : 'Ativar'}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="py-1 px-2 rounded-sm cursor-pointer bg-red-900 text-white hover:bg-red-950"
                                        >
                                            Deletar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )

}