import axios from "axios";
import { WeatherlyAdapter } from "./WeatherlyAdapter";

export class WeatherStackAdapter implements WeatherlyAdapter {
    private apiKey: string;
    private apiUrl = "http://api.weatherstack.com/current";

    constructor(apiKey: string) {
        console.log('Weather stack adapter called');
        
        this.apiKey = apiKey;
    }

    async getWeather(location: string) {
    console.log(`location is ${location}`);
    
    const response = await axios.get(this.apiUrl, {
        params: {
            access_key: this.apiKey,
            query: location,
        },
    });
    
    const { temperature, wind_speed } = response.data.current;
    return {
        temperature,
        windSpeed: wind_speed,
    };
    }
}