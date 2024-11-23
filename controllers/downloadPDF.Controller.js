const ToDo = require('../models/ToDoList');
const User = require('../models/User');
const { jsPDF } = require('jspdf');
const fs = require('fs');

async function downloadPDF(req, res) {
	try {
		const { userId } = req.params;

		const getUserName = await User.findById(userId);
		const userName = getUserName.firstName + ' ' + getUserName.lastName;
		const getAllToDo = await ToDo.find({ createdBy: userId });
		const items = getAllToDo.map((item) => ({
			name: item.title,

			description: item.description,
			status: item.isCompleted ? 'Completado' : 'Incompleto',
			Date: item.createdAt.toString().split('GMT')[0],
		}));

		// Crear un nuevo documento PDF
		const doc = new jsPDF();

		// Agregar contenido al PDF
		doc.setFontSize(24);
		doc.text(`Todos de ${userName}`, 20, 20);
		doc.setFontSize(12);
		let y = 30; // Posición vertical inicial

		items.forEach((item) => {
			doc.text(`Titulo: ${item.name}`, 20, y);
			doc.text(`Descripción: ${item.description}`, 20, y + 5);
			doc.text(`Estado: ${item.status}`, 20, y + 10);
			doc.text(`Fecha: ${item.Date}`, 20, y + 15);
			y += 25; // Espaciado entre items
		});

		// Guardar el PDF como archivo
		const pathFile = __dirname + '/todos.pdf';
		doc.save(pathFile);

		// Enviar el PDF como archivo
		res.download(pathFile, 'todos.pdf', (err) => {
			if (err) {
				console.log('Error downloading file', err);
				res.status(400).send(err.message);
			}

			fs.unlink(pathFile, (unLinkErr) => {
				if (unLinkErr) {
					console.log('Error deleting file', unLinkErr);
					res.status(400).send(err.message);
				}
			});
		});
	} catch (err) {
		console.log(err);
		res.status(400).send(err.message);
	}
}

module.exports = { downloadPDF };
