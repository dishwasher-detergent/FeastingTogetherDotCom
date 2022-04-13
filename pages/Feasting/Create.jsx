import { useSelector, useDispatch } from 'react-redux'
import { createClient } from '@supabase/supabase-js'
import { useState } from 'react';
import { setSession } from '../../store'
import FeastingLayout from '../../components/Layout/Feasting';
import Card from '../../components/Card';
import { useRouter } from 'next/router'


const Create = () =>
{
	const connection = useSelector((state) => state.connection)
	const dispatch = useDispatch()
	const [name, setName] = useState("");
	const router = useRouter()

	const startSession = async () => {
		if(name){
			let supabase = connection;
			if(!connection){
				const supabaseUrl = 'https://pmfajerqlbtgdjrrjygc.supabase.co'
				const supabaseKey = process.env.REACT_APP_SUPABASE_KEY
				supabase = createClient(supabaseUrl, supabaseKey)
			}

			const session = await supabase.rpc('CreateSession', {
				username: name
			}).then((resp) =>
			{
				return {
					connection: supabase,
					session: (resp.error ? resp.error : resp.data)
				}
			})

			dispatch(setSession(session))

			router.push('/Feasting/Define')
		}
	}

	return (
		<FeastingLayout>
			<Card>
				<>
					<h1 className='font-bold text-2xl'>Instructions</h1>
					<ol className='flex flex-col gap-2'>
						<li className='h-10 flex flex-row items-center gap-4'>
							<div className='flex items-center justify-center rounded-full h-8 min-w-[2rem] px-1.5 bg-primary-50 text-primary-600 font-bold border border-primary-600'>
								<p>1</p>
							</div>
							<p className='text-lg'>Create a session</p>
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
				</>
				<div className='w-full flex flex-col'>
					<div className='w-full h-full flex flex-col gap-2'>
						<div className='flex-1 w-full'>
							<label className='pl-2 pb-1 block text-sm font-bold'>Name</label>
							<input required className="input w-full" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
						</div>
						<div className='flex items-end justify-end'>
							<button className='button' onClick={startSession}>
								Next
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
								</svg>
							</button>
						</div>
					</div>
				</div>
			</Card>
		</FeastingLayout>
	)
}

export default Create