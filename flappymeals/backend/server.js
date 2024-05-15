
const Express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

const app = Express();

app.use(bodyParser.json()); // apply body-parser middleware




const connString = "mongodb+srv://admin:flappy123@flappymeals.xkolew3.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=flappyMeals";

// const client = new MongoClient(connString, { useNewUrlParser: true, useUnifiedTopology: true });

const PORT = 4000;


app.get('/home', (req, res) => {
res.status(200).json('Welcome, your app is working well');
})

app.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}`);
  // await client.connect();
console.log("Connected to MongoDB");
});





// Export the Express API
module.exports = app 
