'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Profile, User } from '../../../types';
import { profileAPI, userAPI } from '../../../api';

export default function NewUserPage() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profileId: '',
  });

    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async () => {
        try {
            const res: { data: Profile[] } = await profileAPI.getAll();
            setProfiles(res.data);
            if (res.data.length > 0) {
                setFormData((prev) => ({ ...prev, profileId: res.data[0].id }));
            }
        } catch (err: any) {
            setError(err.message || 'Erro ao carregar perfis');
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await userAPI.create(formData);
            router.push('/users');
        } catch (err: any) {
            setError(err.message || 'Erro ao criar usuário');
            setLoading(false);
        }
    };

    const goBack = () => {
        router.push('/users');
    }

    return (
        <div className='p-5 w-full m-0 bg-white flex flex-col items-center'>
            <div className="max-w-[50%]">
                <div className='mb-5 flex justify-between items-center'>
                    <h1 className='text-black'>➕ Novo Usuário</h1>
                    <button
                        onClick={goBack}
                        className="bg-rose-950 text-white p-2 w-fit rounded-lg cursor-pointer"
                    >
                        Voltar
                    </button>
                </div>

                {error && (
                    <div className='p-2.5 rounded-sm mb-5 bg-red-400 text-red-800'>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='mb-1.5 text-black'>
                            Primeiro Nome *
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className='w-full p-2 rounded-sm border border-gray-300 text-sm'
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='mb-1.5 text-black'>
                            Último Nome *
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className='w-full p-2 rounded-sm border border-gray-300 text-sm'
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='mb-1.5 text-black'>
                            Email *
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className='w-full p-2 rounded-sm border border-gray-300 text-sm'
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='mb-1.5 text-black'>
                            Perfil *
                        </label>
                        <select
                            name="profileId"
                            value={formData.profileId}
                            onChange={handleChange}
                            required
                            className='w-full p-2 rounded-sm border border-gray-300 text-sm'
                        >
                            {profiles.map((profile) => (
                            <option key={profile.id} value={profile.id}>
                                {profile.name}
                            </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full p-2 rounded-sm border border-gray-300 text-sm bg-blue-950 text-white cursor-pointer"
                    >
                    {loading ? 'Criando...' : 'Criar Usuário'}
                    </button>
                </form>
            </div>
        </div>
    );
}
