const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const toDoRoutes = require('./routes/ToDoRoutes');
const { downloadPDFUserList } = require('./controllers/downloadPDFUserList');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/user-list', downloadPDFUserList);
app.use('/api', authRoutes);

app.use('/api/todo', toDoRoutes);
mongoose
	.connect(process.env.DB_URL)
	.then((result) => {
		console.log('DB Connected Successfully!');
		app.listen(PORT, () => {
			console.log(`Server started at port ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err.message);
	});
