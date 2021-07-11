import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/EventList';

export default function HomePage({ featuredEvents }) {
    return (
        <div>
            <EventList events={featuredEvents} />
        </div>
    );
}

// since the page is not changed frequently and not user specific
export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents();
    return {
        props: { featuredEvents },
        // rebuild this page every half hour since it's updated rarely
        revalidate: 1800
    }
}