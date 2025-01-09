const Redis = require("ioredis");
require("dotenv").config(); 

// Initialize Redis client using the Redis URL
const redis = new Redis(process.env.REDIS_URL);

// Event listeners for connection handling
redis.on("connect", () => {
    console.log("Connected to Redis via Upstash!");
});

redis.on("error", (err) => {
    console.error("Redis connection error:", err);
});

module.exports = redis;
