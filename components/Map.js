import ReactMapGL, { Marker, Popup } from "react-map-gl"
import { useState } from "react"
import getCenter from "geolib/es/getCenter"

function Map({ searchResults }){
	const [selectedLocation, setSelectedLocation] = useState("")
	
	const coordinates = searchResults.map(result => ({
		longitude: result.long,
		latitude: result.lat
	}))
	
	const center = getCenter(coordinates)
	
	const [viewport, setViewport] = useState({
		width: "100%",
		height: "100%",
		latitude: center.latitude,
		longitude: center.longitude,
		zoom: 11
	})

	return(
		<ReactMapGL
			mapStyle="mapbox://styles/voidszone/cksepfcytd7ay18qq1erh6ml8"
			mapboxApiAccessToken={process.env.mapbox_key}
			{...viewport }
			onViewportChange={(nextViewport) => setViewport(nextViewport)}	
		>
		
			{searchResults.map(item => (
				<div key={item.long}>
					<Marker
						longitude={item.long}
						latitude={item.lat}
						offsetTop={-10}
						offsetLeft={-20}
					>
						<p onClick={()=> setSelectedLocation(item)} 
						className="cursor-pointer text-2xl animate-bounce"
						aria-label="push-pin">📌</p>
					</Marker>
					
					{selectedLocation.long === item.long ? (
						<Popup
						 onClose={() => setSelectedLocation({})}
						 closeOnClick={true}
						 latitude={item.lat}
						 longitude={item.long}
						>
							{item.title}
						</Popup>
					):(
						false
					)}
					
				</div>
			))}
		
		</ReactMapGL>
	)
}

export default Map