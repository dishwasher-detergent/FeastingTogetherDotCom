import Div100vh from 'react-div-100vh'

const FeastingLayout = ({ children }) =>
{
	return (
		<Div100vh>
			<main className="w-full h-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
				{children}
			</main>
		</Div100vh>
	)
}

export default FeastingLayout;