import axios from "axios";

// 🔹 Yeh function kisi bhi URL se data fetch karega
const fetcher = async (url: string) => {
  const response = await axios.get(url); // URL se GET request
  return response.data; // Sirf data return karega
};

export default fetcher;
