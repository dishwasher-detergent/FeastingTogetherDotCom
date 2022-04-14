const PrimaryFooter = ({ children }) =>
{
	return (
		<footer className="flex-none w-full p-4 flex flex-row justify-center items-center bg-slate-900">
			{children}
		</footer>
	)
}

export default PrimaryFooter;