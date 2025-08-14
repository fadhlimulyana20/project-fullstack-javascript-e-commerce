
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());


// Routes
const adminAuthRoutes = require('./src/routes/adminAuth');
app.use('/api/admin', adminAuthRoutes);

app.get('/', (req, res) => {
	res.send('API is running');
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
