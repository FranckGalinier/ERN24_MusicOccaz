import React, { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Envoi des données:', { username, email, password });
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      console.log('Statut de la réponse:', response.status);
      
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        console.log('Données de réponse:', data);
        if (response.ok) {
          alert('Inscription réussie !');
        } else {
          alert(`Erreur lors de l'inscription: ${data.message || 'Erreur inconnue'}`);
        }
      } else {
        const text = await response.text();
        console.error('Réponse non-JSON:', text);
        alert(`Erreur inattendue du serveur. Vérifiez les logs.`);
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert(`Erreur lors de l'inscription: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nom d'utilisateur" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required />
      <button type="submit">S'inscrire</button>
    </form>
  );
}

export default Register;