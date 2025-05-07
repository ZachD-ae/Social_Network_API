import express from 'express';
import connectToDb from './config/connection';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('API is running');
});


app.use('/api/users', userRoutes);

connectToDb().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
  });
});
