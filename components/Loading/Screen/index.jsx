import { gsap } from "gsap";
import { useEffect,useRef } from "react";

const LoadingScreen = () => {
	const loadingScreen = useRef(null);

	useEffect(() => {
		const timeline = gsap.timeline();

		timeline.add(
			// gsap.from(loadingScreen.current,{
			// 	scale: 0.5,
			// }),
			gsap.to(loadingScreen.current, {
				width: "100%",
				height: "100%",
			}),
			gsap.to(loadingScreen.current, {
				opacity: 0
			})
		)
	},[]);

	return (
		<div ref={loadingScreen} className="max-w-full h-full w-[30rem] md:h-[44rem] flex flex-col rounded-xl bg-white border border-slate-300 overflow-hidden">
			<p>test</p>
		</div>
	)
}

export default LoadingScreen;