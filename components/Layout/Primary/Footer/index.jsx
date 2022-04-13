const PrimaryFooter = ({ children }) =>
{
	return (
		<footer className="flex-none w-full p-4 flex flex-row justify-center items-center border-t border-slate-900 bg-slate-800">
			{children}
		</footer>
	)
}

export default PrimaryFooter;