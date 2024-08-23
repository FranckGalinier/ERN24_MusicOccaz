import express from 'express';
import bcrypt from 'bcrypt';
import dbcon from '../db/dbcon.js';

const router = express.Router();

//Route pour l'inscription
router.post("/register", async (req, res) => {
  try {
    const { username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const collection = dbcon.collection("users");
    const result = await collection.insertOne({ username, email, password: hashedPassword });

    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur : " + error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await collection.findOne({ email }); // Assurez-vous que c'est le bon modèle/collection
    
    if (!user) {
      console.log('Aucun utilisateur trouvé avec cet email:', email);
      return res.status(400).json({ message: "Email ou mot de passe incorrect" });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Résultat de la comparaison des mots de passe:', isMatch);
    
    if (!isMatch) {
      return res.status(400).json({ message: "Email ou mot de passe incorrect" });
    }
    
    // Générer et envoyer le token JWT ici
    res.json({ message: "Connexion réussie" });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;