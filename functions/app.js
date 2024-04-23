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

        async function insertCompany(companyName) {
            const connection = await pool.getConnection();
            try {
                const sql = `INSERT INTO company (name) VALUES (?)`;
                const [results] = await connection.execute(sql, [companyName]);
                console.log(`Company inserted with ID: ${results.insertId}`);
                return true; // Indicate successful insertion
            } catch (error) {
                console.error('Error inserting data:', error);
                return false; // Indicate error
            } finally {
                await connection.release();
            }
        }

        router.get("/", (req, res) => {
            res.send(`
                <form action="/company/store" method="post">
                    <label for="companyName">Company Name:</label><br>
                    <input type="text" id="companyName" name="companyName" required><br><br>
                    <button type="submit">Submit</button>
                </form>
            `);
        });

        router.post("/company/store", express.urlencoded({ extended: true }), async (req, res) => {
            console.log(req.body);
            const { companyName } = req.body;
            const insertResult = await insertCompany(companyName);

            if (insertResult) {
                return res.status(200).json({message: "Company added successfully"});
            } else {
                return res.status(500).json({message: "Something went wrong"});
            }
        });

    } catch (error) {
      console.error('Error creating connection pool:', error);
    }
})();

// app.use(router).listen(3000)
app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);
