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
				<meta property="og:image" content="/Branding/Meta.png" />
				<meta property="twitter:image" content="/Branding/Meta.png" />
			</Head>
			<div className='card max-w-full w-[30rem] h-full max-h-[44rem] shadow-lg dark:bg-slate-900 dark:border-slate-800 dark:text-white'>
				<div className='w-full h-full' ref={wizard}>
					{stages[stageIndex]}
				</div>
				{session.creator || stageIndex == 0 && !loading ? <div className='w-full flex items-center justify-end gap-2 p-4'>
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
