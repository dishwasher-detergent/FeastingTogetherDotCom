const FeastingLayout = ({ children }) =>
{
	return (
		<main className="w-full ios-height h-screen md:h-screen flex flex-col items-center justify-center bg-slate-50">
			{children}
		</main>
	)
}

export default FeastingLayout;