import React, { useState, useEffect, createRef, useRef } from 'react';
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import FeastingLayout from '../Layout/Feasting';
import LoadingIcon from '../Loading/Icon';
import Head from 'next/head';

const Wizard = ({ children, childFunc = null }) =>
{
	const session = useSelector((state) => state.session)
	const [stageIndex, setStageIndex] = useState(0)
	const [stages] = useState(React.Children.toArray(children))
	const wizard = createRef();
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	useEffect(() => { 
		if(router.query.stage == "Waiting") {
			setStageIndex(stages.length - 2)
		}
	}, []);

	const nextClick = async () =>
	{
		setLoading(true)
		if(childFunc[stageIndex]){
			if(await childFunc[stageIndex].current())
				setStageIndex(prev => (prev + 1));
		} else {
			setStageIndex(prev => (prev + 1));
		}
		setLoading(false)
	};

	const prevClick = () =>
	{
		if (stageIndex > 0)
		{
			setStageIndex(prev => (prev - 1));
		}
	};

	return (
		<FeastingLayout>
			<Head>
				<meta property="og:image" content="/Branding/Meta.png" />
				<meta property="twitter:image" content="/Branding/Meta.png" />
			</Head>
			<div className='card max-w-full w-[30rem] h-full max-h-[44rem] shadow-lg dark:bg-slate-900 dark:border-slate-800 dark:text-white'>
				<div className='w-full h-full overflow-y-auto' ref={wizard}>
					{stages[stageIndex]}
				</div>
				{stageIndex != stages.length - 1 ?
				<Buttons 
					session={session} 
					stageIndex={stageIndex}
					stages={stages}
					loading={loading}
					prevClick={prevClick}
					nextClick={nextClick}
				/> : null}
			</div>
		</FeastingLayout>
	)
}

export default Wizard;


const Buttons = ({session, stageIndex, stages, loading, prevClick, nextClick}) => {
	if(session.creator || stageIndex == 0) {
		return (
			<div className='w-full flex items-center justify-end gap-2 p-4'>
				{( stageIndex > 1 &&
				<button className='button ghost' onClick={prevClick} disabled={loading}>
					Previous
				</button> )}
				{(
					stageIndex == stages.length - 2 ?
						<button className="button success" onClick={nextClick} disabled={loading}>
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
			</div>
		)
	}
	if(!session.creator && stageIndex > 0) {
		return (
			<div className='w-full flex items-center justify-end gap-2 p-2'>
				<button className='button' onClick={nextClick} disabled={true}>
					Waiting
					<LoadingIcon />
				</button>
			</div>
		)
	}

	return null
}