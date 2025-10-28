export type Weather = {
  temperature: number;
  windSpeed: number;
  humidity?: number;
  cloudCover?: number;
  precipitationProbability?: number;
};

const API_KEY = process.env.NEXT_PUBLIC_TOMORROW_API_KEY;

export const fetchWeather = async (lat: number, lon: number): Promise<Weather | null> => {
  const url = `https://api.tomorrow.io/v4/weather/realtime?location=${lat},${lon}&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error("Weather fetch error: unexpected status", response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    const values = data?.data?.values;

    console.log("Weather API response:", data);

    if (!values) return null;

    return {
      temperature: values.temperature,
      windSpeed: values.windSpeed,
      humidity: values.humidity,
      cloudCover: values.cloudCover,
      precipitationProbability: values.precipitationProbability,
    };
  } catch (error) {
    console.error("Weather fetch error:", error);
    return null;
  }
};
