import mongoose, { Connection } from 'mongoose';

/**
 * Global type definition for cached MongoDB connection.
 * This prevents TypeScript errors when accessing cached connections.
 */
declare global {
  // Using var to store in global scope (required by Next.js hot reload)
  var mongoConnection: Connection | null;
}

/**
 * Ensures the MongoDB URI is defined in environment variables.
 * Throws an error if MONGODB_URI is not set during runtime.
 */
const MONGODB_URI: string = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Initialize or retrieve the cached MongoDB connection.
 * This pattern prevents multiple connections during development and hot reloads.
 *
 * @returns Promise that resolves to the Mongoose Connection object
 */
async function connectDB(): Promise<Connection> {
  // Return cached connection if available
  if (global.mongoConnection) {
    console.log('Using cached MongoDB connection');
    return global.mongoConnection;
  }

  try {
    console.log('Establishing new MongoDB connection...');

    // Connect to MongoDB with recommended options
    const mongooseInstance = await mongoose.connect(MONGODB_URI, {
      retryWrites: true,
      w: 'majority',
    });

    // Cache the connection in the global scope
    global.mongoConnection = mongooseInstance.connection;

    console.log('MongoDB connected successfully');
    return global.mongoConnection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}

export default connectDB;
