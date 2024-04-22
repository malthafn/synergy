//app.js
const express = require("express");
const serverless = require("serverless-http");
const mysql = require('mysql2/promise');

const app = express();
const router = express.Router();

const connectionConfig = {
  host: 'srv1339.hstgr.io',
  user: 'u242778090_InputboxName',
  password: 'Nilofer@567',
  database: 'u242778090_Newest'
};

// Establish a connection using async/await
(async () => {
    try {
      const pool = await mysql.createPool(connectionConfig);

      router.get("/", async (req, res) => {
        try {
          const connection = await pool.getConnection();
          await connection.release();

          res.send(`<form action="/submit" method="post">
                        <label for="textInput">Connection Message:</label><br>
                        <input type="text" id="textInput" name="textInput" value="Connected to MySQL successfully!"><br>
                    </form>
                    Connected to MySQL successfully!`);
        } catch (error) {
          console.error('MySQL connection error:', error);
          res.status(500).send(`<form action="/submit" method="post">
                                    <label for="textInput">Connection Message:</label><br>
                                    <input type="text" id="textInput" name="textInput"><br>
                                </form>
                                Error connecting to MySQL database`);
        }
      });

    } catch (error) {
      console.error('Error creating connection pool:', error);
    }
  })();

app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);
