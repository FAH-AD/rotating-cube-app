import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const connection = await mysql.createConnection({
      host: 'aiscdb-mysql.mysql.database.azure.com',
      user: 'gopalk',
      password: '123456k!',
      database: 'csv_db 6',
       ssl: {
        rejectUnauthorized: true,
      },
    });

    const [rows] = await connection.execute('SELECT * FROM loct_data_secure_fields_new');
    await connection.end();

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data from database' });
  }
}