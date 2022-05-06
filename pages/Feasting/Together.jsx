import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import FeastingLayout from '../../components/Layout/Feasting';
import CardContent from '../../components/Card';
import { useRouter } from 'next/router'
import Link from 'next/link';
import Loading from '../../components/Loading';
import { setResult } from '../../store'

const Feast = () =>
{
	const dispatch = useDispatch()
	const store_result = useSelector((state) => state.results)
	const connection = useSelector((state) => state.connection)
	const session = useSelector((state) => state.session)
	const [lng, setLng] = useState(null);
	const [lat, setLat] = useState(null);
	const [price, setPrice] = useState(null);
	const [results, setResults] = useState(null);
	const [position, setPosition] = useState(0);
	const [finished, setFinished] = useState(false);
	const router = useRouter()

	useEffect(() => {
		if(!connection) {
			router.push("/Feasting/")
			return
		}
	},[]);

	useEffect(() => {
		connection
			.from('session')
			.select("*")
			.eq('session_id', session.session_id).then((resp) =>
			{
				setLat(resp.data[0].location[0])
				setLng(resp.data[0].location[1])
				
				let price = resp.data[0].price.replace('[','')
				price = price.replace(']','')
				setPrice(price)
			})
	},[]);

	useEffect(() => {
		if (store_result)
		{
			setResult(store_result)
			return
		}

		const apiKey = process.env.REACT_APP_YELP_KEY
		if (!results && lat && lng && price) {
			fetch("/api/hello", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					lat: lat,
					lng: lng,
					price: price,
					apiKey: apiKey
				})
		})
			.then(res => res.json())
			.then((result) => {
					dispatch(setResult(result.businesses))
					setResults(result.businesses)

					connection.from('session:session_id=eq.' + session.session_id)
						.on('*', payload => {
							if (payload.new.finished) {
								fetchParticipants(result.businesses)
							}
						})
						.subscribe()
				}
			)
		}
	},[lat,lng]);

	const setLikes = async (isLiked) =>
	{
        const rest = results[position].name;
		const restid = results[position].id;

        await connection
        .rpc('Feasting_Updated', {
            rest: rest, 
			restid: restid, 
            sessionid: session.session_id, 
            userid: session.user_id, 
            isliked: isLiked 
        }).then((resp) => {
			if(position != results.length - 1) {
				setPosition(position + 1)
			} else {
				setPosition(0)
			}
		});
	}

	const fetchParticipants = async (rests) =>
	{
		connection.removeAllSubscriptions()
		setFinished(true)
		await connection
			.from('session')
			.select('winner_id')
			.eq('session_id', session.session_id)
			.eq('finished', true).then((resp) =>
			{
				if (!resp.error)
				{
					let index = rests.findIndex(x => x.id === resp.data[0].winner_id);
					setPosition(index)
				}
			})
	}


	return (
		<FeastingLayout>
			<div className='card max-w-full h-full w-[30rem] md:h-[44rem] shadow-lg dark:bg-slate-900 dark:border-slate-900 dark:text-white'>
				<CardContent>
					<div className='relative w-full h-full bg-slate-600 border border-slate-900 rounded-lg '>
						{results ? <>
							<div className='w-full h-full rounded-lg overflow-hidden'>
								<img className='h-full w-full object-center object-cover' src={results[position].image_url} />
							</div>
							<div className='absolute top-0 w-full py-2 px-3 flex flex-row justify-between'>
								<div className='flex flex-row gap-1 items-center p-1 rounded-md bg-white/50 backdrop-blur-md dark:bg-slate-900/50'>
									<div className={'yelp-stars w-28 h-6 rating' + results[position].rating.toString().replace(".","_")}></div>
									<p className='pr-2 text-sm font-bold'>{results[position].review_count} Reviews</p>
								</div>
								<div className='py-1 px-2 rounded-md bg-white/50 backdrop-blur-md dark:bg-slate-900/50'>
									<svg className='h-5 w-auto' viewBox="0 0 1000 385" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M806.495 227.151L822.764 223.392C823.106 223.313 823.671 223.183 824.361 222.96C828.85 221.753 832.697 218.849 835.091 214.862C837.485 210.874 838.241 206.113 837.198 201.582C837.175 201.482 837.153 201.388 837.13 201.289C836.596 199.117 835.66 197.065 834.37 195.239C832.547 192.926 830.291 190.991 827.728 189.542C824.711 187.82 821.553 186.358 818.289 185.171L800.452 178.659C790.441 174.937 780.432 171.309 770.328 167.771C763.776 165.439 758.224 163.393 753.4 161.901C752.49 161.62 751.485 161.34 750.669 161.058C744.837 159.271 740.739 158.53 737.272 158.505C734.956 158.42 732.649 158.841 730.511 159.738C728.283 160.699 726.282 162.119 724.639 163.906C723.822 164.835 723.054 165.806 722.337 166.815C721.665 167.843 721.049 168.907 720.491 170.001C719.876 171.174 719.348 172.391 718.911 173.642C715.6 183.428 713.951 193.7 714.032 204.029C714.091 213.368 714.342 225.354 719.475 233.479C720.712 235.564 722.372 237.366 724.348 238.769C728.004 241.294 731.7 241.627 735.544 241.904C741.289 242.316 746.855 240.905 752.403 239.623L806.45 227.135L806.495 227.151Z" fill="#FF1A1A" />
										<path d="M987.995 140.779C983.553 131.457 977.581 122.947 970.328 115.601C969.39 114.669 968.385 113.806 967.321 113.02C966.339 112.283 965.318 111.598 964.264 110.967C963.18 110.373 962.065 109.837 960.924 109.362C958.668 108.476 956.25 108.077 953.829 108.19C951.513 108.322 949.254 108.956 947.207 110.049C944.105 111.591 940.748 114.07 936.283 118.221C935.666 118.834 934.891 119.525 934.195 120.177C930.511 123.641 926.413 127.911 921.536 132.883C914.002 140.497 906.583 148.152 899.21 155.89L886.017 169.571C883.601 172.071 881.401 174.771 879.441 177.643C877.771 180.07 876.59 182.799 875.963 185.678C875.6 187.886 875.653 190.142 876.12 192.329C876.143 192.429 876.164 192.523 876.187 192.622C877.229 197.154 879.988 201.103 883.883 203.637C887.778 206.172 892.505 207.094 897.068 206.211C897.791 206.106 898.352 205.982 898.693 205.898L969.033 189.646C974.576 188.365 980.202 187.191 985.182 184.3C988.522 182.363 991.699 180.443 993.878 176.569C995.043 174.441 995.748 172.092 995.948 169.675C997.027 160.089 992.021 149.202 987.995 140.779Z" fill="#FF1A1A" />
										<path d="M862.1 170.358C867.197 163.955 867.184 154.41 867.64 146.607C869.174 120.536 870.79 94.4619 872.07 68.3766C872.56 58.4962 873.624 48.7498 873.036 38.7944C872.552 30.5816 872.492 21.1521 867.307 14.4122C858.154 2.52688 838.636 3.50371 825.319 5.34732C821.239 5.91358 817.153 6.6749 813.099 7.64807C809.045 8.62124 805.033 9.6841 801.108 10.9412C788.329 15.127 770.365 22.8103 767.323 37.5341C765.608 45.858 769.672 54.3727 772.824 61.9691C776.645 71.1774 781.865 79.4721 786.622 88.1401C799.198 111.024 812.008 133.765 824.782 156.53C828.597 163.326 832.755 171.933 840.135 175.454C840.623 175.667 841.121 175.856 841.628 176.018C844.937 177.272 848.545 177.513 851.993 176.712C852.201 176.664 852.405 176.617 852.608 176.57C855.792 175.704 858.675 173.973 860.937 171.568C861.345 171.185 861.734 170.782 862.1 170.358Z" fill="#FF1A1A" />
										<path d="M855.997 240.155C854.008 237.355 851.184 235.258 847.931 234.162C844.677 233.065 841.16 233.027 837.881 234.051C837.111 234.307 836.361 234.618 835.636 234.983C834.515 235.554 833.445 236.221 832.439 236.976C829.507 239.148 827.039 241.97 824.791 244.8C824.221 245.522 823.7 246.483 823.022 247.1L811.708 262.663C805.295 271.382 798.971 280.123 792.7 289.003C788.608 294.735 785.068 299.576 782.273 303.859C781.743 304.666 781.193 305.567 780.689 306.284C777.338 311.469 775.441 315.252 774.467 318.622C773.735 320.862 773.503 323.234 773.788 325.572C774.1 328.008 774.92 330.35 776.195 332.447C776.873 333.499 777.604 334.516 778.385 335.495C779.196 336.436 780.058 337.332 780.966 338.18C781.936 339.105 782.973 339.957 784.07 340.729C791.879 346.162 800.428 350.066 809.421 353.083C816.904 355.567 824.682 357.053 832.555 357.504C833.894 357.572 835.237 357.543 836.572 357.417C837.809 357.309 839.04 357.136 840.26 356.9C841.479 356.615 842.681 356.266 843.863 355.853C846.162 354.993 848.255 353.66 850.008 351.94C851.667 350.279 852.944 348.276 853.749 346.07C855.057 342.81 855.917 338.671 856.483 332.526C856.532 331.652 856.657 330.604 856.744 329.644C857.19 324.545 857.395 318.556 857.723 311.514C858.276 300.685 858.71 289.903 859.053 279.09C859.053 279.09 859.782 259.875 859.78 259.865C859.946 255.437 859.81 250.53 858.582 246.121C858.042 244.008 857.17 241.994 855.997 240.155V240.155Z" fill="#FF1A1A" />
										<path d="M983.707 270.24C981.346 267.651 978 265.069 972.722 261.878C971.961 261.453 971.068 260.886 970.244 260.392C965.85 257.749 960.557 254.969 954.374 251.611C944.876 246.396 935.372 241.312 925.778 236.271L908.825 227.28C907.946 227.024 907.053 226.389 906.225 225.989C902.968 224.432 899.516 222.978 895.932 222.311C894.697 222.074 893.444 221.944 892.186 221.923C891.375 221.913 890.565 221.962 889.761 222.07C886.371 222.595 883.234 224.178 880.795 226.591C878.356 229.005 876.74 232.128 876.178 235.513C875.919 237.667 875.998 239.847 876.411 241.976C877.24 246.487 879.254 250.95 881.338 254.858L890.391 271.824C895.428 281.394 900.526 290.907 905.752 300.391C909.123 306.578 911.929 311.871 914.557 316.26C915.055 317.085 915.62 317.974 916.046 318.738C919.245 324.013 921.815 327.333 924.421 329.715C926.109 331.345 928.132 332.586 930.349 333.351C932.68 334.124 935.146 334.398 937.59 334.155C938.832 334.008 940.066 333.795 941.286 333.516C942.488 333.193 943.672 332.808 944.833 332.362C946.087 331.889 947.305 331.327 948.478 330.678C955.36 326.82 961.703 322.07 967.345 316.552C974.112 309.894 980.093 302.633 984.745 294.321C985.392 293.145 985.952 291.924 986.422 290.667C986.86 289.504 987.24 288.319 987.558 287.118C987.834 285.896 988.045 284.662 988.191 283.418C988.422 280.977 988.138 278.514 987.358 276.19C986.591 273.963 985.345 271.932 983.707 270.24V270.24Z" fill="#FF1A1A" />
										<path fillRule="evenodd" clipRule="evenodd" d="M400.03 105.19C400.03 91.2089 411.42 79.7877 425.167 79.7877C438.717 79.7877 449.714 91.2089 450.303 105.387V303.682C450.303 317.663 438.913 329.084 425.167 329.084C411.027 329.084 400.03 317.663 400.03 303.682V105.19ZM376.657 227.672C376.461 231.61 375.479 238.896 370.373 244.213C364.874 249.923 357.412 251.302 353.092 251.302C335.123 251.4 317.155 251.45 299.187 251.499C281.218 251.548 263.248 251.597 245.279 251.696C246.85 256.619 249.992 264.101 257.062 270.994C261.382 275.129 265.506 277.492 267.273 278.476C269.434 279.855 276.896 283.793 286.126 283.793C295.945 283.793 304.586 280.642 313.03 276.31L313.736 275.945C319.604 272.904 325.66 269.766 332.079 268.631C338.363 267.646 345.04 268.827 349.949 273.16C355.841 278.279 358.197 285.762 356.037 293.442C353.484 302.106 346.218 309.589 338.559 314.118C334.239 316.678 329.526 318.844 324.813 320.617C318.725 322.783 312.441 324.358 306.157 325.343C299.872 326.327 293.392 326.721 286.911 326.524H286.911C283.769 326.524 280.431 326.524 277.092 326.13C273.558 325.736 270.023 324.949 266.684 324.161C261.186 322.98 256.08 321.207 250.974 318.844C246.064 316.678 241.155 313.921 236.638 310.771C232.121 307.62 227.997 303.879 224.07 299.94C220.338 296.002 216.804 291.67 213.662 286.944C203.057 270.797 198.147 250.908 199.129 231.61C199.915 212.706 206.199 193.802 217.589 178.443C218.823 176.519 220.247 174.883 221.596 173.333C222.18 172.663 222.75 172.008 223.284 171.354C237.35 154.158 256.142 148.716 263.894 146.471L264.328 146.345C286.519 140.044 304.978 144.179 312.441 146.345C316.172 147.33 337.185 153.828 353.484 171.354C354.27 172.141 356.43 174.701 359.179 178.443C369.505 192.508 373.066 205.605 374.272 210.042L374.301 210.146C375.479 214.478 376.657 220.386 376.657 227.672ZM261.382 195.181C249.992 204.436 246.85 216.251 246.064 219.992H331.686C330.901 216.448 327.562 204.436 316.172 195.181C304.586 185.925 292.41 185.335 288.679 185.335C284.948 185.335 272.772 185.925 261.382 195.181ZM586.98 142.998C564.593 142.998 544.169 153.041 529.637 169.385V168.794C529.048 155.6 518.05 144.967 504.696 144.967C490.753 144.967 479.56 156.191 479.56 170.172V359.409C479.56 373.391 490.753 384.615 504.696 384.615C518.64 384.615 529.833 373.391 529.833 359.409V352.123V300.334C544.365 316.482 564.593 326.721 587.176 326.721C632.147 326.721 668.674 285.959 668.674 235.155C668.478 184.35 631.951 142.998 586.98 142.998ZM575.983 285.566C550.453 285.566 529.637 263.314 529.637 235.549C529.637 207.586 550.257 185.335 575.983 185.335C601.512 185.335 622.328 207.586 622.328 235.549C622.132 263.314 601.512 285.566 575.983 285.566ZM161.425 248.348L153.177 266.464C149.446 274.341 145.715 282.415 142.18 290.488C141.052 292.966 139.916 295.494 138.764 298.057C123.068 332.981 104.44 374.43 63.8242 383.236C44.1861 387.568 14.5327 381.661 3.5354 363.15C-7.4619 344.443 8.83767 322.979 29.8504 327.902C33.1646 328.641 36.4235 330.266 39.7101 331.904C45.187 334.635 50.7406 337.404 56.7545 336.173C62.4495 335.188 65.9844 331.053 70.5011 325.736C76.7853 318.45 79.5346 310.771 80.7129 306.242C80.6147 306.045 80.5165 305.798 80.4183 305.552C80.3201 305.306 80.2219 305.06 80.1237 304.863C75.0117 295.326 70.5473 286.8 66.8178 279.677C64.3868 275.034 62.2681 270.987 60.4857 267.646C56.8287 260.714 54.0662 255.473 51.918 251.398C45.6449 239.497 44.609 237.532 41.8296 232.398C35.7418 220.78 29.2612 209.555 22.5843 198.331C15.3182 186.122 7.85577 172.535 13.9436 158.16C18.8531 146.542 31.4214 140.634 43.4006 144.376C56.0403 148.212 61.6377 160.239 66.8724 171.487C67.8188 173.52 68.7534 175.528 69.7156 177.458C78.16 194.196 86.4079 210.934 94.6559 227.672C95.382 229.336 96.4917 231.605 97.8402 234.362C99.0447 236.824 100.44 239.676 101.922 242.834C102.697 244.475 103.434 246.002 104.101 247.382C104.954 249.149 105.691 250.676 106.242 251.892C110.072 242.342 113.95 232.841 117.829 223.34C121.707 213.839 125.586 204.337 129.415 194.787C129.522 194.253 130.436 192.216 131.813 189.145C132.977 186.549 134.473 183.215 136.092 179.427C136.64 178.133 137.191 176.79 137.755 175.417C142.856 162.995 148.988 148.06 162.604 143.982C172.423 141.028 183.42 144.967 189.115 153.237C192.061 157.372 193.239 162.098 193.435 166.824C193.593 177.275 188.545 188.491 184.212 198.115C183.157 200.459 182.144 202.708 181.26 204.829C181.219 204.91 181.048 205.296 180.739 205.988C179.541 208.679 176.278 216.005 170.655 228.066C168.626 232.389 166.679 236.713 164.707 241.09C163.626 243.491 162.538 245.907 161.425 248.348Z" fill="black" />
										<path d="M687.728 310.153H689.549C690.447 310.153 691.167 309.923 691.706 309.462C692.256 308.99 692.532 308.395 692.532 307.676C692.532 306.833 692.29 306.232 691.807 305.872C691.324 305.502 690.56 305.316 689.515 305.316H687.728V310.153ZM695.043 307.608C695.043 308.507 694.801 309.305 694.318 310.002C693.846 310.687 693.178 311.198 692.313 311.535L696.324 318.193H693.492L690.004 312.226H687.728V318.193H685.234V303.176H689.633C691.498 303.176 692.863 303.541 693.728 304.271C694.605 305.002 695.043 306.114 695.043 307.608ZM677.228 310.676C677.228 308.429 677.79 306.322 678.914 304.356C680.037 302.389 681.582 300.839 683.549 299.704C685.515 298.569 687.633 298.002 689.902 298.002C692.15 298.002 694.256 298.564 696.223 299.687C698.189 300.811 699.74 302.356 700.874 304.322C702.009 306.288 702.577 308.406 702.577 310.676C702.577 312.889 702.032 314.968 700.942 316.912C699.852 318.856 698.324 320.412 696.358 321.58C694.391 322.749 692.24 323.333 689.902 323.333C687.577 323.333 685.431 322.754 683.464 321.597C681.498 320.429 679.964 318.872 678.863 316.929C677.773 314.985 677.228 312.901 677.228 310.676ZM678.998 310.676C678.998 312.62 679.487 314.44 680.464 316.136C681.442 317.822 682.773 319.153 684.459 320.131C686.155 321.097 687.97 321.58 689.902 321.58C691.858 321.58 693.672 321.092 695.346 320.114C697.02 319.136 698.346 317.816 699.324 316.153C700.313 314.479 700.807 312.653 700.807 310.676C700.807 308.721 700.318 306.906 699.341 305.232C698.363 303.558 697.037 302.232 695.363 301.255C693.7 300.266 691.88 299.771 689.902 299.771C687.947 299.771 686.133 300.26 684.459 301.238C682.785 302.215 681.453 303.541 680.464 305.215C679.487 306.878 678.998 308.698 678.998 310.676Z" fill="black" />
									</svg>
								</div>
							</div>
							<div className='absolute w-full h-10 -bottom-5 flex items-center justify-center'>
								{finished ? <p className='success text-2xl font-semibold px-8 badge succes'>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
									</svg>
									Winner!
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
									</svg>
								</p>
								: <p className='bg-slate-900 text-white font-semibold px-8 badge succes'>Invite Code: {session.session_id}</p>}
							</div>
						</> : <Loading />}
					</div>
					<div className='w-full h-full flex flex-col'>
						{results ? <div className='w-full flex-1 flex flex-col gap-2 p-2 pt-0 overflow-auto'>
							<div className="w-full flex-none text-3xl font-bold truncate flex flex-row flex-nowrap items-center gap-2">
								<h1 className='truncate'>{results[position].name}</h1>
								<Link href={results[position].url}>
									<a target="_blank" className='button ghost sm icon'>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
											<path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
										</svg>
									</a>
								</Link>
							</div>
							<ul className='flex-none w-full overflow-x-auto flex flex-row flex-nowrap gap-1 pb-2'>
								{results[position].categories.map((category, index) =>
								{
									return (
										<div className='badge sm flex-none' key={index}>{category.title}</div>
									)
								})}
							</ul>
							<ul className='h-full overflow-y-auto relative space-y-2'>
								<li className='flex flex-row gap-2 items-center'>
									<p className='font-bold'>Price</p>
									<ul className='flex flex-row'>
										{[...results[position].price].map((price, index) => {
											return (
												<li key={index} className='text-success-700 dark:text-success-500'>
													<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
														<path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
													</svg>
												</li>
											)
										})}
									</ul>
								</li>
								<li className='flex flex-row gap-2'>
									<p className='font-bold'>Location</p>
									<div className='flex flex-col'>
										{results[position].location.display_address.map((location, index) => {
											return (
												<p key={index}>{location}</p>
											)
										})}
									</div>
								</li>
							</ul>
						</div> : <Loading />}
						{!finished ? <div className='button_group flex-none'>
							<button className='button lg emergency w-full' onClick={() => setLikes(false)}>
								No Thanks!
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</button>
							<button className='button lg success w-full' onClick={() => setLikes(true)}>
								Yes Please!
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
									<path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
								</svg>
							</button>
						</div> : null}
					</div>
				</CardContent>
			</div>
		</FeastingLayout>
	)
}

export default Feast