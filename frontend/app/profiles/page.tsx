'use client';

import { useEffect, useState } from 'react';
import { Profile } from '../../types';
import { profileAPI } from '../../api';
import { useRouter } from 'next/navigation';

export default function ProfilesPage() {
    const router = useRouter();
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async () => {
        try {
            setLoading(true);
            const res = await profileAPI.getAll();
            setProfiles(res.data);
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Erro ao carregar perfis');
        } finally {
            setLoading(false);
        }
    };

    const goBack = () => {
        router.push('/');
    }


  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h1 className="text-2xl text-rose-950">Perfis</h1>
            <button
                onClick={goBack}
                className="bg-rose-950 text-white p-2 w-fit rounded-lg cursor-pointer"
            >
                Voltar
            </button>
        </div>

        {error && (
            <div style={{ padding: '10px', backgroundColor: '#fee', borderRadius: '4px', marginBottom: '20px', color: '#c00' }}>
                    {error}
            </div>
        )}

            {loading ? (
                <p>Carregando...</p>
            ) : profiles.length === 0 ? (
                <p>Nenhum perfil encontrado.</p>
            ) : (
                <div className='grid grid-cols-3 gap-6'>
                {profiles.map((profile) => (
                    <div
                        key={profile.id}
                        className='p-5 border border-gray-500 rounded-md bg-[#f9f9f9]'
                    >
                        <h3>{profile.name}</h3>
                        <p style={{ color: '#666', fontSize: '14px' }}>ID: {profile.id}</p>
                    </div>
                ))}
                </div>
            )}
        </div>
  );
}
