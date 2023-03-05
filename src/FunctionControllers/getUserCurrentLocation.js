// import axios from "axios"
const getPosition = () => {
// //   if (navigator.geolocation) {
// //     navigator.geolocation.getCurrentPosition(((position) => {
// //         console.log(position)
// //         let lat = position.coords.latitude;
// //         let long = position.coords.longitude;
// //         console.log(lat, long)
// //         convertToAddress(lat, long)
// //     }), posErr);
// //   } else {
// //     alert("Sorry, Geolocation is not supported in your browser");
// //   }
// // };

// // const posErr = () => {
// //   if (navigator.permissions) {
// //     navigator.permissions.query({ name: "geolocation" }).then((result) => {
// //     if (result.state === "denied") {
// //         alert(
// //           "Enable location permissions for this website on your browser setting"
// //         );
// //       }
// //     });
// //   }
// //   else{
// //     alert("Unable to access your location, you can continue to provided your location manually.")
// //   }
// // };


// // const convertToAddress=(lat, long)=>{
// //     console.log(lat, long)

// // }

// // let lat = "";
// // let long = "";
// // const API_endPoint = `http://api.openweathermap.org/data/2.5/weather?`
// // const API_KEY = `a40ba88924fc33e7f86ef128056ccbee`

// // const getPosition=()=>{
// //   navigator.geolocation.getCurrentPosition((position)=>{

// //     lat = position.coords.latitude;
// //     long = position.coords.longitude;
// // console.log(lat, long);
// //     let URL = `${API_endPoint}lat=${lat}&lon=${long}&appid=${API_KEY}`;
// //     axios.get(URL).then((res)=>{
// //       console.log(res);
// //     })
// //   })
// // }

// const API = `https://api.myptv.com/geocoding/v1/locations/by-position`
// const getPosition=()=>{
//     navigator.geolocation.getCurrentPosition((position)=>{
//       if(position){
//         const {latitude, longitude} = position.coords
//         // console.log(latitude, longitude);
//         // axios.get(`https://api.myptv.com/geocoding/v1/locations/by-position/6.5994752/3.3292288?language=en`).then((res)=>{
//         //   console.log(res);
//         // });
//       }
//     });
 }



 export { getPosition};
