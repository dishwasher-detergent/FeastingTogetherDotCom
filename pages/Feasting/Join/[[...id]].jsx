import { useSelector, useDispatch } from 'react-redux'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';
import FeastingLayout from '../../../components/Layout/Feasting';
import CardContent from '../../../components/Card';
import { useRouter } from 'next/router'
import { setSession } from '../../../store'
import LoadingIcon from '../../../components/Loading/Icon';
import Link from 'next/link';
import Head from 'next/head';

const Join = () =>
{
	const router = useRouter() 
	const {id} = router.query;
	const connection = useSelector((state) => state.connection)
	const dispatch = useDispatch()
	const [name, setName] = useState("");
    const [sessionID, setSessionID] = useState("");
	const [image, setImage] = useState("https://feastingtogether.vercel.app/000000.png");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if(id) {
			setSessionID(id[0])
			setImage("https://feastingtogether.vercel.app/" + id + ".png")
		}
	},[id])

	useEffect(() => {
		
	},[]);

	const startSession = async () => {
		if(name){
			setLoading(true)
			let supabase = connection;
			if(!connection){
				const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
				const supabaseKey = process.env.REACT_APP_SUPABASE_KEY
				supabase = createClient(supabaseUrl, supabaseKey)
			}

			const session = await supabase.from('participants')
            .insert([{
				user: name,
                session_id: sessionID.toUpperCase()
			}]).then((resp) =>
			{
				return {
					connection: supabase,
					session: (resp.error ? resp.error : {
                        session_id: resp.data[0].session_id,
                        user_id: resp.data[0].id,
                        creator: false
                    })
				}
			})
			setLoading(false)
			dispatch(setSession(session))

			router.push({
				pathname: '/Feasting',
				query: { stage: 'Waiting' },
			})
		}
	}

	return (
		<FeastingLayout>
			<Head>
				<meta property="og:image" content={image} />
				<meta property="twitter:image" content={image} />
			</Head>
			<div className='card max-w-full h-full w-[30rem] md:h-[44rem] shadow-lg dark:bg-slate-900 dark:border-slate-900 dark:text-white'>
				<CardContent>
					<div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-slate-50 border border-slate-300 rounded-md dark:bg-slate-800 dark:border-slate-900">
						<h1 className='font-bold text-2xl'>Instructions</h1>
						<ol className='flex flex-col gap-2'>
							<li className='h-10 flex flex-row items-center gap-4'>
								<div className='flex items-center justify-center rounded-full h-8 min-w-[2rem] px-1.5 bg-primary-50 text-primary-600 font-bold border border-primary-600'>
									<p>1</p>
								</div>
								<p className='text-lg'>Join a session</p>
							</li>
							<li className='h-10 flex flex-row items-center gap-4'>
								<div className='flex items-center justify-center rounded-full h-8 min-w-[2rem] px-1.5 bg-primary-50 text-primary-600 font-bold border border-primary-600'>
									<p>2</p>
								</div>
								<p className='text-lg'>Invite your friends</p>
							</li>
							<li className='h-10 flex flex-row items-center gap-4'>
								<div className='flex items-center justify-center rounded-full h-8 min-w-[2rem] px-1.5 bg-primary-50 text-primary-600 font-bold border border-primary-600'>
									<p>3</p>
								</div>
								<p className='text-lg'>Start Feasting!</p>
							</li>
						</ol>
					</div>
					<div className='w-full flex flex-col'>
						<div className='w-full h-full flex flex-col'>
							<div className='flex-1 flex flex-col gap-6'>
								<div className='w-full'>
									<label className='pl-2 pb-1 block text-sm font-bold'>Name</label>
									<input maxLength={16} required className="input w-full" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
								</div>
								<div className='w-full'>
									<label className='pl-2 pb-1 block text-sm font-bold'>Session ID</label>
									<div className='w-full h-16 flex items-center justify-center relative'>
										<div className='h-full max-w-full w-4/5 grid grid-cols-6 gap-2'>
											<div className='flex items-center justify-center text-5xl font-bold bg-slate-50 border border-slate-300 rounded-md dark:bg-slate-800 dark:border-slate-900'>{sessionID[0] ? sessionID[0] : '0'}</div>
											<div className='flex items-center justify-center text-5xl font-bold bg-slate-50 border border-slate-300 rounded-md dark:bg-slate-800 dark:border-slate-900'>{sessionID[1] ? sessionID[1] : '0'}</div>
											<div className='flex items-center justify-center text-5xl font-bold bg-slate-50 border border-slate-300 rounded-md dark:bg-slate-800 dark:border-slate-900'>{sessionID[2] ? sessionID[2] : '0'}</div>
											<div className='flex items-center justify-center text-5xl font-bold bg-slate-50 border border-slate-300 rounded-md dark:bg-slate-800 dark:border-slate-900'>{sessionID[3] ? sessionID[3] : '0'}</div>
											<div className='flex items-center justify-center text-5xl font-bold bg-slate-50 border border-slate-300 rounded-md dark:bg-slate-800 dark:border-slate-900'>{sessionID[4] ? sessionID[4] : '0'}</div>
											<div className='flex items-center justify-center text-5xl font-bold bg-slate-50 border border-slate-300 rounded-md dark:bg-slate-800 dark:border-slate-900'>{sessionID[5] ? sessionID[5] : '0'}</div>
										</div>
										<input maxLength={6} required className="absolute h-full max-w-full w-4/5 px-2.5 bg-transparent border-none text-transparent" value={sessionID} onChange={(e) => setSessionID(e.target.value)} />
									</div>
									{/* <input maxLength={6} required className="input w-full tracking-widest uppercase" placeholder='123456' value={sessionID} onChange={(e) => setSessionID(e.target.value)} /> */}

								</div>
							</div>
							<div className='flex items-end justify-end gap-2'>
								<Link href="/">
									<a className='button ghost emergency'>
										Leave
									</a>
								</Link>
								{!loading ? <button className='button' onClick={startSession}>
									Next
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
										<path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
									</svg>
								</button> :
								<button className='button' disabled>
									Finding Session
									<LoadingIcon />
								</button>}
							</div>
						</div>
					</div>
				</CardContent>
			</div>
		</FeastingLayout>
	)
}

export default Join