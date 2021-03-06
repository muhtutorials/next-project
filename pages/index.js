import Head from 'next/head';
import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/EventList';
import NewsletterRegistration from "../components/input/NewsletterRegistration";

export default function HomePage({ featuredEvents }) {
    return (
        <div>
            <Head>
                <title>Home Page</title>
                <meta name="description" content="Find all Sarahs Connor" />
            </Head>
            <NewsletterRegistration />
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