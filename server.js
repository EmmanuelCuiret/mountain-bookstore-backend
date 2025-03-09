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

const allowedOrigins = ['http://localhost:5173','http://localhost:5174'];
const corsOptions = {
    origin: function (origin, callback) {
        if(allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

//app.use(cors());
app.use(cors(corsOptions));
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