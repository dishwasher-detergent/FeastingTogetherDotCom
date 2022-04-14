import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
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

	useEffect(() => {
		if(!connection) {
			router.push("/Feasting/Create")
			return
		}
	},[]);

	const setDetails = async () =>
	{
		if (address && price)
		{
			await connection
				.from('session')
				.update({ location: address, price: price })
				.eq('session_id', session.session_id).then((resp) =>
			{
				if (!resp.error)
					router.push('/Feasting/Waiting')
			})
		}
	}

	return (
		<FeastingLayout>
			<Card step={2}>
				<div className='w-full h-full bg-slate-600 border border-slate-900 rounded-md'>

				</div>
				<div className='w-full flex flex-col'>
					<div className='flex flex-col gap-2 flex-1 w-full'>
						<div>
							<label className='pl-2 pb-1 block text-sm font-bold'>Address</label>
							<input required className="input w-full" placeholder='Name' value={address} onChange={(e) => setAddress(e.target.value)} />
						</div>
						<div>
							<label className='pl-2 pb-1 block text-sm font-bold'>Price</label>
							<div className='flex justify-between py-2 px-4 rounded-md bg-slate-50 border border-slate-300 font-bold'>
								<label className='flex items-center justify-center gap-2'>
									$
									<input type="radio" required className="radio" placeholder='1' value={1} onChange={(e) => setPrice(e.target.value)} checked={price == 1} />
								</label>
								<label className='flex items-center justify-center gap-2'>
									$$
									<input type="radio" required className="radio" placeholder='2' value={2} onChange={(e) => setPrice(e.target.value)} checked={price == 2} />
								</label>
								<label className='flex items-center justify-center gap-2'>
									$$$
									<input type="radio" required className="radio" placeholder='3' value={3} onChange={(e) => setPrice(e.target.value)} checked={price == 3} />
								</label>
								<label className='flex items-center justify-center gap-2'>
									$$$$
									<input type="radio" required className="radio" placeholder='4' value={4} onChange={(e) => setPrice(e.target.value)} checked={price == 4} />
								</label>
							</div>
						</div>
					</div>
					<div className='flex items-end justify-end'>
						<button className='button' onClick={setDetails}>
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