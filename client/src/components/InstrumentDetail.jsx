import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function InstrumentDetail() {
  const [instrument, setInstrument] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/api/instru/${id}`)
      .then(res => res.json())
      .then(data => setInstrument(data))
      .catch(error => console.error('Erreur:', error));
  }, [id]);

  if (!instrument) return <div>Chargement...</div>;

  return (
    <div className="container mt-5">
      <h1>{instrument.name}</h1>
      <p>Marque : {instrument.marque}</p>
      <p>État : {instrument.etat}</p>
      <p>Prix : {instrument.prix} €</p>
      {/* Ajoutez d'autres détails ici */}
    </div>
  );
}

export default InstrumentDetail;