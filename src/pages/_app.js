import CountryProvider from "@/context/CountryProvider";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <CountryProvider>
      <Component {...pageProps} />
    </CountryProvider>
  );
}

export default MyApp;
