const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Ss$071901',
  database: 'courses_trail'
});
app.use(bodyParser.json());

// Define API routes
app.get('/courses', (req, res) => {
  // Fetch all courses from the courses table
  pool.query('SELECT * FROM courses', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    // Return the courses as JSON
    res.json(rows);
  });
});

app.post('/courses/update', (req, res) => {
  const { course_id,course_name, description } = req.body;
  
  // Insert a new course into the courses table
  pool.query('INSERT INTO courses (course_id ,course_name, description) VALUES (?, ?, ?)', [course_id ,course_name, description], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    // Return the ID of the new course as JSON
    res.json({ id: result.insertId });
  });
});

app.get('/course_sections', (req, res) => {
  // Fetch all courses from the courses table
  pool.query('SELECT * FROM course_sections', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    // Return the courses as JSON
    res.json(rows);
  });
});

app.get('/course_sections/:course_id', (req, res) => {
  const { course_id } = req.params;
  
  // Fetch all sections for the specified course from the course_sections table
  pool.query('SELECT * FROM course_sections WHERE course_id = ?', [course_id], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    // Return the sections as JSON
    res.json(rows);
  });
});

app.get('/paragraphs', (req, res) => {
  // Fetch all courses from the courses table
  pool.query('SELECT * FROM paragraphs', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    // Return the courses as JSON
    res.json(rows);
  });
});

app.get('/paragraphs/:section_id', (req, res) => {
  const { section_id } = req.params;
  
  // Fetch all paragraphs for the specified section from the paragraphs table
  pool.query('SELECT * FROM paragraphs WHERE section_id = ?', [section_id], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    // Return the paragraphs as JSON
    res.json(rows);
  });
});

//for updating paragraphs
app.put('/paragraphs/:paragraph_id', (req, res) => {
  const { paragraph_id } = req.params;
  const { content } = req.body;

  // Update the specified paragraph in the paragraphs table
  pool.query('UPDATE paragraphs SET paragraph_content = ? WHERE paragraph_id = ?', [content, paragraph_id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Return the number of affected rows as JSON
    res.json({ rowsAffected: result.affectedRows });
  });
});

//for deleting paragraphs
app.delete('/paragraphs/:paragraph_id', (req, res) => {
  const { paragraph_id } = req.params;

  // Delete the specified paragraph from the paragraphs table
  pool.query('DELETE FROM paragraphs WHERE paragraph_id = ?', [paragraph_id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Return the number of affected rows as JSON
    res.json({ rowsAffected: result.affectedRows });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
