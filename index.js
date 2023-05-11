import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import technologyRoutes from './routes/technologyRoutes.js'
import mailRoutes from './routes/mailRoutes.js';
import { allowCors, handler } from './config/vercel.js';

const app = express();

app.use(express.json());

dotenv.config();

connectDB();

const whitelist = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function(origin, callback) {
        if(whitelist.includes(origin)) {
            callback(null, true)
        }   else {
            callback(new Error('Error de Cors'))
        }
    }
}

allowCors(handler);
app.use(cors(corsOptions));

//Routing
app.use('/api/user', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/technology', technologyRoutes);
app.use('/api/mail', mailRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

