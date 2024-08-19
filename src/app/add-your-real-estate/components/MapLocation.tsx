"use client"
import {useState} from "react"
import axios from "axios"


const MapLocation:React.FC<any>=()=>{
    const [viewport, setViewport] = useState({  
        latitude: 37.8,  
        longitude: 122.4,  
        zoom: 6,  
      });  
      const [searchQuery, setSearchQuery] = useState('');  
    
      const handleSearch = async (e:any) => {  
        e.preventDefault();  
        try {  
          // Replace 'YOUR_GEOCODING_API_URL' with the actual API URL  
          const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${e.target.value}&format=json`);  
          const data = response.data[0];  
          if (data) {  
            setViewport({  
              latitude: parseFloat(data.lat),  
              longitude: parseFloat(data.lon),  
              zoom: 14,  
            });  
          } else {  
            alert('Location not found');  
          }  
        } catch (error) {  
          console.error('Error fetching geocoding data', error);  
        }  
      };  
      console.log(viewport,"viewport")
//       latitude
// : 
// 36.57937225
// longitude
// : 
// 37.03497286770472
    return <>
     <input  
          type="text"  
        //   value={searchQuery}  
          onChange={(e) => handleSearch(e)}  
          placeholder="Search for a location"  
          style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1 }}  
        /> 
        <Map/> 
     {/* <Map  
        initialViewState={viewport}  
        style={{ width: "500px", height: "500px" }}  
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"  
        onViewportChange={(nextViewport) => setViewport(nextViewport)}  
      >  
        <Marker longitude={viewport.longitude} latitude={viewport.latitude} color="red" />  
      </Map>  */}
     
    </>
}
export default MapLocation