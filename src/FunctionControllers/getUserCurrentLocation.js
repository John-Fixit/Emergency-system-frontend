import axios from "axios";
import { locationURI } from "../URL";

const getLocation = async (latitude, longitude) => {
  const URI = locationURI(latitude, longitude);

  let resData = await axios.get(URI);
  // let data = await resData.data.features[0].properties;
  let data = await resData?.data?.results[0];
  return data; 
};

export { getLocation };
