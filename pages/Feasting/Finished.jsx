import { connect, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import FeastingLayout from '../../components/Layout/Feasting';
import Card from '../../components/Card';
import { useRouter } from 'next/router'

const Finished = () =>
{
	const connection = useSelector((state) => state.connection)
	const router = useRouter()

	useEffect(() => {
		if(!connection) {
			router.push("/Feasting/Create")
			return
		}
	},[]);



	return (
		<FeastingLayout>
			<Card>
				<div className='w-full h-full bg-slate-600 border border-slate-900 rounded-md'>

				</div>
				<div className='w-full h-full flex flex-col'>
                    <h1 className="flex-none text-2xl font-bold truncate">Finished</h1>
				</div>
			</Card>
		</FeastingLayout>
	)
}

export default Finished