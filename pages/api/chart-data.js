import fs from 'fs';
import path, { resolve } from 'path';

export default function handler(req, res) {

	try {
		fs.readFile(
			path.resolve('', 'data/test-data.json'), 
			'utf8',
			(err, data) => {
				if (err) {
					throw err
				}

				res.status(200).json(data)
				res.end()
			}
		)

	} catch (err) {
		res.status(err).json({})
		res.end()
	}
}