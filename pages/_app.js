import '../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import Head from 'next/head'
import { Provider } from 'react-redux'
import { useStore } from '../store'
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
			<Script 
				src="https://cdn.jsdelivr.net/gh/greentfrapp/pocoloco@minigl/minigl.js" 
				strategy="beforeInteractive"/>
			<Head>
				<link rel="apple-touch-icon" sizes="180x180" href="/Branding/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/Branding/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/Branding/favicon-16x16.png" />
				<link rel="manifest" href="/Branding/site.webmanifest" />
				<link rel="mask-icon" href="/Branding/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="msapplication-TileColor" content="#2d89ef" />
				<meta name="theme-color" content="#ffffff" />

				<title>Feasting Together</title>
				<meta name="title" content="Feasting Together" />
				<meta name="description" content="Helping you and your buddies find the perfect place to eat!" />

				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://www.feastingtogether.com/" />
				<meta property="og:title" content="Feasting Together" />
				<meta property="og:description" content="Helping you and your buddies find the perfect place to eat!" />

				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://www.feastingtogether.com/" />
				<meta property="twitter:title" content="Feasting Together" />
				<meta property="twitter:description" content="Helping you and your buddies find the perfect place to eat!" />
			</Head>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
