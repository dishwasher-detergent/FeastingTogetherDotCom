import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js'
import { setSession, setSessionName } from '../../../store'
import { useRouter } from 'next/router'
import LoadingIcon from '../../Loading/Icon';
import { motion, useCycle } from 'framer-motion'

const loadingAnim = {
	open: () => ({
		opacity: 1,
		width: "100%",
		height: "100%",
		transition: {
			type: "spring",
			stiffness: 20,
			restDelta: 2
		}
	}),
	closed: {
		PointerEvent: "none",
		opacity: 0,
		width: "4rem",
		height: "4rem",
		transition: {
			delay: 0.5,
			type: "spring",
			stiffness: 400,
			damping: 40
		}
	}
};

const CreateHome = () =>
{
	const dispatch = useDispatch()
	const sessionName = useSelector((state) => state.name)
	const connection = useSelector((state) => state.connection)
	const [name, setName] = useState("");
    const router = useRouter()
	const [loading, setLoading] = useCycle(false, true)

	useEffect(() => {
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

		setLoading()

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
			router.push("/Feasting")
		}
		setLoading()
	}

	return (
        <motion.div
			initial={{x: "-20%"}}
			animate={{x: 0}}
			exit={{x: "20%"}}
			className='relative w-full max-w-5xl flex flex-col md:flex-row md:items-end gap-2 p-4 overflow-hidden bg-white border border-slate-300 rounded-lg shadow-lg'>
            <div className='flex flex-col flex-1'>
                <label className='pl-2 pb-1 block text-sm font-bold'>Name</label>
                <input maxLength={16} required className="input lg w-full" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='flex-none pt-8 md:pt-0'>
                <button onClick={CreateSession} className="button lg w-full md:w-auto">Create Your Own Feast</button>
            </div>
			<motion.div
				initial={false}
				animate={loading ? "open" : "closed"}
				variants={loadingAnim}
				className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 bg-white/50 backdrop-blur-sm dark:bg-slate-900/50 rounded-lg'>
				<div className='w-full h-full flex flex-nowrap flex-row items-center justify-center gap-2'>
					<div className='h-6 w-6'>
						<LoadingIcon />
					</div>
					<p className='font-bold whitespace-nowrap'>
						Creating Session
					</p>
				</div>
			</motion.div>
        </motion.div>
	)
}

export default CreateHome