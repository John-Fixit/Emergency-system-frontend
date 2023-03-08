 const baseUrl = process.env.NODE_ENV === 'development'? process.env.REACT_APP_SERVER_DEV_URL: process.env.REACT_APP_SERVER_PRO_URL;

 const locationURI =(latitude, longitude)=>{
    const URI = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${process.env.REACT_APP_API_KEY}
    `
    return URI

 }

 export {baseUrl, locationURI}