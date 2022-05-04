import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import { setSessionName } from '../../store'
import CardContent from '../../components/Card';
import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js'
import { setSession } from '../../store'

const Create = ({ childFunc, loading = null }) =>
{
	const dispatch = useDispatch()
	const sessionName = useSelector((state) => state.name)
	const connection = useSelector((state) => state.connection)
	const [name, setName] = useState("");
	
	useEffect(() => {
		childFunc.current = CreateSession
		dispatch(setSessionName(name))
	}, [name])

	useEffect(() => {
		if (sessionName) {
			setName(sessionName)
		}
	}, [sessionName])

	const CreateSession = async () =>
	{
		if(!name) return false;

		let supabase = connection;
		if (!connection)
		{
			const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
			const supabaseKey = process.env.REACT_APP_SUPABASE_KEY
			supabase = createClient(supabaseUrl, supabaseKey)
		}

		const session = await supabase.rpc('CreateSession', {
			username: name
		}).then((resp) =>
		{
			if(resp.error) {
				console.log(resp.error)
				return false
			} else {
				console.log(resp.data)
				return {
					connection: supabase,
					session: {
						session_id: resp.data.session_id,
						user_id: resp.data.user_id,
						creator: true,
					}
				}
			}
		})

		if(session) {
			dispatch(setSession(session))
			return true;
		} else {
			return false;
		}
	}

	return (
		<CardContent>
			<div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-slate-50 border border-slate-300 rounded-md dark:bg-slate-800 dark:border-slate-900">
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
			</div>
			<div className='w-full flex flex-col'>
				<div className='w-full h-full flex flex-col gap-2'>
					<div className='flex-1 w-full'>
						{name.name}
						<label className='pl-2 pb-1 block text-sm font-bold'>Name</label>
						<input maxLength={16} required className="input w-full" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
					</div>
				</div>
			</div>
		</CardContent>
	)
}

export default Create