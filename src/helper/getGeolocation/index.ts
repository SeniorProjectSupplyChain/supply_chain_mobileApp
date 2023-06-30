import axios from "axios";
import { GOOGLE_MAPS_APIKEY } from "../../utils";

export async function getGeolocation(
  address: string
): Promise<{ latitude: number; longitude: number } | null> {
  const baseURL = "https://maps.googleapis.com/maps/api/geocode/json";
  const params = {
    address: address,
    key: GOOGLE_MAPS_APIKEY, // Thay YOUR_API_KEY bằng khóa API của bạn
  };

  try {
    const response = await axios.get(baseURL, { params });
    const data = response.data;

    if (data.status === "OK") {
      const location = data.results[0].geometry.location;
      const latitude = location.lat;
      const longitude = location.lng;
      return { latitude, longitude };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Lỗi khi gọi API Geocoding:", error);
    return null;
  }
}
