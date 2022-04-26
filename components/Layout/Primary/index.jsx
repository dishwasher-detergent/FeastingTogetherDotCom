import PrimaryNav from "./Nav";
import Link from 'next/link'
import Script from "next/script";
import { useEffect } from "react";

const PrimaryLayout = ({ children }) =>
{
	useEffect(() => {
		var gradient = new Gradient();
		gradient.initGradient("#canvas");
		console.log(gradient);
	},[])

	return (
		<>
			<Script 
				src="https://cdn.jsdelivr.net/gh/greentfrapp/pocoloco@minigl/minigl.js" 
				strategy="beforeInteractive"/>
			<div className="w-screen ios-height h-screen flex items-center justify-center md:p-8 bg-slate-50">
				<div className="relative h-full w-full flex flex-col md:rounded-xl bg-white md:border border-slate-300 overflow-hidden">
					<div className="z-10 w-full h-full overflow-y-auto">
						<PrimaryNav>
							<div className="magic">Feasting Together</div>
							<div>
								<ul className="flex flex-row flex-nowrap">
									{/* <li><a href="#HowItWorks" className="button ghost">How It Works</a></li> */}
									<li>
										<Link href="github.com">
											<a className="button ghost icon">
												<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="inline-block w-6 h-6 fill-current"><path d="M256,32C132.3,32,32,134.9,32,261.7c0,101.5,64.2,187.5,153.2,217.9a17.56,17.56,0,0,0,3.8.4c8.3,0,11.5-6.1,11.5-11.4,0-5.5-.2-19.9-.3-39.1a102.4,102.4,0,0,1-22.6,2.7c-43.1,0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1,1.4-14.1h.1c22.5,2,34.3,23.8,34.3,23.8,11.2,19.6,26.2,25.1,39.6,25.1a63,63,0,0,0,25.6-6c2-14.8,7.8-24.9,14.2-30.7-49.7-5.8-102-25.5-102-113.5,0-25.1,8.7-45.6,23-61.6-2.3-5.8-10-29.2,2.2-60.8a18.64,18.64,0,0,1,5-.5c8.1,0,26.4,3.1,56.6,24.1a208.21,208.21,0,0,1,112.2,0c30.2-21,48.5-24.1,56.6-24.1a18.64,18.64,0,0,1,5,.5c12.2,31.6,4.5,55,2.2,60.8,14.3,16.1,23,36.6,23,61.6,0,88.2-52.4,107.6-102.3,113.3,8,7.1,15.2,21.1,15.2,42.5,0,30.7-.3,55.5-.3,63,0,5.4,3.1,11.5,11.4,11.5a19.35,19.35,0,0,0,4-.4C415.9,449.2,480,363.1,480,261.7,480,134.9,379.7,32,256,32Z"></path></svg>
											</a>
										</Link>
									</li>
								</ul>
							</div>
						</PrimaryNav>
						{children}
					</div>
					<canvas id="canvas" className="absolute inset-0 opacity-30" />
				</div>
			</div>
		</>
	)
}

export default PrimaryLayout;