import { connectDB, insert } from '../../helpers/db-util';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const email = req.body.email;

		if (!email || !email.includes('@')) {
			res.status(422).json({ message: 'Invalid email address.' })
			return;
		}

		let client;

		try {
			client = await connectDB();
		} catch(error) {
			res.status(500).json({ message: 'DB connection failure.' });
			return;
		}	

		try {
			await insert(client, 'newsletter', { email });
			client.close();
		} catch(error) {
			res.status(500).json({ message: 'Data insertion failure.' });
			return;
		}
		
		res.status(201).json({ message: 'Signed up!' });
	}
}