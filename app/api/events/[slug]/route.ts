import { Event, type IEvent } from "@/database/event.model";
import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";


/**
 * Type for route parameters
 */
interface RouteParams {
  params: {
    slug: string;
  };
}

/**
 * GET /api/events/[slug]
 *
 * Fetches event details by slug parameter.
 *
 * @param request - Next.js request object
 * @param params - Route parameters containing the event slug
 * @returns JSON response with event data or error message
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    // Establish database connection
    await connectDB();

    // Extract and validate slug parameter
    const { slug } = await params;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { message: "Invalid or missing slug parameter" },
        { status: 400 }
      );
    }

    // Trim and validate slug format
    const trimmedSlug = slug.trim().toLowerCase();

    if (trimmedSlug.length === 0) {
      return NextResponse.json(
        { message: "Slug cannot be empty" },
        { status: 400 }
      );
    }

    // Query the Event model by slug
    const event: IEvent | null = await Event.findOne({ slug: trimmedSlug });

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        { message: `Event with slug "${slug}" not found` },
        { status: 404 }
      );
    }

    // Return event data with success status
    return NextResponse.json(
      {
        message: "Event retrieved successfully",
        event,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log error for debugging
    console.error("Error fetching event by slug:", error);

    // Return generic error response for security
    return NextResponse.json(
      {
        message: "Failed to fetch event",
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}




