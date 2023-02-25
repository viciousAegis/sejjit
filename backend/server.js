require('dotenv').config()
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorMiddlewares');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const subRoutes = require('./routes/subRoutes');
const postRoutes = require('./routes/postRoutes');
const reportRoutes = require('./routes/reportRoutes')
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/subsejjits', subRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/reports', reportRoutes)
app.use(errorHandler);
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('server started on port 4000');
})

app.listen(PORT, () => {
    console.log(PORT);
    console.log('Server started on port ' + PORT);
});
