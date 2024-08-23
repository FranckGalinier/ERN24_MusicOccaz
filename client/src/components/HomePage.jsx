import React from 'react';
import { Link } from 'react-router-dom';

function HomePage({ instruments }) {
  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="display-4">Bienvenue sur MusicOccaz</h1>
        <p className="lead">Trouvez l'instrument de vos rêves à prix réduit !</p>
      </div>

      <h2 className="mb-4">Nos meilleures offres</h2>
      <div className="row">
        {instruments.map((instru) => (
          <div className="col-md-4 mb-4" key={instru._id || instru.name}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{instru.name}</h5>
                <p className="card-text">Marque : {instru.marque}</p>
                <p className="card-text">Etat : {instru.etat}</p>
                <p className="card-text">Prix : {instru.prix} €</p>
                <Link to={`/instru/${instru._id}`} className="btn btn-primary">Voir plus</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
        <h2>Pourquoi choisir MusicOccaz ?</h2>
        <p>Qualité garantie, prix imbattables, et passion pour la musique !</p>
        <button className="btn btn-success btn-lg">Découvrir notre sélection</button>
      </div>
    </div>
  );
}

export default HomePage;