import Head from "next/head";

import useWeather from "@/hooks/useWeather";
import styles from "@/styles/Home.module.css";
import Sidebar from "@/components/Sidebar";
import Content from "@/components/Content";
import Loading from "@/components/Loading";

export default function Home() {
  const { loading } = useWeather();

  return (
    <>
      <Head>
        <title>Weather App</title>
        <meta name="title" content="Weather App" />
        <meta name="description" content="A beautiful weather app" />
        <link rel="icon" href="/icons/01d.png" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://erik-weather-app.vercel.app/" />
        <meta property="og:title" content="Weather App"/>
        <meta property="og:description" content="A beautiful weather app" />
        <meta property="og:image" content="https://erik-weather-app.vercel.app/og.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://erik-weather-app.vercel.app/" />
        <meta property="twitter:title" content="Weather App" />
        <meta property="twitter:description" content="A beautiful weather app" />
        <meta property="twitter:image" content="https://erik-weather-app.vercel.app/og.png" />
      </Head>

      <main className={styles.main}>
        <Sidebar />
        <Content />
        {loading && <Loading />}
      </main>
    </>
  );
}
