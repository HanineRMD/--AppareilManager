const express = require("express");
const route = express.Router();
const Appareil = require("../models/appareil.model");

// GET - Récupérer tous les appareils
route.get("/", (req, res) => {
  Appareil.find()
    .then((appareils) => res.status(200).json(appareils))
    .catch((error) => res.status(400).json({ error }));
});

// GET - Récupérer un appareil par ID
route.get("/:id", (req, res) => {
  Appareil.findOne({ _id: req.params.id })
    .then((appareil) => res.status(200).json(appareil))
    .catch((error) => res.status(404).json({ error }));
});

// POST - Créer un nouvel appareil
route.post("/", (req, res) => {
  const appareil = new Appareil({
    ...req.body,
  });
  appareil
    .save()
    .then(() => res.status(201).json({ message: "Appareil enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
});

// DELETE - Supprimer un appareil
route.delete("/:id", (req, res) => {
  Appareil.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Appareil supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
});

// PUT - Modifier un appareil
route.put("/:id", (req, res) => {
  Appareil.updateOne(
    { _id: req.params.id },
    { ...req.body, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Appareil modifié !" }))
    .catch((error) => res.status(400).json({ error }));
});

// POST - Allumer tous les appareils
route.post("/all/on", (req, res) => {
  Appareil.updateMany({}, { status: "Allumé" })
    .then(() => res.status(200).json({ message: "Tous les appareils allumés !" }))
    .catch((error) => res.status(400).json({ error }));
});

// POST - Éteindre tous les appareils
route.post("/all/off", (req, res) => {
  Appareil.updateMany({}, { status: "Eteint" })
    .then(() => res.status(200).json({ message: "Tous les appareils éteints !" }))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = route;