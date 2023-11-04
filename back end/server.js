import express from 'express';
import * as dotenv from 'dotenv';
import connectDB from './config/db.js';
import routes from './routes/index.js';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


app.use('/products', routes.productRouter);
app.use('/categories', routes.categoryRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});