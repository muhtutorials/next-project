import { getFeaturedEvents } from '../dummyData';
import EventList from '../components/events/EventList';

export default function HomePage() {
    const featuredEvents = getFeaturedEvents();

    return (
        <div>
            <EventList events={featuredEvents} />
        </div>
    );
}