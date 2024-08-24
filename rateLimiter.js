const { RateLimiterMemory } = require("rate-limiter-flexible");

const rateLimiter = new RateLimiterMemory({
  points: 20,
  duration: 60,
  blockDuration: 1,
});

const rateLimiterMiddleware = (req, res, next) => {
  const userId = req.body.user_id;
  if (!userId) {
    return res.status(400).send("User ID is required");
  }
  rateLimiter
    .consume(userId, 1)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send("Too many requests, please wait and try again.");
    });
};

module.exports = rateLimiterMiddleware;
