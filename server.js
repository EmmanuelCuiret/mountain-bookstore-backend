const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const projectRoutes = require('./routes/projectRoutes');
const errorHandler = require('./middlewares/errorHandler');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

app.use(express.json());
//app.use(cors());
app.use(cors({ origin: "http://localhost:5174" }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev')); //Affiche les requêtes HTTP dans la console selon l'environnement

app.use('/api', userRoutes);
app.use('/api', candidateRoutes);
app.use('/api', projectRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Démarrage sécurisé du serveur
try {
    app.listen(PORT, () => {
        console.log(`✅ Server started on port ${PORT}`);
    });
} catch (error) {
    console.error("❌ Error starting server:", error);
}