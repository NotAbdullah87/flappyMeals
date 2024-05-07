const Express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const bodyParser = require("body-parser");

const app = Express();
app.use(cors());
app.use(bodyParser.json()); // apply body-parser middleware


const connString = "mongodb+srv://admin:flappy123@flappymeals.xkolew3.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=flappyMeals";

const client = new MongoClient(connString, { useNewUrlParser: true, useUnifiedTopology: true });

const port = 5038;



app.listen(port, async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const database = client.db("flappyMeals");
        let collection = database.collection("items");

        // Define your routes and middleware here
        

app.get("/items", async (req, res) => {
    try {
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
        collection = database.collection("orders");
        const { customerId } = req.body;

        // Retrieve orders from the MongoDB collection
        const orders = await collection.find({
            customerId: customerId,
            orderStatus: { $in: ["InProgress", "Pending"] }
        }).toArray();

        // Send the matching orders as a response
        res.json(orders);
    } catch (error) {
        console.error("Error retrieving orders:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.post("/saveOrder", async (req, res) => {
    try {
      // Extract order details from the request body
      const { orderId, orderDate, orderTime, customerId, customerContact, items, totalPrice, pickupLocation, destinationLocation, specialInstructions } = req.body;
  
      // Access the "orders" collection in the database
      const database = client.db("flappyMeals");
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


app.get("/orders/available", async (req, res) => {
    try {
      // Retrieve orders from the MongoDB collection where riderId is null
      collection = database.collection("orders");
      const orders = await collection.find({ riderId: null }).toArray();
  
      // Send the orders as a response
      res.json(orders);
    //   console.log(orders);
    } catch (error) {
      console.error("Error retrieving orders:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });



  app.post("/updateOrderStatus", async (req, res) => {
    try {
        const { orderId, riderId } = req.body;
        collection = database.collection("orders");
        console.log(orderId,riderId);
        // Update the order status and rider ID in the database
        const updatedOrder = await collection.findOneAndUpdate(
            { orderId: orderId },
            { $set: { riderId: riderId, orderStatus: "InProgress" } },
            { returnOriginal: false } // Return the updated document
        );

        // if (updatedOrder.value) {
        //     res.status(200).json({ message: "Order status updated successfully", order: updatedOrder.value });
        // } else {
        //     res.status(404).json({ message: "Order not found" });
        // }
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
});
