require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ticTacToe',
});

// API for user registration
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Check if username or password is missing
  if (!username || !password) {
    res.status(400).json({ error: 'Username and password are required' });
    return;
  }

  // Check if the username already exists in the database
  const checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';
  connection.query(checkUsernameQuery, [username], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error checking username' });
    } else if (results.length > 0) {
      res.status(400).json({ error: 'Username already exists' });
    } else {
      // Generate a unique UUID
      const uuid = uuidv4();

      // Hash the password before storing it in the database
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          res.status(500).json({ error: 'Error hashing password' });
        } else {
          // Insert the user data into the database with the UUID
          const insertUserQuery = 'INSERT INTO users (uid, username, password) VALUES (?, ?, ?)';
          connection.query(insertUserQuery, [uuid, username, hashedPassword], (err, result) => {
            if (err) {
              res.status(500).json({ error: 'Error registering user' });
            } else {
              res.status(200).json({ message: 'User registered successfully' });
            }
          });
        }
      });
    }
  });
});

// API for user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if username or password is missing
  if (!username || !password) {
    res.status(400).json({ error: 'Username and password are required' });
    return;
  }

  // Retrieve the user data from the database based on the username
  const sql = 'SELECT * FROM users WHERE username = ?';
  connection.query(sql, [username], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving user' });
    } else if (results.length === 0) {
      res.status(401).json({ error: 'Invalid username or password' });
    } else {
      // Compare the stored hashed password with the provided password
      bcrypt.compare(password, results[0].password, (err, match) => {
        if (err || !match) {
          res.status(401).json({ error: 'Invalid username or password' });
        } else {
        //   // Generate a unique UUID
        const uid = results[0].uid;

          // Create the JWT token
          const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn: '24h' });

          res.status(200).json({ token });
        }
      });
    }
  });
});

// Start the server
app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
