import { connectDB, insert, getAll } from '../../../helpers/db-util';

export default async function handler(req, res) {
	const eventId = req.query.eventId;

		let client;

		try {
			client = await connectDB();
		} catch(error) {
			res.status(500).json({ message: 'DB connection failure.' });
			return;
		}

	if (req.method === 'POST') {
		const { email, name, text } = req.body;

		if (!email || !email.includes('@') ||
			 !name || !name.trim() === '' ||
		 	 !text || !text.trim() === ''
	 	) {
			res.status(422).json({ message: 'Invalid input.' })
			client.close();
			return;
		}

		const comment = { eventId, email, name, text};

		let result;

		try {
			result = await insert(client, 'comments', comment);

			comment._id = result.insertedId;

			res.status(201).json({ message: 'Comment created!', comment });			
		} catch(error) {
			res.status(500).json({ message: 'Data insertion failure.' });
		}
	}

	if (req.method === 'GET') {
		try {
			const comments = await getAll(client, 'comments', { _id: -1 }, { eventId });
			res.status(201).json({ comments });
		} catch(error) {
			res.status(500).json({ message: 'Data insertion failure.' });
		}
	}

	client.close();
}