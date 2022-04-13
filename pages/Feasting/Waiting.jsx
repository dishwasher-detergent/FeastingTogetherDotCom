import { useSelector } from 'react-redux'
import { useState } from 'react';
import FeastingLayout from '../../components/Layout/Feasting';
import Card from '../../components/Card';
import { useRouter } from 'next/router'

const Define = () =>
{
	const connection = useSelector((state) => state.connection)
	const session = useSelector((state) => state.session)
	const [address, setAddress] = useState("");
	const [price, setPrice] = useState(1);
	const router = useRouter()

	const setStart = async () =>
	{
		await connection
			.from('session')
			.update({ started: true })
			.eq('session_id', session.session_id).then((resp) =>
			{
				if (!resp.error)
					router.push('/Feasting/Feasting')
			})
	}

	return (
		<FeastingLayout>
			<Card step={3}>
				<>
					<p className='font-bold text-sm'>5 People Joined</p>
					<div className='w-full h-full bg-slate-50 border border-slate-300 rounded-md'>

					</div>
				</>
				<div className='w-full flex flex-col'>
					<div className='flex flex-col gap-2 flex-1 w-full'>
						<p>Invite Code</p>
						<div className='flex items-center gap-2'>
							<h1 className='font-bold text-5xl tracking-widest'>{(session.session_id ? session.session_id : "Invalid!")}</h1>
							<div data-content="Copy!" className='tooltip right'>
								<button data-content="Copy!" className='button ghost icon lg'>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
										<path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
									</svg>
								</button>
							</div>
						</div>
					</div>
					<div className='flex items-end justify-end'>
						<button className='button' onClick={setStart}>
							Next
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
							</svg>
						</button>
					</div>
				</div>
			</Card>
		</FeastingLayout>
	)
}

export default Define