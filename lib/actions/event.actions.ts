'use server';

import { Event, IEvent } from '@/database/event.model';
import connectDB from "@/lib/mongodb";

export const getSimilarEventsBySlug = async (slug: string) => {
    try {
        await connectDB();
        const event = await Event.findOne({ slug }).lean();

        if (!event) return [];

        const similar = await Event.find({ _id: { $ne: event._id }, tags: { $in: event.tags } }).lean();

        return similar.map((e: IEvent) => ({
            ...e,
            _id: e._id.toString()
        }));

    } catch {
        return [];
    }
}