import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../helpers/api-util';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/ResultsTitle';
import Button from '../../components/ui/Button';
import ErrorAlert from '../../components/ui/ErrorAlert';

export default function FilteredEventsPage({ filteredEvents, date, hasError }) {
    // const router = useRouter();

    // // on first render is empty
    // const filterData = router.query.slug;
    //
    // if (!filterData) {
    //     return <p className="center">Loading...</p>
    // }
    //
    // const [year, month] = filterData;
    //
    // const numYear = +year;
    // const numMonth = +month;

    if (hasError) {
        return (
            <>
                <ErrorAlert>
                    <h1>Invalid filter</h1>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </>
        );
    }

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <>
                <ErrorAlert>
                    <p>No events found</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </>
        );
    }

    const formattedDate = new Date(date.numYear, date.numMonth - 1);

    return (
        <>
            <ResultsTitle date={formattedDate} />
            <EventList events={filteredEvents} />
        </>
    );
}

// generate page on the fly since it's impossible to anticipate
// which pages should be pre-generated
// this page also can use client-side data fetching since it's not very important for SEO
export async function getServerSideProps(context) {
    const filterData = context.params.slug

    const [year, month] = filterData;

    const numYear = +year;
    const numMonth = +month;

    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth > 12 ||
        numMonth < 1
    ) {
        return {
            props: {hasError: true}
            // or
            // notFound: true
            // or
            // redirect: {
            //  destination: '/some-error-page'
            // }
        }
    }

    const filteredEvents = await getFilteredEvents({ year: numYear, month: numMonth });

    return {
        props: {
            filteredEvents,
            date: {
                numYear,
                numMonth
            }
        }
    };
}