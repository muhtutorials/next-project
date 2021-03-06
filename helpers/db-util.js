import { MongoClient } from 'mongodb';

export async function connectDB() {
	const client = await MongoClient.connect('mongodb+srv://igor:spellbound@cluster0.vtkas.mongodb.net/events?retryWrites=true&w=majority');
	
	return client;
}

export async function insert(client, collection, document) {
	const db = client.db();

	const result = await db.collection(collection).insertOne(document);

	return result;
}

export async function getAll(client, collection, sort, filter = {}) {
	const db = client.db();

	const documents = await db.collection(collection).find(filter).sort(sort).toArray();

	return documents;
}