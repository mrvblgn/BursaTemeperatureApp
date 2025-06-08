import axios from 'axios';

const API_KEY = '7ff07fd38a4f5a60775df50500d94b7f';
const CITY = 'Bursa';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

// Hava durumu verilerini getiren fonksiyon
export const getWeatherData = async (): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=tr`
    );

    return {
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('API anahtarı geçersiz. Lütfen doğru API anahtarını ekleyin.');
      } else if (error.response?.status === 404) {
        throw new Error('Şehir bulunamadı.');
      } else {
        throw new Error('Hava durumu bilgisi alınamadı. Lütfen internet bağlantınızı kontrol edin.');
      }
    }
    throw new Error('Beklenmeyen bir hata oluştu.');
  }
}; 