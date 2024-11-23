import { getUserDetails } from '../../util/GetUser';

export default async function descargarTodos() {
	const user = getUserDetails();

	try {
		const res = await fetch(
			'http://localhost:5000/api/todo/download-pdf/' + user?.userId,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/pdf',
					Authorization: user?.token,
				},
			},
		);

		if (res.ok) {
			const blob = await res.blob();
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = 'todos.pdf';
			document.body.appendChild(link);
			link.click();
			link.remove();
			window.URL.revokeObjectURL(url);
		}
	} catch (err) {
		console.log('Error al recuperar el pdf', err.message);
	}
}
