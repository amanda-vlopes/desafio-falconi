'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Profile, User } from '../../../types';
import { profileAPI, userAPI } from '../../../api';

export default function EditUserPage() {
    const router = useRouter();
    const params = useParams();
    const userId = params.id as string;

    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        profileId: '',
        isActive: true
    });

    useEffect(() => {
        fetchData();
    }, [userId]);

    const fetchData = async () => {
        console.log('userId', userId);
        
        try {
            setLoading(true);
            const [userRes, profilesRes] = await Promise.all([
                userAPI.getById(userId),
                profileAPI.getAll(),
            ]);
            setProfiles(profilesRes.data);
            const user = userRes.data;
            setFormData({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                profileId: user.profileId,
                isActive: user.isActive
            });
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Erro ao carregar usuário');
        } finally {
            setLoading(false);
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
        setSubmitting(true);
        setError(null);

        const user: User = {id: userId,  ...formData};

        try {
            await userAPI.update(user);
            router.push('/users');
        } catch (err: any) {
            setError(err.message || 'Erro ao atualizar usuário');
            setSubmitting(false);
        }
    };

    const goBack = () => {
        router.push('/users');
    }

    if (loading) {
        return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <p>Carregando...</p>
        </div>
        );
    }

    return (
        <div className='p-5 w-full m-0 bg-white flex flex-col items-center'>
            <div className="max-w-[50%]">
                <div className='mb-5 flex justify-between items-center'>
                    <h1 className='text-black'>✏️ Editar Usuário</h1>
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
                        disabled={submitting}
                        className="w-full p-2 rounded-sm border border-gray-300 text-sm bg-blue-950 text-white"
                    >
                    {submitting ? 'Atualizando...' : 'Atualizar Usuário'}
                    </button>
                </form>
            </div>
        </div>
    );
}
