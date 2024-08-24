const express = require("express");
const queue = require("./queue");
const rateLimiterMiddleware = require("./rateLimiter"); 
const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.post("/task", rateLimiterMiddleware, async (req, res) => {
  console.log("Request received:", req.body);
  const userId = req.body.user_id;
  if (!userId) {
    return res.status(400).send("User ID is required");
  }
  await queue(userId);
  res.send("POST request was successful");
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
