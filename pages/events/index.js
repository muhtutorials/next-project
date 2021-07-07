import { getAllEvents } from '../../dummyData';
import EventList from '../../components/events/EventList';

export default function AllEventsPage() {
    const events = getAllEvents();

    return (
        <div>
            <EventList events={events} />
        </div>
    );
}
