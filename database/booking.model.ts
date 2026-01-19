import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import { Event } from './event.model';

/**
 * BookingDocument interface - defines the structure of a Booking document
 */
interface BookingDocument extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Email validation regex
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Booking Schema with validation and reference checks
 */
const bookingSchema = new Schema<BookingDocument>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      validate: [emailRegex, 'Please provide a valid email address'],
    },
  },
  { timestamps: true }
);

/**
 * Create index on eventId for faster queries
 */
bookingSchema.index({ eventId: 1 });

/**
 * Pre-save hook to verify that the referenced eventId exists in the Event collection
 * Throws an error if the event does not exist to maintain referential integrity
 */
bookingSchema.pre('save', async function () {
  // Check if eventId exists in the Event collection
  const eventExists = await Event.findById(this.eventId);

  if (!eventExists) {
    throw new Error(
      `Event with ID ${this.eventId} does not exist. Cannot create booking without a valid event.`
    );
  }
});

/**
 * Create or retrieve the Booking model with proper typing
 */
const Booking: Model<BookingDocument> =
  mongoose.models.Booking || mongoose.model<BookingDocument>('Booking', bookingSchema);

export { Booking, type BookingDocument };
