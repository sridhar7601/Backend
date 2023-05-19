const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
// Create a MySQL connection pool
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Ss$071901",
  database: "finalyear",
});
app.use(bodyParser.json());
//--------------------------------------------------------
//Newwwwwwww
// Get all courses
app.get("/courses", (req, res) => {
  const query = "SELECT * FROM courses";
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Create a new course
app.post("/courses", (req, res) => {
  const { name } = req.body;
  const query = "INSERT INTO courses (name) VALUES (?)";
  connection.query(query, [name], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Update a course by ID
app.put("/courses/:id", (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const query = "UPDATE courses SET name = ? WHERE id = ?";
  connection.query(query, [name, id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Delete a course by ID
app.delete("/courses/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM courses WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

//weeks
//get all for weeks  old
// app.get('/weeks', (req, res) => {
//   const query = 'SELECT * FROM weeks';
//   connection.query(query, (err, results) => {
//     if (err) throw err;
//     res.send(results);
//   });
// });

// GET all weeks for a course old
// app.get('/courses/:course_id/weeks', (req, res) => {
//   const courseId = req.params.course_id;
//   const query = `SELECT * FROM weeks WHERE course_id = ${courseId}`;
//   connection.query(query, (err, results) => {
//     if (err) throw err;
//     res.send(results);
//   });
// });

// GET a week by ID old
// app.get('/weeks/:id', (req, res) => {
//   const id = req.params.id;
//   const query = `SELECT * FROM weeks WHERE id = ${id}`;
//   connection.query(query, (err, results) => {
//     if (err) throw err;
//     res.send(results[0]);
//   });
// });

// POST a new week for a course old
// app.post('/courses/:course_id/weeks', (req, res) => {
//   const courseId = req.params.course_id;
//   const {number, title } = req.body;
//   const query = `INSERT INTO weeks (course_id, number, title) VALUES (${courseId}, ${number}, '${title}')`;
//   connection.query(query, (err, results) => {
//     if (err) throw err;
//     res.send('Week added successfully');
//   });
// });

// // PUT (update) an existing week by ID old

// DELETE a week by ID old
// app.delete('/weeks/:id', (req, res) => {
//   const id = req.params.id;
//   const query = `DELETE FROM weeks WHERE id = ${id}`;
//   connection.query(query, (err, results) => {
//     if (err) throw err;
//     res.send('Week deleted successfully');
//   });
// });

//----------------------------------------------------------
//NEW

//get all for weeks
app.get("/weeks", (req, res) => {
  const query = "SELECT * FROM weeks";
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Get all weeks for a specific course by course ID
app.get("/weeks/:course_id", (req, res) => {
  const { course_id } = req.params;
  const query = "SELECT * FROM weeks WHERE course_id = ?";
  connection.query(query, [course_id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Create a new week for a specific course by course ID
app.post("/weeks/:course_id", (req, res) => {
  const { course_id } = req.params;
  const { number, title } = req.body;
  const query = "INSERT INTO weeks (course_id, number, title) VALUES (?, ?, ?)";
  connection.query(query, [course_id, number, title], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Update a week by ID
app.put("/weeks/:id", (req, res) => {
  const { number, title } = req.body;
  const { id } = req.params;
  const query = "UPDATE weeks SET number = ?, title = ? WHERE id = ?";
  connection.query(query, [number, title, id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Delete a week by ID
app.delete("/weeks/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM weeks WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

//subtopic old
// GET all subtopics for a week
// app.get('/weeks/:weekId/subtopics', (req, res) => {
//   const weekId = req.params.weekId;
//   const query = `SELECT * FROM subtopics WHERE week_id = ${weekId}`;
//   connection.query(query, (err, results) => {
//     if (err) throw err;
//     res.send(results);
//   });
// });

// GET a subtopic by ID
// app.get('/subtopics/:id', (req, res) => {
//   const id = req.params.id;
//   const query = `SELECT * FROM subtopics WHERE id = ${id}`;
//   connection.query(query, (err, results) => {
//     if (err) throw err;
//     res.send(results[0]);
//   });
// });

// POST a new subtopic for a week
// app.post('/weeks/:weekId/subtopics', (req, res) => {
//   const weekId = req.params.weekId;
//   const { title } = req.body;
//   const query = `INSERT INTO subtopics (week_id, title) VALUES (${weekId}, '${title}')`;
//   connection.query(query, (err, results) => {
//     if (err) throw err;
//     res.send('Subtopic added successfully');
//   });
// });

// PUT (update) an existing subtopic by ID
// app.put('/subtopics/:id', (req, res) => {
//   const id = req.params.id;
//   const { title } = req.body;
//   const query = `UPDATE subtopics SET title = '${title}' WHERE id = ${id}`;
//   connection.query(query, (err, results) => {
//     if (err) throw err;
//     res.send('Subtopic updated successfully');
//   });
// });

// DELETE a subtopic by ID
// app.delete('/subtopics/:id', (req, res) => {
//   const id = req.params.id;
//   const query = `DELETE FROM subtopics WHERE id = ${id}`;
//   connection.query(query, (err, results) => {
//     if (err) throw err;
//     res.send('Subtopic deleted successfully');
//   });
// });
//---------------------------------------------
//NEW
//Get all subtopics
app.get("/subtopics", (req, res) => {
  const query = "SELECT * FROM subtopics";
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
//Get all subtopics
app.get("/subtopics/:id", (req, res) => {
  const query = "SELECT * FROM subtopics WHERE week_id = ?";
  connection.query(query, [req.params.id], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      res.status(404).send("Subtopic not found");
    } else {
      res.send(results);
    }
  });
});

//Create subtopic
app.post("/subtopics", (req, res) => {
  const { week_id, title } = req.body;
  const query = "INSERT INTO subtopics (week_id, title) VALUES (?, ?)";
  connection.query(query, [week_id, title], (err, results) => {
    if (err) throw err;
    const newSubtopic = {
      id: results.insertId,
      week_id,
      title,
    };
    res.status(201).send(newSubtopic);
  });
});
//Update subtopic by ID
app.put("/subtopics/:id", (req, res) => {
  const { title } = req.body;
  const query = "UPDATE subtopics SET title = ? WHERE id = ?";
  connection.query(query, [title, req.params.id], (err, results) => {
    if (err) throw err;
    if (results.affectedRows === 0) {
      res.status(404).send("Subtopic not found");
    } else {
      res.send("Subtopic updated successfully");
    }
  });
});
//Delete subtopic by ID
app.delete("/subtopics/:id", (req, res) => {
  const query = "DELETE FROM subtopics WHERE id = ?";
  connection.query(query, [req.params.id], (err, results) => {
    if (err) throw err;
    if (results.affectedRows === 0) {
      res.status(404).send("Subtopic not found");
    } else {
      res.send("Subtopic deleted successfully");
    }
  });
});
//Get subtopics and resources by week ID
app.get("/week/:id/subtopics", (req, res) => {
  const query =
    "SELECT s.id, s.title, r.type, r.url FROM subtopics s JOIN resources r ON s.id = r.subtopic_id WHERE s.week_id = ?";
  connection.query(query, [req.params.id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

//OLD
// GET a resource by ID old
// app.get('/resources/:id', (req, res) => {
//   const id = req.params.id;
//   const query = `SELECT * FROM resources WHERE id = ${id}`;
//   connection.query(query, (err, results) => {
//   if (err) throw err;
//   res.send(results[0]);
//   });
//   });

//   // GET resources by subtopic ID old
// app.get('/subtopics/:subtopicId/resources', (req, res) => {
//   const subtopicId = req.params.subtopicId;
//   const query = `SELECT * FROM resources WHERE subtopic_id = ${subtopicId}`;
//   connection.query(query, (err, results) => {
//     if (err) throw err;
//     res.send(results);
//   });
// });
// POST a new resource for a subtopic old
// app.post('/subtopics/:subtopicId/resources', (req, res) => {
//   const subtopicId = req.params.subtopicId;
//   const { type, url } = req.body;
//   const query = `INSERT INTO resources (type, url, subtopic_id) VALUES ('${type}', '${url}', ${subtopicId})`;
//   connection.query(query, (err, results) => {
//   if (err) throw err;
//   res.send('Resource added successfully');
//   });
//   });

//   // PUT (update) an existing resource by ID old
// app.put('/resources/:id', (req, res) => {
// const id = req.params.id;
// const { type, url } = req.body;
// const query = `UPDATE resources SET type = '${type}', url = '${url}' WHERE id = ${id}`;
// connection.query(query, (err, results) => {
// if (err) throw err;
// res.send('Resource updated successfully');
// });
// });

// GET all resources
app.get("/resources", (req, res) => {
  const query = "SELECT * FROM resources";
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// GET a single resource by ID
app.get("/resources/:id", (req, res) => {
  const resourceId = req.params.id;
  const query = "SELECT * FROM resources WHERE id = ?";
  connection.query(query, [resourceId], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      res.status(404).send("Resource not found");
    } else {
      res.send(results[0]);
    }
  });
});

// CREATE a new resource
app.post("/resources", (req, res) => {
  const { type, url, subtopic_id } = req.body;
  const query =
    "INSERT INTO resources (type, url, subtopic_id) VALUES (?, ?, ?)";
  connection.query(query, [type, url, subtopic_id], (err, result) => {
    if (err) throw err;
    const newResourceId = result.insertId;
    res.status(201).send(`Resource created with ID: ${newResourceId}`);
  });
});

// UPDATE an existing resource
app.put("/resources/:id", (req, res) => {
  const resourceId = req.params.id;
  const { type, url, subtopic_id } = req.body;
  const query =
    "UPDATE resources SET type = ?, url = ?, subtopic_id = ? WHERE id = ?";
  connection.query(
    query,
    [type, url, subtopic_id, resourceId],
    (err, result) => {
      if (err) throw err;
      if (result.affectedRows === 0) {
        res.status(404).send("Resource not found");
      } else {
        res.send(`Resource updated with ID: ${resourceId}`);
      }
    }
  );
});

// DELETE a resource
app.delete("/resources/:id", (req, res) => {
  const resourceId = req.params.id;
  const query = "DELETE FROM resources WHERE id = ?";
  connection.query(query, [resourceId], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      res.status(404).send("Resource not found");
    } else {
      res.send(`Resource deleted with ID: ${resourceId}`);
    }
  });
});

// GET all resources with subtopic information
app.get("/resources-with-subtopics", (req, res) => {
  const query = `
    SELECT r.*, s.title AS subtopic_title, w.title AS week_title, c.name AS course_name
    FROM resources r
    JOIN subtopics s ON r.subtopic_id = s.id
    JOIN weeks w ON s.week_id = w.id
    JOIN courses c ON w.course_id = c.id
  `;
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
// GET all resources and subtopics for a specific week
app.get("/week/:weekId", (req, res) => {
  const weekId = req.params.weekId;
  const query = `
    SELECT s.*, r.*
    FROM subtopics s
    LEFT JOIN resources r ON s.id = r.subtopic_id
    WHERE s.week_id = ?
    ORDER BY s.id, r.id
  `;
  connection.query(query, [weekId], (err, results) => {
    if (err) throw err;
    const data = [];
    let subtopic = null;
    for (const row of results) {
      if (subtopic === null || subtopic.id !== row.id) {
        subtopic = {
          id: row.id,
          title: row.title,
          week_id: row.week_id,
          resources: [],
        };
        data.push(subtopic);
      }
      if (row.resource_id !== null) {
        subtopic.resources.push({
          id: row.resource_id,
          type: row.type,
          url: row.url,
        });
      }
    }
    res.send(data);
  });
});

// POST a new subtopic and resource for a specific week
app.post("/week/:weekId/subtopics", (req, res) => {
  const weekId = req.params.weekId;
  const { title, type, url } = req.body;
  const subtopicQuery = `
    INSERT INTO subtopics (title, week_id)
    VALUES (?, ?)
  `;
  const resourceQuery = `
    INSERT INTO resources (type, url, subtopic_id)
    VALUES (?, ?, ?)
  `;
  connection.query(subtopicQuery, [title, weekId], (err, subtopicResult) => {
    if (err) throw err;
    const subtopicId = subtopicResult.insertId;
    connection.query(
      resourceQuery,
      [type, url, subtopicId],
      (err, resourceResult) => {
        if (err) throw err;
        const resourceId = resourceResult.insertId;
        res.status(201).send({
          id: subtopicId,
          title: title,
          week_id: weekId,
          resources: [
            {
              id: resourceId,
              type: type,
              url: url,
            },
          ],
        });
      }
    );
  });
});
/**  */
//------------------------------------------------------------------
// table for rapid code
// get
app.get('/data/:sectionNo', (req, res) => {
  const sectionNo = req.params.sectionNo;
  const query = `
    SELECT m.markdown_text, t.*
    FROM markdown m
    LEFT JOIN test_cases t ON m.section_no = t.section_no
    WHERE m.section_no = ?
  `;
  connection.query(query, [sectionNo], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});


/**  */
app.get("/markdown/:id", (req, res) => {
  const markdownId = req.params.id;
  const query = `
    SELECT markdown_text
    FROM markdown
    WHERE id = ?
  `;
  connection.query(query, [markdownId], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      res.status(404).send("Markdown text not found");
      return;
    }
    const markdown = {
      markdown_text: results[0].markdown_text,
    };
    res.send(markdown);
  });
});

/** post */
app.post('/markdown', (req, res) => {
  const { section_no, markdown_text, test_case_passed } = req.body;

  const insertMarkdownQuery = 'INSERT INTO markdown (section_no, markdown_text) VALUES (?, ?)';
  connection.query(insertMarkdownQuery, [section_no, markdown_text], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      // const markdownId = result.insertId;
      const insertTestCasesQuery = 'INSERT INTO test_cases (section_no, test_case_passed) VALUES (?, ?)';
      const testCasesData = [section_no, test_case_passed];
      connection.query(insertTestCasesQuery, testCasesData, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal server error' });
        } else {
          res.status(201).json({ message: 'Markdown text and test case added successfully' });
        }
      });
    }
  });
});

//update
app.put('/markdown/:id', function(req, res) {
  var markdownId = req.params.id;
  var markdownText = req.body.markdownText;
  var query = "UPDATE markdown SET markdown_text = ? WHERE id = ?";

  connection.query(query, [markdownText, markdownId], function(error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).send("Error updating markdown");
    } else {
      console.log("Markdown updated successfully");
      res.send("Markdown updated successfully");
    }
  });
});

//------------------------------------------------------------------
// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
