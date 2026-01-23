import EventCard from '@/components/EventCard'
import ExoploreBtn from '@/components/ExoploreBtn'
import { IEvent } from '@/database/event.model';
import { cacheLife } from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Home = async () => {
  'use cache';
  let events: IEvent[] = [];
  try {
    cacheLife('hours')
    const res = await fetch(`${BASE_URL}/api/events`);
    if (res.ok) {
      const data = await res.json();
      events = data.events ?? [];
    }
  } catch (error) {
    console.error('Failed to fetch events:', error);
  }

  return (
    <section>
      <h1 className='text-center'>The Hub for Every Dev <br />Event you mustn&apos;t miss</h1>
      <p className='text-center mt-5'>Hackatons, Meetups, and Conferences, All in One Place</p>
      <ExoploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {events && events.length > 0 && events.map((event: IEvent) => (
            <li key={event._id?.toString() ?? event.slug} className="list-none">
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>

    </section>
  )
}

export default Home 