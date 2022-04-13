import PrimaryFooter from "./Footer";
import PrimaryNav from "./Nav";

const PrimaryLayout = ({ children }) =>
{
	return (
		<div className="w-full min-h-screen flex flex-col">
			<PrimaryNav>
				<div>Logo</div>
				<div>
					<ul className="flex flex-row flex-nowrap">
						<li><button className="button ghost">test</button></li>
						<li><button className="button ghost">test</button></li>
						<li><button className="button ghost">test</button></li>
						<li><button className="button ghost">test</button></li>
					</ul>
				</div>
			</PrimaryNav>
			{children}
			<PrimaryFooter>
				<div className="text-white font-bold text-lg">test</div>
			</PrimaryFooter>
		</div>
	)
}

export default PrimaryLayout;