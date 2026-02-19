import { createClient } from 'redis';

const client = createClient({
  socket: {
    host: 'localhost',
    port: 6379
  }
});

client.on('error', (err) => console.log('Redis Client Error', err));
client.on('connect', () => console.log('Redis connected'));

let isConnected = false;

export async function getRedisClient() {
  if (!isConnected) {
    try {
      await client.connect();
      isConnected = true;
      console.log('Redis client connected successfully');
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
      throw error;
    }
  }
  return client;
}

// Graceful shutdown
process.on('SIGINT', async () => {
  if (isConnected) {
    await client.disconnect();
    isConnected = false;
  }
  process.exit(0);
});