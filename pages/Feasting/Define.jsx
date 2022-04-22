import { useSelector } from 'react-redux'
import { useState, useEffect,useRef } from 'react';
import FeastingLayout from '../../components/Layout/Feasting';
import Card from '../../components/Card';
import { useRouter } from 'next/router'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import LoadingIcon from '../../components/Loading/Icon';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

const Define = () =>
{
	const connection = useSelector((state) => state.connection)
	const session = useSelector((state) => state.session)
	const [price, setPrice] = useState([1]);
	const [geoController, setGetController] = useState(null)
	const router = useRouter()

	const mapContainer = useRef(null);
	const map = useRef(null);
	const controlContainer = useRef(null);
	const [lng, setLng] = useState(0);
	const [lat, setLat] = useState(0);
	const [zoom, setZoom] = useState(9);
	const [move, setMove] = useState(false);

	useEffect(() => {
		if(!connection) {
			router.push("/Feasting/Create")
			return
		}
	},[]);

	useEffect(() =>
	{
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/laundrysoap/ckc0mkwl64d3n1iqyphg0f8ka',
			center: [lng, lat],
			zoom: zoom
		});

		const geocoder = new MapboxGeocoder({
			accessToken: mapboxgl.accessToken,
			mapboxgl: mapboxgl,
			limit: 2,
			countries: "US"
		});
		document.getElementById('geocoder').appendChild(geocoder.onAdd(map.current))
	},[]);

	useEffect(() =>
	{
		if (!map.current) return; // wait for map to initialize
		map.current.on('movestart', () =>
		{
			setMove(true)
		});
		map.current.on('moveend', () =>
		{
			setLng(map.current.getCenter().lng.toFixed(4));
			setLat(map.current.getCenter().lat.toFixed(4));
			setZoom(map.current.getZoom().toFixed(2));
			setMove(false)
		});
	});

	const handleCheckboxChange = (event) => {
		if (event.target.checked) {
			if (!price.includes(Number(event.target.value))) {
				setPrice([...price, Number(event.target.value)])
			}
		} else {
			setPrice(price.filter(element => element != event.target.value));
		}
	  }

	return (
		<FeastingLayout>
			<Card step={2}>
				<div className='relative w-full h-full bg-gray-600 border border-gray-900 rounded-md overflow-hidden'>
					<div className='w-full h-full aboslute inset-0' ref={mapContainer}></div>
				</div>
				<div className='w-full flex flex-col'>
					<div className='flex flex-col gap-2 flex-1 w-full'>
						<div>
							<label className='pl-2 pb-1 block text-sm font-bold'>Address</label>
							{/* <input required className="input w-full" placeholder='Name' value={address} onChange={(e) => setAddress(e.target.value)} /> */}
							<div ref={controlContainer} id="geocoder" className="geocoder"></div>
						</div>
						<div>
							<label className='pl-2 pb-1 block text-sm font-bold'>Location</label>
							<div className='flex justify-between py-2 px-4 rounded-md bg-slate-50 border border-slate-300 font-bold'>
								<label className='flex items-center justify-center gap-2'>
									$
									<input type="checkbox" required className="checkbox" placeholder='1' value={1} onChange={handleCheckboxChange} checked={price.includes(1)}/>
								</label>
								<label className='flex items-center justify-center gap-2'>
									$$
									<input type="checkbox" required className="checkbox" placeholder='2' value={2} onChange={handleCheckboxChange} checked={price.includes(2)}/>
								</label>
								<label className='flex items-center justify-center gap-2'>
									$$$
									<input type="checkbox" required className="checkbox" placeholder='3' value={3} onChange={handleCheckboxChange} checked={price.includes(3)}/>
								</label>
								<label className='flex items-center justify-center gap-2'>
									$$$$
									<input type="checkbox" required className="checkbox" placeholder='4' value={4} onChange={handleCheckboxChange} checked={price.includes(4)}/>
								</label>
							</div>
						</div>
					</div>
					<div className='flex items-end justify-end'>
						{!move ? <button className='button' onClick={setDetails}>
							Next
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
							</svg>
						</button> :
						<button className='button' disabled>
							Finding Location
							<LoadingIcon />
						</button>}
					</div>
				</div>
			</Card>
		</FeastingLayout>
	)
}

export default Define