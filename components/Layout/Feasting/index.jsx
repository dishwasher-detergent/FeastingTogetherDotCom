import Div100vh from 'react-div-100vh'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const FeastingLayout = ({ children, session }) =>
{
	const [sessionID, setSessionID] = useState('');
	const session_store = useSelector((state) => state.session)

	useEffect(() => { 
		if(session) {
			setSessionID(session);
		} else {
			setSessionID(session_store.session_id);
		}
	}, [session_store])

	return (
		<Div100vh>
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
				<meta property="og:image" content={session ? "https://feastingtogether.vercel.app/" + session : "/Branding/Meta.png"} />

				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://www.feastingtogether.com/" />
				<meta property="twitter:title" content="Feasting Together" />
				<meta property="twitter:description" content="Helping you and your buddies find the perfect place to eat!" />
				<meta property="twitter:image" content={session ? "https://feastingtogether.vercel.app/" + session : "/Branding/Meta.png"} />
			</Head>
			<main className="w-full h-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800">
				{children}
			</main>
		</Div100vh>
	)
}

export default FeastingLayout;