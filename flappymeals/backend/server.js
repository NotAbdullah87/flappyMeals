const express = require('express')
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express()
app.use(cors());
app.use(bodyParser.json()); // apply body-parser middleware

const PORT = 4000


app.get('/home', (req, res) => {
res.status(200).json('Welcome, your app is working well');
})


app.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}`);
});

// Export the Express API
module.exports = app 
