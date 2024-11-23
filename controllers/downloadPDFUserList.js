const User = require('../models/User');
const { jsPDF } = require('jspdf');
const fs = require('fs');

async function downloadPDFUserList(req, res) {
	try {
		const users = await User.find();
		const items = users.map((item) => ({
			name: item.firstName + ' ' + item.lastName,
			email: item.username,
		}));

		// Crear un nuevo documento PDF
		const doc = new jsPDF();

		// Agregar contenido al PDF
		doc.setFontSize(24);
		doc.text('Lista de Usuarios', 20, 20);
		doc.setFontSize(12);
		let y = 30; // Posición vertical inicial

		items.forEach((item) => {
			doc.text(`Nombre: ${item.name}`, 20, y);
			doc.text(`Nombre de usuario: ${item.email}`, 20, y + 5);
			y += 15; // Espaciado entre items
		});

		// Guardar el PDF como archivo
		const pathFile = __dirname + '/users.pdf';
		doc.save(pathFile);

		// Enviar el PDF como archivo
		res.download(pathFile, 'users.pdf', (err) => {
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

module.exports = { downloadPDFUserList };
