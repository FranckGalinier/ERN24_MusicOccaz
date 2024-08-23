import express from 'express';
import dbcon from "../db/dbcon.js";
import { ObjectId } from 'mongodb';

const router = express.Router();


// GET tous les instruments
router.get("/", async (req, res) => {
  try {
    let collection = dbcon.collection("instru");
    let instru = await collection.find().toArray();
    if (instru.length === 0) {
      res.status(404).send("Aucun instrument trouvé");
    } else {
      res.status(200).json(instru);
    }
  } catch (error) {
    res.status(500).send("Erreur serveur : " + error.message);
  }
});

// GET un instrument spécifique par ID
router.get("/instru/:id", async (req, res) => {
  try {
    let collection = dbcon.collection("instru");
    let query = { _id: new ObjectId(req.params.id) };
    let instru = await collection.findOne(query);

    if (!instru) {
      res.status(404).send("Instrument non trouvé");
    } else {
      res.status(200).json(instru);
    }
  } catch (error) {
    res.status(500).send("Erreur serveur : " + error.message);
  }
});

// PUT (mise à jour) d'un instrument
router.put("/:id", async (req, res) => {
  try {
    let collection = dbcon.collection("instru");
    let query = { _id: new ObjectId(req.params.id) };
    let newValues = { $set: req.body };

    let result = await collection.updateOne(query, newValues);

    if (result.matchedCount === 0) {
      res.status(404).send("Instrument non trouvé");
    } else {
      res.status(200).send("Instrument mis à jour avec succès");
    }
  } catch (error) {
    res.status(500).send("Erreur serveur : " + error.message);
  }
});

// DELETE un instrument
router.delete("/:id", async (req, res) => {
  try {
    let collection = dbcon.collection("instru");
    let query = { _id: new ObjectId(req.params.id) };

    let result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      res.status(404).send("Instrument non trouvé");
    } else {
      res.status(200).send("Instrument supprimé avec succès");
    }
  } catch (error) {
    res.status(500).send("Erreur serveur : " + error.message);
  }
});

export default router;