import React, { useEffect, useState } from 'react'
import conf from '../utils/conf';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function customQuery(location, search, locationId, routeCoordinates) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userLocationData, setUserLocationData] = useState({});           // user current location details
    const [nearbyLocationData, setNearbyLocationData] = useState([])        // what services present in the nearby location
    const [locationDetailes , setLocationDetailes] = useState({});          // location details of the user clicked location
    const [routeData, setRouteData] = useState({});                         // route details from one location to another location

    const controller = new AbortController();
    const apikey = conf.placesKey;

    // console.log(location);                                                  // for testing kolkata coordinates: {latitude: 22.54111111, longitude: 88.33777778}
    // console.log(search);                                                    // for testing search: 'restaurant'
    // console.log(locationId);
    // console.log(routeCoordinates);

  
    // Fetch services around the locations
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { latitude, longitude } = location || {};

                const {lat: routeLatitude, lon: routeLongitude} = routeCoordinates || {};
                const fromWaypoint = [latitude,longitude];                             // latutude, longitude          // use location longitude and latitude
                const toWaypoint = [routeLatitude,routeLongitude];                          // latitude, longitude          // fetch from the api
                const category = search
                if(search.length > 1 ){
                    console.log(`${category.join(',')}`)
                }

                // //* It gives the user current location details
                // if (location !== null && location !== undefined) {
                //     const response = await axios.get(` https://api.geoapify.com/v2/place-details?lat=${latitude}&lon=${longitude}&features=details,building&apiKey=${apikey}`);
                //     setUserLocationData(response.data.features[0].properties);
                // }

                // //* It gives the user current nearby location details
                // if (search !== null && search !== undefined && search.length > 0) {
                //     const response = await axios.get(`https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${longitude},${latitude},5000&bias=proximity:${longitude},${latitude}&limit=40&apiKey=${apikey}`);
                //     setNearbyLocationData(response.data.features); 
                // } 

                // //* It gives the location details of the user clicked location
                // if (locationId !== null && locationId !== undefined) {
                //     const response = await axios.get(`https://api.geoapify.com/v2/place-details?id=${locationId}&features=details&apiKey=${apikey}`);
                //     setLocationDetailes(response.data.features[0].properties);
                // }

                // //* It gives the route details from one location to another location
                // if(routeCoordinates !== null && routeCoordinates !== undefined){
                //     const response = await axios.get(`https://api.geoapify.com/v1/routing?waypoints=${fromWaypoint.join(',')}|${toWaypoint.join(',')}&mode=drive&details=instruction_details&apiKey=${apikey}`);
                //     setRouteData(response.data);
                // }
            }
            catch (error) {
                setError(error);
            }
            finally {
                setLoading(false);
            }
        }

        fetchData();

        return () => {
            controller.abort();                                               // it is used to cleanup the controller
        };
    }, [location, search, locationId, routeCoordinates]);

    return [userLocationData, nearbyLocationData, locationDetailes, routeData, error];
}

/*
    APIS:
        const response = await axios.get(` https://api.geoapify.com/v2/place-details?lat=${latitude}&lon=${longitude}&features=details,building&apiKey=${apikey}`);

        const response = await axios.get(`https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${longitude},${latitude},5000&bias=proximity:${longitude},${latitude}&limit=40&apiKey=${apikey}`);

        const response = await axios.get(`https://api.geoapify.com/v2/place-details?id=${locationId}&features=details&apiKey=${apikey}`);
        
        const response = await axios.get(`https://api.geoapify.com/v1/routing?waypoints=${fromWaypoint.join(',')}|${toWaypoint.join(',')}&mode=drive&details=instruction_details&apiKey=${apikey}`);

*/
