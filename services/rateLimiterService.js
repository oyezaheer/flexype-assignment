const redis = require('../utils/redisClient');
require('dotenv').config();

const WINDOW_SIZE = process.env.WINDOW_SIZE;
const THRESHOLD = process.env.THRESHOLD;

async function trackFailedRequest(ip) {
  const key = `failed:${ip}`;
  const now = Date.now();

  await redis.zadd(key, now, now);
  await redis.zremrangebyscore(key, 0, now - WINDOW_SIZE * 1000);

  const count = await redis.zcard(key);
  return count;
}

module.exports = { trackFailedRequest };
