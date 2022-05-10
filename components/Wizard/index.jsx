import React, { useState, useEffect, createRef, useRef } from 'react';
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import FeastingLayout from '../Layout/Feasting';
import LoadingIcon from '../Loading/Icon';
import Head from 'next/head';

const Wizard = ({ children, childFunc }) =>
{
	const session = useSelector((state) => state.session)
	const [stageIndex, setStageIndex] = useState(0)
	const [stages] = useState(React.Children.toArray(children))
	const handleOnClick = e => () => setStageIndex(e);
	const wizard = createRef();
	const router = useRouter()
	const [query, setQuery] = useState()
	const [loading, setLoading] = useState(false)

	const nextClick = async () =>
	{
		if (stageIndex < stages.length - 1)
		{
			if(await childFunc[stageIndex].current()){
				setStageIndex(prev => (prev + 1));
			}
		}
	};

	const startClick = async () => {
		setLoading(true)
		await childFunc[stageIndex].current();
		setLoading(false)
		router.push("/Feasting/Together")
	}

	const prevClick = () =>
	{
		if (stageIndex > 0)
		{
			setStageIndex(prev => (prev - 1));
		}
	};

	useEffect(() => { 
		if(router.query.stage == "Waiting") {
			setStageIndex(stages.length - 1)
		}
	}, []);

	return (
		<FeastingLayout>
			<Head>
				<link rel="apple-touch-icon" sizes="180x180" href="/Branding/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/Branding/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/Branding/favicon-16x16.png" />
				<link rel="manifest" href="/Branding/site.webmanifest" />
				<link rel="mask-icon" href="/Branding/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="msapplication-TileColor" content="#2d89ef" />
				<meta name="theme-color" content="#ffffff" />

				<title>Getting Things Figured Out</title>
				<meta name="title" content="Feasting Together" />
				<meta name="description" content="Helping you and your buddies find the perfect place to eat!" />

				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://www.feastingtogether.com/" />
				<meta property="og:title" content="Feasting Together" />
				<meta property="og:description" content="Helping you and your buddies find the perfect place to eat!" />
				<meta property="og:image" content={session.session_id ? "https://feastingtogether.vercel.app/" + session.session_id : "/Branding/Meta.png"} />

				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://www.feastingtogether.com/" />
				<meta property="twitter:title" content="Feasting Together" />
				<meta property="twitter:description" content="Helping you and your buddies find the perfect place to eat!" />
				<meta property="twitter:image" content={session.session_id ? "https://feastingtogether.vercel.app/" + session.session_id : "/Branding/Meta.png"} />
			</Head>
			<div className='card max-w-full h-full w-[30rem] md:h-[44rem] shadow-lg dark:bg-slate-900 dark:border-slate-900 dark:text-white'>
				<div className='w-full h-full' ref={wizard}>
					{stages[stageIndex]}
				</div>
				{session.creator || stageIndex == 0 && !loading ? <div className='w-full flex items-center justify-end gap-2 p-2'>
					{(
						stageIndex > 1 ?
							<button className='button ghost' onClick={prevClick} disabled={loading}>
								Previous
							</button>
							:
							null
					)}
					{(
						stageIndex == stages.length - 1 ?
							<button className="button success" onClick={startClick} disabled={loading}>
								Start
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
								</svg>
							</button>
							:
							<button className='button' onClick={nextClick} disabled={loading}>
								Next
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
								</svg>
							</button>
					)}
				</div> : null }
				{!session.creator && stageIndex > 0 && !loading ? <div className='w-full flex items-center justify-end gap-2 p-2'>
					<button className='button' onClick={nextClick} disabled={true}>
						Waiting
						<LoadingIcon />
					</button>
				</div> : null}
			</div>
		</FeastingLayout>
	)
}

export default Wizard;