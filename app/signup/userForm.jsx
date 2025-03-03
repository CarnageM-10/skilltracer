// src/app/userForm.jsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importer useRouter pour la redirection
import { createUser  } from '../api/mon_api/route'; // Importez votre action serveur

export default function UserForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const router = useRouter(); // Initialiser useRouter

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser ({ name, email });
            // Rediriger vers la page de connexion après une inscription réussie
            router.push('/login');
        } catch (err) {
            console.error(err);
            setError('Une erreur est survenue lors de l\'inscription.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Inscription</h2>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
                        Nom
                    </label>
                    <input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Votre nom"
                        required
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Votre email"
                        required
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        S'inscrire
                    </button>
                </div>
                
                {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>} {/* Affichage de l'erreur */}
            </form>
        </div>
    );
}