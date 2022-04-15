import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import FeastingLayout from '../../components/Layout/Feasting';
import Card from '../../components/Card';
import { useRouter } from 'next/router'
import {CopyToClipboard} from 'react-copy-to-clipboard';


const Waiting = () =>
{
	const connection = useSelector((state) => state.connection)
	const session = useSelector((state) => state.session)
	const [participants, setParticipants] = useState([]);
	const [copy, setCopy] = useState(false);
	const router = useRouter()

	useEffect(() =>
	{
		if(!connection) {
			router.push("/Feasting/Create")
			return
		}

		connection
			.from('session')
			.select("started")
			.eq('session_id', session.session_id).then((resp) =>
			{
				if(resp.data[0].started)
				{
					router.push("/Feasting/Feast")
				}
			})
	}, [])

	useEffect(() => {
		fetchParticipants()
		connection.from('participants:session_id=eq.' + session.session_id)
			.on('*', payload =>
			{
				fetchParticipants()
			})
			.subscribe()

		connection.from('session:session_id=eq.' + session.session_id)
			.on('*', payload =>
			{
				if (payload.new.started)
				{
					router.push('/Feasting/Feast')
				}
			})
			.subscribe()
	}, [])

	const setStart = async () =>
	{
		await connection
			.from('session')
			.update({ started: true })
			.eq('session_id', session.session_id)
	}

	const fetchParticipants = async () => {
		await connection
			.from('participants')
			.select('*')
			.eq('session_id', session.session_id)
			.eq('left', false).then((resp) =>
			{
				if (!resp.error)
					setParticipants(resp.data)
			})
	}

	const copyText = () => {
		setCopy(true)
		setTimeout(() => {
			setCopy(false)
		}, 1000);
	}

	return (
		<FeastingLayout>
			<Card step={3}>
				<>
					<p className='font-bold text-sm'>{participants.length} {participants.length == 1 ? "Person" : "People"} Waiting</p>
					<div className='w-full h-full p-2 overflow-y-auto bg-slate-50 border border-slate-300 rounded-md'>
						{participants.map((participant, index) =>{
							return (
								<div className={'flex items-center gap-2 w-full px-3 py-1 rounded-md ' + (participant.creator ? 'bg-amber-300' : null)} key={index}>
									{participant.creator ?
									<div data-content="Creator" className='tooltip right'>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-100 bg-amber-600 rounded-full" viewBox="0 0 20 20" fill="currentColor">
											<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
										</svg>
									</div> : null}
									<p className='text-lg'>{participant.user}</p>
								</div>
							)
						})}
					</div>
				</>
				<div className='w-full flex flex-col'>
					<div className='flex flex-col gap-2 flex-1 w-full'>
						<p>Invite Code</p>
						<div className='flex items-center'>
							<h1 className='font-bold text-5xl tracking-widest'>{(session.session_id ? session.session_id : "Invalid!")}</h1>
							<div data-content={!copy ? "Copy!" : "Copied!"} className={'tooltip right ' + (copy ? 'success' : null)}>
								<CopyToClipboard text={session.session_id} onCopy={copyText}>
									<button data-content="Copy!" className='button ghost icon lg'>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
											<path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
										</svg>
									</button>
								</CopyToClipboard>
							</div>
						</div>
					</div>
					{session.creator ? <div className='flex items-end justify-end'>
						<button className='button' onClick={setStart}>
							Next
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
							</svg>
						</button>
					</div> : null}
				</div>
			</Card>
		</FeastingLayout>
	)
}

export default Waiting