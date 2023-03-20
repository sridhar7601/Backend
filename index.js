const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
// Create a MySQL connection pool
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Ss$071901',
  database: 'courses_trail4'
});
app.use(bodyParser.json());

//get all courses
app.get('/courses', (req, res) => {
  const query = 'SELECT * FROM courses';
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// GET a course by ID
app.get('/courses/:id', (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM courses WHERE id = ${id}`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results[0]);
  });
});

// POST a new course
app.post('/courses', (req, res) => {
  const { name } = req.body;
  const query = `INSERT INTO courses (name) VALUES ('${name}')`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send('Course added successfully');
  });
});

// PUT (update) an existing course by ID
app.put('/courses/:id', (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  const query = `UPDATE courses SET name = '${name}' WHERE id = ${id}`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send('Course updated successfully');
  });
});

// DELETE a course by ID
app.delete('/courses/:id', (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM courses WHERE id = ${id}`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send('Course deleted successfully');
  });
});

//weeks
//get all for weeks 
app.get('/weeks', (req, res) => {
  const query = 'SELECT * FROM weeks';
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// GET all weeks for a course
app.get('/courses/:course_id/weeks', (req, res) => {
  const courseId = req.params.course_id;
  const query = `SELECT * FROM weeks WHERE course_id = ${courseId}`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// GET a week by ID
app.get('/weeks/:id', (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM weeks WHERE id = ${id}`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results[0]);
  });
});

// POST a new week for a course
app.post('/courses/:course_id/weeks', (req, res) => {
  const courseId = req.params.course_id;
  const {number, title } = req.body;
  const query = `INSERT INTO weeks (course_id, number, title) VALUES (${courseId}, ${number}, '${title}')`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send('Week added successfully');
  });
});

// PUT (update) an existing week by ID
app.put('/weeks/:id', (req, res) => {
  const id = req.params.id;
  const { number, title } = req.body;
  const query = `UPDATE weeks SET number = ${number}, title = '${title}' WHERE id = ${id}`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send('Week updated successfully');
  });
});

// DELETE a week by ID
app.delete('/weeks/:id', (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM weeks WHERE id = ${id}`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send('Week deleted successfully');
  });
});

//subtopic
// GET all subtopics for a week
app.get('/weeks/:weekId/subtopics', (req, res) => {
  const weekId = req.params.weekId;
  const query = `SELECT * FROM subtopics WHERE week_id = ${weekId}`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// GET a subtopic by ID
app.get('/subtopics/:id', (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM subtopics WHERE id = ${id}`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results[0]);
  });
});

// POST a new subtopic for a week
app.post('/weeks/:weekId/subtopics', (req, res) => {
  const weekId = req.params.weekId;
  const { title } = req.body;
  const query = `INSERT INTO subtopics (week_id, title) VALUES (${weekId}, '${title}')`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send('Subtopic added successfully');
  });
});

// PUT (update) an existing subtopic by ID
app.put('/subtopics/:id', (req, res) => {
  const id = req.params.id;
  const { title } = req.body;
  const query = `UPDATE subtopics SET title = '${title}' WHERE id = ${id}`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send('Subtopic updated successfully');
  });
});

// DELETE a subtopic by ID
app.delete('/subtopics/:id', (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM subtopics WHERE id = ${id}`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send('Subtopic deleted successfully');
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
