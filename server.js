const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion MongoDB Atlas
mongoose.connect("mongodb+srv://appareilsUser:appareils123@cluster0.g50gt.mongodb.net/appareilsDB?retryWrites=true&w=majority")
  .then(() => console.log("✅ Connexion à MongoDB réussie !"))
  .catch((error) => console.log("❌ Connexion à MongoDB échouée !", error));

// Import des routes
const appareilRoutes = require("./routes/appareil.route");
app.use("/api/appareils", appareilRoutes);

// Peupler la base avec des données de test
const Appareil = require("./models/appareil.model");
const peuplerDonnees = async () => {
  try {
    const count = await Appareil.countDocuments();
    
    if (count === 0) {
      const appareilsInit = [
        { name: "Machine à laver", status: "Eteint" },
        { name: "Télévision", status: "Allumé" },
        { name: "Climatiseur", status: "Eteint" },
        { name: "Ordinateur", status: "Allumé" },
        { name: "Four", status: "Eteint" },
        { name: "Aspirateur", status: "Eteint" },
        { name: "Micro-ondes", status: "Allumé" }
      ];
      
      await Appareil.insertMany(appareilsInit);
      console.log('✅ Données de test ajoutées à MongoDB');
    } else {
      console.log(`✅ ${count} appareils déjà dans la base de données`);
    }
  } catch (error) {
    console.error('❌ Erreur peuplement données:', error);
  }
};

mongoose.connection.once('open', () => {
  peuplerDonnees();
});

// Servir Angular
app.use(express.static(path.join(__dirname, "backend/public")));

// Fallback Angular (SPA routing)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "backend/public/index.html"));
});

// Démarrage serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server backend démarré sur http://localhost:${PORT}`);
  console.log(`📡 API Appareils: http://localhost:${PORT}/api/appareils`);
});