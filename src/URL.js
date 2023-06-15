 const baseUrl = process.env.NODE_ENV === 'development'? process.env.REACT_APP_SERVER_DEV_URL: process.env.REACT_APP_SERVER_PRO_URL;

//  const locationURI =(latitude, longitude)=>{
//     const URI = `${process.env.REACT_APP_GEOAPIFY_URL}=${latitude}&lon=${longitude}&apiKey=${process.env.REACT_APP_GEOPIFY_API_KEY}
//     `
//     return URI
//  }
 const locationURI =(latitude, longitude)=>{
    const URI = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.REACT_APP_OPENCAGE_API_KEY}
    `
    return URI
 }



 export {baseUrl, locationURI}