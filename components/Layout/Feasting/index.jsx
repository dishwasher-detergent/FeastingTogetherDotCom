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
			<main className="w-full h-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-1000">
				{children}
			</main>
		</Div100vh>
	)
}

export default FeastingLayout;