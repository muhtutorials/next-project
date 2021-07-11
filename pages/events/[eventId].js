import { getEventById } from '../../helpers/api-util';
import { getFeaturedEvents } from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/EventSummary';
import EventLogistics from '../../components/event-detail/EventLogistics';
import EventContent from '../../components/event-detail/EventContent';
import ErrorAlert from '../../components/ui/ErrorAlert';

export default function EventDetailPage({ event }) {
	if (!event) {
		return <div className="center"><p>Loading...</p></div>;
	}

    return (
    	<>
    		<EventSummary title={event.title} />
    		<EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
    		<EventContent>
    			<p>{event.description}</p>
    		</EventContent>
    	</>
	);
}

// should be crawlable by search engines
export async function getStaticProps(context) {
	const eventId = context.params.eventId;

	const event = await getEventById(eventId);
	return {
		props: { event },
		revalidate: 30,
	}
}

export async function getStaticPaths() {
	// get featured events because they're more likely to be visited
	const events = await getFeaturedEvents();
	const paths = events.map(event => ({ params: { eventId: event.id } }))
	return {
		paths,
		// dynamically generate pages (not featured ones)
		fallback: 'blocking'
	};
}