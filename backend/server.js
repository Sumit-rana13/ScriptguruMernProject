// import app from './app.js';

import dotenv from 'dotenv';
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import boardRoutes from './routes/boardRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

dotenv.config();
const app = express()



app.use(cors());
app.use(express.json());


app.use('/api/boards', boardRoutes);
app.use('/api/tasks', taskRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB failed to connected", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
