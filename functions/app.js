//app.js
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
    res.send(`<form action="/submit" method="post">
                    <label for="textInput">Enter text:</label><br>
                    <input type="text" id="textInput" name="textInput"><br>
                </form>`);
});

app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);
