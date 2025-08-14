
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.json());
app.use(require('./src/middleware/cors'));



// Routes
const adminAuthRoutes = require('./src/routes/adminAuth');
const categoryRoutes = require('./src/routes/category');
app.use('/api/admin', adminAuthRoutes);
app.use('/api/categories', categoryRoutes);

app.get('/', (req, res) => {
	res.send('API is running');
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
