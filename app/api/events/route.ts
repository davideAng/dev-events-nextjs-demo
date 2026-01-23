
import { v2 as cloudinary } from "cloudinary";

import { NextRequest, NextResponse } from "next/server";
import { Event } from "@/database/event.model";

import connectDB from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  // Handle POST request to create a new event
  try {
    await connectDB();

    const data = await request.formData();
    let event;

    try {
        event = Object.fromEntries(data.entries());
    } catch (error) {
        console.log('Error converting form data to object:', error);
        return NextResponse.json({ message: 'Invalid JSON data format' }, { status: 400 });
    }

    const file = data.get('image') as File;

    const tags = JSON.parse(data.get('tags') as string);
    const agenda = JSON.parse(data.get('agenda') as string);
    
    if (file) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        // Upload 'buffer' to cloudinary storage
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'DevEvents'}, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }).end(buffer);
        });

        event.image = (uploadResult as { secure_url: string }).secure_url;

    } else {
        return NextResponse.json({ message: 'Image file is required' }, { status: 400 });
    }
    

    const createdEvent = await Event.create({
        ...event,
        tags,
        agenda
    });

    return NextResponse.json({ message: 'Event Created Successfully', event: createdEvent }, { status: 201 });

} catch (error) {
    console.log('Error parsing request body:', error);
    return NextResponse.json({ message: 'Event Creation Failed', error: error instanceof Error ? error.message : "Unknown error"}, { status: 500 });   
  } 
}

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json({ message: 'Events fetched successfully', events }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch events', error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
// 