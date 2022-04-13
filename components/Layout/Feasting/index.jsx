import { useEffect } from "react";
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'

const FeastingLayout = ({ children }) =>
{
	const connection = useSelector((state) => state.connection)
	const router = useRouter()

	useEffect(() => {
		if(!connection) router.push("/")
	},[]);

	return (
		<main className="w-full min-h-screen flex flex-col items-center justify-center bg-slate-50">
			{children}
		</main>
	)
}

export default FeastingLayout;