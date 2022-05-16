import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import CardContent from '../../components/Card';
import { setSessionPrice,setSessionLocation } from '../../store';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

const Define = ({childFunc, loading = null}) =>
{
	const dispatch = useDispatch()
	const sessionPrice = useSelector((state) => state.price)
	const sessionLocation = useSelector((state) => state.location)
	const session = useSelector((state) => state.session)
	const connection = useSelector((state) => state.connection)
	const [price, setPrice] = useState([1]);

	const mapContainer = useRef(null);
	const map = useRef(null);
	const geocoder = useRef(null);
	const controlContainer = useRef(null);
	const [lng, setLng] = useState(sessionLocation.lng ? sessionLocation.lng : 0);
	const [lat, setLat] = useState(sessionLocation.lat ? sessionLocation.lat : 0);
	const [zoom, setZoom] = useState(sessionLocation.zoom ? sessionLocation.zoom : 5);

	useEffect(() =>
	{
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/laundrysoap/ckc0mkwl64d3n1iqyphg0f8ka',
			center: [lng, lat],
			zoom: zoom,
			animate: false
		});

		if(lng && lat){
			new mapboxgl.Marker()
				.setLngLat([lng, lat])
				.addTo(map.current);
		}

		geocoder.current = new MapboxGeocoder({
			accessToken: mapboxgl.accessToken,
			mapboxgl: mapboxgl,
			limit: 2,
			countries: "US",
		});
		document.getElementById('geocoder').appendChild(geocoder.current.onAdd(map.current))
	}, []);

	useEffect(() =>
	{
		if(!geocoder.current) return;
		geocoder.current.on('result', (e) =>
		{
			setLng(Number(e.result.center[0].toFixed(2)));
			setLat(Number(e.result.center[1].toFixed(2)));
		});
	});

	const SetDetails = async () =>
	{	
		if(!lat || !lng || !price) return false;

		const details = await connection
			.from('session')
			.update({ location: [lat, lng], price: price })
			.eq('session_id', session.session_id)
			.then((resp) =>
			{
				if(!resp.error){
					return true;
				}
			})

		if(details) return true;
		else return false;
	}

	const handleCheckboxChange = (event) =>
	{
		if (event.target.checked)
		{
			if (!price.includes(Number(event.target.value)))
			{
				setPrice([...price, Number(event.target.value)])
			}
		} else
		{
			setPrice(price.filter(element => element != event.target.value));
		}
	}

	// price
	useEffect(() => {
		dispatch(setSessionPrice(price))
	}, [price])

	useEffect(() =>
	{
		if(sessionPrice)
			setPrice(sessionPrice)
	}, [])

	// location
	useEffect(() =>
	{
		childFunc.current = SetDetails
		dispatch(setSessionLocation({lat: lat, lng: lng, zoom: zoom}))
	}, [lat, lng, zoom])


	return (
		<CardContent>
			<div className='relative w-full h-full bg-slate-1000 border border-slate-900 rounded-md overflow-hidden'>
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
						<label className='pl-2 pb-1 block text-sm font-bold'>Price</label>
						<div className='flex justify-between py-2 px-4 rounded-md bg-slate-50 border border-slate-300 font-bold dark:bg-slate-800 dark:border-slate-900'>
							<label className='flex items-center justify-center gap-2'>
								$
								<input type="checkbox" required className="checkbox" placeholder='1' value={1} onChange={handleCheckboxChange} checked={price.includes(1)} />
							</label>
							<label className='flex items-center justify-center gap-2'>
								$$
								<input type="checkbox" required className="checkbox" placeholder='2' value={2} onChange={handleCheckboxChange} checked={price.includes(2)} />
							</label>
							<label className='flex items-center justify-center gap-2'>
								$$$
								<input type="checkbox" required className="checkbox" placeholder='3' value={3} onChange={handleCheckboxChange} checked={price.includes(3)} />
							</label>
							<label className='flex items-center justify-center gap-2'>
								$$$$
								<input type="checkbox" required className="checkbox" placeholder='4' value={4} onChange={handleCheckboxChange} checked={price.includes(4)} />
							</label>
						</div>
					</div>
				</div>
			</div>
		</CardContent>
	)
}

export default Define