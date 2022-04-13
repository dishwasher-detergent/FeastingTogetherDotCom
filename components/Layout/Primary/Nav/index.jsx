const PrimaryNav = ({ children }) =>
{
	return (
		<nav className="w-full h-14 px-4 flex flex-row justify-center items-center backdrop-blur-lg border-b border-slate-300">
			<div className="h-full w-full max-w-7xl flex flex-row justify-between items-center">
				{children}
			</div>
		</nav>
	)
}

export default PrimaryNav;