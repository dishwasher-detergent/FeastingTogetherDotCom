import { store } from '../../../store/store';
import { setSession } from '../../store'
import { createClient } from '@supabase/supabase-js'

export const CreateSession = async () => {
	const dispatch = useDispatch()
	const name = useSelector((state) => state.name)
	const connection = useSelector((state) => state.connection)

	let supabase = connection;
	if(!connection){
		const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
		const supabaseKey = process.env.REACT_APP_SUPABASE_KEY
		supabase = createClient(supabaseUrl, supabaseKey)
	}

	const session = await supabase.rpc('CreateSession', {
		username: name
	}).then((resp) =>
	{
		return {
			connection: supabase,
			session: (resp.error ? resp.error : {
				session_id: resp.data.session_id,
				user_id: resp.data.user_id,
				creator: true,
			})
		}
	})

	dispatch(setSession(session))

	return session
}

export const SetDetails = async () =>
{
	const location = useSelector((state) => state.location)
	const price = useSelector((state) => state.price)
	const session = useSelector((state) => state.session)
	await connection
		.from('session')
		.update({ location: [location.lat,location.lng], price: price })
		.eq('session_id', session.session_id)
}

export const StartSession = async () =>
{
	const connection = useSelector((state) => state.connection)
	const session = useSelector((state) => state.session)
	await connection
		.from('session')
		.update({ started: true })
		.eq('session_id', session.session_id)
}

export const FetchParticipants = async () =>
{
	const connection = useSelector((state) => state.connection)
	const session = useSelector((state) => state.session)
	await connection
		.from('participants')
		.select('*')
		.eq('session_id', session.session_id)
		.eq('left', false).then((resp) =>
		{
			if (!resp.error)
				return resp.data
		})
}