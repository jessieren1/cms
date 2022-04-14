import Head from 'next/head';
import styles from '../styles/Home.module.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>CMS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      <footer className={styles.footer}>2022 © cms </footer>
    </div>
  );
}

export default MyApp;
