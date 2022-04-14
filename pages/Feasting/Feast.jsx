import { connect, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import FeastingLayout from '../../components/Layout/Feasting';
import Card from '../../components/Card';
import { useRouter } from 'next/router'

const Feast = () =>
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

		connection.from('session:session_id=eq.' + session.session_id)
			.on('*', payload =>
			{
				if(payload.new.finished){
                    router.push('/Feasting/Finished')
                }
			})
			.subscribe()
	},[]);

	const setLikes = async (isLiked) =>
	{
        console.log('test')
        const rest = 'test';

        await connection
        .rpc('Feasting', {
            rest: rest, 
            sessionid: session.session_id, 
            userid: session.user_id, 
            isliked: isLiked 
        })
	}


	return (
		<FeastingLayout>
			<Card>
				<div className='w-full h-full bg-slate-600 border border-slate-900 rounded-md'>

				</div>
				<div className='w-full h-full flex flex-col'>
                    <h1 className="flex-none text-2xl font-bold truncate">Testing</h1>
                    <div className='h-full overflow-y-auto my-4 relative'>
                        <p className='font-bold text-sm sticky top-0 bg-white backdrop-blur-3xl'>Description:</p>
                        <p >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi aliquid ab adipisci pariatur magni iusto, delectus minus? Accusamus accusantium doloribus, aliquam rerum, neque reprehenderit, iure ex cupiditate labore incidunt aperiam!</p>
                    </div>
					<div className='button_group flex-none'>
                        <button className='button emergency w-full' onClick={() => setLikes(false)}>
							No Thanks!
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
						</button>
						<button className='button success w-full' onClick={() => setLikes(true)}>
							Yes Please!
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
						</button>
					</div>
				</div>
			</Card>
		</FeastingLayout>
	)
}

export default Feast