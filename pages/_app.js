import '../styles/globals.css'
import Layout from '../components/layout/Layout';
import Head from 'next/head';
import { NotificationContextProvider } from '../store/NotificationContext';

export default function MyApp({ Component, pageProps }) {
  return (
      <NotificationContextProvider>
          <Layout>
            {/* Elements inside head tag get merged wih other head elements,
             if they coincide with more specific elements, more specific elements overide them */}
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Infiltrators" />
                <title>T-800s</title>
            </Head>
            <Component {...pageProps} />
          </Layout>
      </NotificationContextProvider>
  );
}
