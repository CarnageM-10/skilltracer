// src/app/LoginForm.jsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkUser  } from '../api/connexion/route'; 

export default function LoginForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await checkUser ({ name, email });
      if (user) {
        router.push('/taskManager');
      } else {
        setError('Nom ou email incorrect.');
      }
    } catch (err) {
      console.error(err);
      setError('Une erreur est survenue lors de la connexion.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Connexion</h2>
        
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
            Se connecter
          </button>
        </div>
        
        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>} {/* Affichage de l'erreur */}
      </form>
    </div>
  );
}