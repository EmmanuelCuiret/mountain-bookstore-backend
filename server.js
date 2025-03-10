const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const projectRoutes = require('./routes/projectRoutes');
const errorHandler = require('./middlewares/errorHandler');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: "https://mountain-bookstore-frontend.netlify.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true
}));

app.options('*', cors());

app.use(express.json());

//app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev')); //Affiche les requêtes HTTP dans la console selon l'environnement

app.use('/', userRoutes);
app.use('/', candidateRoutes);
app.use('/', projectRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3300;

const pool = require('./config/db');

// 🔹 Vérification de la connexion à MariaDB avant de démarrer le serveur
async function startServer() {
    try {
        console.log('🔍 Vérification de la connexion à la base de données...');
        const [rows] = await pool.query('SELECT * from users');
        console.log([rows]);
        console.log('✅ Connexion réussie à MariaDB !');

        // 🔥 Test de executeQuery()
        const { executeQuery } = require("./services/apiService");

        async function testQuery() {
            try {
                console.log("🟡 Test de executeQuery...");
                const sql = "SELECT * FROM users WHERE login = ?";
                const params = ["becode"];
                
                console.log("🟡 Requête SQL :", sql, "avec paramètres :", params);
                
                const result = await executeQuery(sql, params);
                
                console.log("🟢 Résultat du test executeQuery :", result);
                
                if (result.length === 0) {
                    console.warn("⚠️ Aucun utilisateur trouvé avec ce login.");
                }
            } catch (error) {
                console.error("🔴 Erreur dans le test executeQuery :", error);
            }
        }

        testQuery(); // ➜ Lancer le test directement après la connexion à la DB

        app.listen(PORT, () => {
            console.log(`🚀 Serveur démarré sur le port ${PORT}`);
        });

    } catch (error) {
        console.error('❌ Erreur de connexion à la base de données :', error.message);
        process.exit(1); // Arrête le processus en cas d'échec
    }
}

// Démarrer l'application
startServer();