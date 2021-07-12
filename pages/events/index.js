import { useRouter } from 'next/router';
import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/EventList';
import EventsSearch from '../../components/events/EventsSearch';
import Head from 'next/head';

export default function AllEventsPage({ events }) {
    const router = useRouter();

    function findEventsHandler(year, month) {
        const path = `/events/${year}/${month}`;
        router.push(path);
    }

    return (
        <>
            <Head>
                <title>Terminator</title>
                <meta name="description" content="Find Sarah Connor" />
            </Head>
            <EventsSearch onSearch={findEventsHandler} />
            <EventList events={events} />
        </>
    );
}

export async function getStaticProps() {
    const events = await getAllEvents();
    return {
        props: { events },
        revalidate: 60
    }
}