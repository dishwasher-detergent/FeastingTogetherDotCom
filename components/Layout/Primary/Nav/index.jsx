const PrimaryNav = ({ children }) =>
{
	return (
		<nav className="w-full h-24 px-8 flex-none flex flex-row justify-center items-center">
			<div className="h-full w-full flex flex-row justify-between items-center">
				{children}
			</div>
		</nav>
	)
}

export default PrimaryNav;