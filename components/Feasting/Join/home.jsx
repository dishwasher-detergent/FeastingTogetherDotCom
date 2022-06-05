import { useSelector, useDispatch } from 'react-redux'
import { createClient } from '@supabase/supabase-js'
import { useState } from 'react';
import { useRouter } from 'next/router'
import { setSession } from '../../../store'
import LoadingIcon from '../../../components/Loading/Icon';
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

const JoinHome = ({ image }) =>
{
	const router = useRouter() 
	const connection = useSelector((state) => state.connection)
	const dispatch = useDispatch()
	const [name, setName] = useState("");
    const [sessionID, setSessionID] = useState("");
	const [loading, setLoading] = useCycle(false, true)

	const startSession = async () => {
		if(name){
			setLoading()
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
			setLoading()
			dispatch(setSession(session))

			router.push({
				pathname: '/Feasting',
				query: { stage: 'Waiting' },
			})
		}
	}

	return (
        <motion.div
			initial={{x: "-20%"}}
			animate={{x: 0}}
			exit={{x: "20%"}}
			className='relative w-full max-w-5xl flex flex-col md:flex-row md:items-end gap-2 p-4 overflow-hidden bg-white border border-slate-300 rounded-lg shadow-lg'>
            <div className='w-full'>
                <label className='pl-2 pb-1 block text-sm font-bold'>Name</label>
                <input maxLength={16} required className="input lg w-full" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='w-full'>
                <label className='pl-2 pb-1 block text-sm font-bold'>Session ID</label>
                <div className='w-full h-12 flex items-center justify-center relative'>
                    <div className='h-full w-full grid grid-cols-6 gap-2'>
                        <div className='flex items-center justify-center text-4xl font-bold bg-slate-50 border border-slate-300 rounded-lg dark:bg-slate-800 dark:border-slate-900'>{sessionID[0] ? sessionID[0] : '0'}</div>
                        <div className='flex items-center justify-center text-4xl font-bold bg-slate-50 border border-slate-300 rounded-lg dark:bg-slate-800 dark:border-slate-900'>{sessionID[1] ? sessionID[1] : '0'}</div>
                        <div className='flex items-center justify-center text-4xl font-bold bg-slate-50 border border-slate-300 rounded-lg dark:bg-slate-800 dark:border-slate-900'>{sessionID[2] ? sessionID[2] : '0'}</div>
                        <div className='flex items-center justify-center text-4xl font-bold bg-slate-50 border border-slate-300 rounded-lg dark:bg-slate-800 dark:border-slate-900'>{sessionID[3] ? sessionID[3] : '0'}</div>
                        <div className='flex items-center justify-center text-4xl font-bold bg-slate-50 border border-slate-300 rounded-lg dark:bg-slate-800 dark:border-slate-900'>{sessionID[4] ? sessionID[4] : '0'}</div>
                        <div className='flex items-center justify-center text-4xl font-bold bg-slate-50 border border-slate-300 rounded-lg dark:bg-slate-800 dark:border-slate-900'>{sessionID[5] ? sessionID[5] : '0'}</div>
                    </div>
                    <input maxLength={6} required className="absolute h-full w-full px-2.5 bg-transparent border-none text-transparent" value={sessionID} onChange={(e) => setSessionID(e.target.value.toUpperCase())} />
                </div>
            </div>
            <div className='flex-none pt-8 md:pt-0'>
                <button onClick={startSession} className="button lg w-full md:w-auto">Join Your Buddies</button>
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

export default JoinHome