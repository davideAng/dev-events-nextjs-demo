import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * EventDocument interface - defines the structure of an Event document
 */
interface EventDocument extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Event Schema with validation and pre-save hooks
 */
const eventSchema = new Schema<EventDocument>(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      sparse: true,
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters long'],
    },
    overview: {
      type: String,
      required: [true, 'Event overview is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Event image URL is required'],
    },
    venue: {
      type: String,
      required: [true, 'Venue is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Event date is required'],
    },
    time: {
      type: String,
      required: [true, 'Event time is required'],
    },
    mode: {
      type: String,
      enum: ['online', 'offline', 'hybrid'],
      required: [true, 'Event mode is required'],
    },
    audience: {
      type: String,
      required: [true, 'Target audience is required'],
      trim: true,
    },
    agenda: {
      type: [String],
      required: [true, 'Event agenda is required'],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: 'Agenda must contain at least one item',
      },
    },
    organizer: {
      type: String,
      required: [true, 'Organizer name is required'],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, 'Tags are required'],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: 'Tags must contain at least one item',
      },
    },
  },
  { timestamps: true }
);

/**
 * Pre-save hook for slug generation, date normalization, and validation
 * - Generates URL-friendly slug from title only if title has changed
 * - Normalizes date to ISO format (YYYY-MM-DD)
 * - Validates time format (HH:mm)
 */
eventSchema.pre<EventDocument>('save', function (this: EventDocument) {
  // Generate slug only if title is new or has been modified
  if (this.isNew || this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim();
  }

  // Validate and normalize date to ISO format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(this.date)) {
    try {
      const parsedDate = new Date(this.date);
      if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date format');
      }
      this.date = parsedDate.toISOString().split('T')[0];
    } catch {
      throw new Error('Date must be in YYYY-MM-DD format or a valid date string');
    }
  }

  // Validate time format (HH:mm)
  const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
  if (!timeRegex.test(this.time)) {
    throw new Error('Time must be in HH:mm format (24-hour)');
  }

  // Validate required fields are non-empty
  const requiredFields = [
    'title',
    'description',
    'overview',
    'image',
    'venue',
    'location',
    'organizer',
  ];
  for (const field of requiredFields) {
    const value = this[field as keyof EventDocument];
    if (typeof value === 'string' && !value.trim()) {
      throw new Error(`${field} cannot be empty`);
    }
  }
});

/**
 * Create or retrieve the Event model with proper typing
 */
const Event: Model<EventDocument> =
  mongoose.models.Event || mongoose.model<EventDocument>('Event', eventSchema);

export { Event, type EventDocument };
