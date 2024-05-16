const Express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const bodyParser = require("body-parser");

const app = Express();
app.use(cors());
app.use(bodyParser.json()); // apply body-parser middleware



const connString = "mongodb+srv://admin:flappy123@flappymeals.xkolew3.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=flappyMeals";

const client = new MongoClient(connString, { useNewUrlParser: true, useUnifiedTopology: true });

const port = 3000;

 client.connect();
app.get("/", (req, res) => res.send("Express on Vercel"));

app.get("/items", async (req, res) => {
try {

 

console.log("Connected to MongoDB");

const database = client.db("flappyMeals");
let collection = database.collection("items");
  
collection = database.collection("items");
// Retrieve items from the MongoDB collection
const items = await collection.find({}).toArray();
// console.log(items);
// Send the items as a response
console.log("getItems() Function");
res.json(items);

} catch (error) {
console.error("Error retrieving items:", error);
res.status(500).json({ error: "Internal server error" });
}
});

app.post("/CurrentOrderForUser", async (req, res) => {
try {

  // await client.connect();
// console.log("Connected to MongoDB");

const database = client.db("flappyMeals");
let collection = database.collection("items");
 
collection = database.collection("orders");
const { customerId } = req.body;

// Retrieve orders from the MongoDB collection
const orders = await collection.find({
customerId: customerId,
orderStatus: { $in: ["Pending","InProgress","PickedUp","PendingApproval"] }
}).toArray();

console.log(orders);

// Send the matching orders as a response
res.json(orders);
} catch (error) {
console.error("Error retrieving orders:", error);
res.status(500).json({ error: "Internal server error" });
}
});

app.post("/saveOrder", async (req, res) => {
try {

 // await client.connect();
console.log("Connected to MongoDB");

const database = client.db("flappyMeals");
let collection = database.collection("items");
// Extract order details from the request body
const { orderId, orderDate, orderTime, customerId, customerContact, items, totalPrice, pickupLocation, destinationLocation, specialInstructions } = req.body;

// Access the "orders" collection in the database
// const database = client.db("flappyMeals");
const ordersCollection = database.collection("orders");

// Create a new order document
const newOrder = {
orderId,
orderDate,
orderTime,
customerId,
customerContact,
items,
totalPrice,
pickupLocation,
destinationLocation,
specialInstructions,
orderStatus: "Pending", // Set initial order status to "Pending"
riderId: null, // Set initial riderId to null
deliveryDate : null ,
deliveryTime : null ,

};

// Insert the new order document into the "orders" collection
const result = await ordersCollection.insertOne(newOrder);

// Send a success response
res.status(201).json({ message: "Order saved successfully", orderId: result.insertedId });
} catch (error) {
console.error("Error saving order:", error);
// Send an error response
res.status(500).json({ error: "Internal server error" });
}
});

// Define a route for user login
app.post("/login", async (req, res) => {
try {

  // await client.connect();
console.log("Connected to MongoDB");

const database = client.db("flappyMeals");
let collection = database.collection("items");
 
collection = database.collection("customer");
// console.log(req.body);
const items = await collection.find({}).toArray();
console.log(items);
// Extract username and password from request body
const { username, password } = req.body;
console.log(username,password);
// Check if username and password match
const user = await collection.findOne({ username, password });

// If user is found, send success response
if (user) {
res.status(200).json({ message: "Login successful", user });
} else {
// If user is not found, send failure response
res.status(401).json({ message: "Invalid username or password" });
}
} catch (error) {
console.error("Error during login:", error);
res.status(500).json({ error: "Internal server error" });
}
});


app.post('/Ridersignup', async (req, res) => {


 // await client.connect();
console.log("Connected to MongoDB");

const database = client.db("flappyMeals");
let collection = database.collection("items");

const { username, password } = req.body;
const collection = database.collection("rider");
// Check if username already exists
const existingRider = await collection.findOne({ username });
if (existingRider) {
return res.status(400).json({ message: 'Username already exists' });
}

// Create a new order document
const newRider = {
username,
rider_id:username,
password,
earning : 0 ,
pending_orders : 0 ,
completed_orders : 0 ,
rating : 0
};
// Create new customer
const result = await collection.insertOne(newRider);
// const newCustomer = new Customer({ username, password });
// await newCustomer.save();

res.status(201).json({ message: 'Customer created successfully' });
});


app.post('/Customersignup', async (req, res) => {
 // await client.connect();
console.log("Connected to MongoDB");

const database = client.db("flappyMeals");
let collection = database.collection("items");
const { username, password } = req.body;
const collection = database.collection("customer");
// Check if username already exists
const existingCustomer = await collection.findOne({ username });
if (existingCustomer) {
return res.status(400).json({ message: 'Username already exists' });
}

// Create a new order document
const newCustomer = {
username,
password
};
// Create new customer
const result = await collection.insertOne(newCustomer);
// const newCustomer = new Customer({ username, password });
// await newCustomer.save();

res.status(201).json({ message: 'Customer created successfully' });
});


// Define a route for rider login
app.post("/RiderLogin", async (req, res) => {
try {

 // await client.connect();
console.log("Connected to MongoDB");

const database = client.db("flappyMeals");
let collection = database.collection("items");
collection = database.collection("rider");

const details = await collection.find({}).toArray();
console.log(details);

const { username, password } = req.body;
console.log(username,password);
// Check if username and password match
const rider = await collection.findOne({ username, password });

// If rider is found, send success response
if (rider) {
res.status(200).json({ message: "Login successful", rider });
} else {
// If rider is not found, send failure response
res.status(401).json({ message: "Invalid username or password" });
}
} catch (error) {
console.error("Error during rider login:", error);
res.status(500).json({ error: "Internal server error" });
}
});


app.get("/completedOrders", async (req, res) => {
try {

 // await client.connect();
console.log("Connected to MongoDB");

const database = client.db("flappyMeals");
let collection = database.collection("items");
 
const { riderId } = req.query; // Use req.query to access query parameters
// Retrieve orders from the MongoDB collection
console.log(riderId)
const collection = database.collection("orders");
const orders = await collection.find({
riderId: riderId,
orderStatus: "Completed"
}).toArray();
// Send the orders as a response
console.log(orders)
res.json(orders);
} catch (error) {
console.error("Error retrieving orders:", error);
res.status(500).json({ error: "Internal server error" });
}
});


// app.get("/completedOrders", async (req, res) => {
// try {

//  // await client.connect();
// console.log("Connected to MongoDB");

// const database = client.db("flappyMeals");
// let collection = database.collection("items");

 
// const { riderId } = req.query; // Use req.query to access query parameters
// // Retrieve orders from the MongoDB collection
// console.log(riderId)
// const collection = database.collection("orders");
// const orders = await collection.find({
// riderId: riderId,
// orderStatus: "Completed"
// }).toArray();
// // Send the orders as a response
// console.log(orders)
// res.json(orders);
// } catch (error) {
// console.error("Error retrieving orders:", error);
// res.status(500).json({ error: "Internal server error" });
// }
// });


app.post("/updateOrderStatus", async (req, res) => {
try {
 // await client.connect();
console.log("Connected to MongoDB");

const database = client.db("flappyMeals");
let collection = database.collection("items");
 
const { orderId, riderId, orderStatus } = req.body;
collection = database.collection("orders");
console.log(orderId);
console.log(riderId);
console.log(orderStatus);

// Update the order status and rider ID in the database
const updatedOrder = await collection.findOneAndUpdate(
{ orderId: orderId },
{ $set: { riderId: riderId, orderStatus: orderStatus } },
{ returnOriginal: false } // Return the updated document
);

console.log('Order status updated successfully');

// if (updatedOrder.value) {
// res.status(200).json({ message: "Order status updated successfully", order: updatedOrder.value });
// } else {
// res.status(404).json({ message: "Order not found" });
// }
} catch (error) {
console.error("Error updating order status:", error);
res.status(500).json({ error: "Internal server error" });
}
});

// Define a route to fetch ongoing orders for the current rider
app.post("/ongoingOrders", async (req, res) => {
try {
 // await client.connect();
console.log("Connected to MongoDB");

const database = client.db("flappyMeals");
let collection = database.collection("items");
collection = database.collection("orders");
const { riderId } = req.body;

// Retrieve orders from the MongoDB collection
const orders = await collection.find({
riderId: riderId,
orderStatus: { $in: ["InProgress","PickedUp","PendingApproval"] }
}).toArray();

// Send the matching orders as a response
res.json(orders);
} catch (error) {
console.error("Error retrieving orders:", error);
res.status(500).json({ error: "Internal server error" });
}
});

app.get("/orders/available", async (req, res) => {
try {
 // await client.connect();
console.log("Connected to MongoDB");

const database = client.db("flappyMeals");
let collection = database.collection("items");
// Retrieve orders from the MongoDB collection where riderId is null
collection = database.collection("orders");
const orders = await collection.find({ riderId: null}).toArray();

// Send the orders as a response
res.json(orders);
// console.log(orders);
} catch (error) {
console.error("Error retrieving orders:", error);
res.status(500).json({ error: "Internal server error" });
}
});


module.exports = app
