const axios = require('axios');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.status === 'OK') {
            const location = data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error('Axios error:', error.message);
        throw error;
    }
};

module.exports.getDistanceTime=async(origin,destination)=>{
    // console.log(origin,destination);
    
    if(!origin || !destination){
        throw new Error('Both origin and destination are required.')
    }
    const apiKey=process.env.GOOGLE_MAPS_API
    const url=`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`
    try{
        const response=await axios.get(url)
        if(response.data.status==='OK'){
            if(response.data.rows[0].elements[0].status=='ZERO_RESULTS')
                throw new Error('No Route found.')
            // console.log(response.data.rows[0].elements[0]);
            
            return response.data.rows[0].elements[0]
        }
        else throw new Error('Unable to fetch distance and time')
    }
    catch(error){
        // console.error(error)
        return error
    }
}

module.exports.getAutoCompleteSuggestions=async(input)=>{
    if(!input){
        throw new Error('query is required')
    }
    const apiKey=process.env.GOOGLE_MAPS_API
    const url=`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`
    try{
        const response=await axios.get(url)
        if(response.data.status=='OK')
            return response.data.predictions
        else throw new Error('Unable to fetch suggestions')
    }
    catch(error){
        console.error(error)
        throw error;
    }
}