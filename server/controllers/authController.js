 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../utils/db.js';

const SECRET = 'your-secret-key'; // change in production

export async function register(req, res) {
  const { username, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    await db.run(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hash]
    );
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ error: 'User already exists or invalid data' });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Wrong password' });

    const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '2h' });

    res
      .cookie('token', token, { httpOnly: true })
      .json({ message: 'Logged in', user: { id: user.id, username: user.username } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
}