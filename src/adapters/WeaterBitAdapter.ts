import axios from "axios";
import { WeatherlyAdapter } from "./WeatherlyAdapter";

export class WeatherBitAdapter implements WeatherlyAdapter {
    private apiKey: string;
    private apiUrl = 'https://api.weatherbit.io/v2.0/current';
    constructor(apiKey: string) {
        console.log('Weahter Bit api is called')
        this.apiKey = apiKey;
    }
    async getWeather(location: string) {
        console.log(`location is ${location}`);
        
        const response = await axios.get(this.apiUrl, {
            params: {
                key: this.apiKey,
                city: location,
            },
        });
        
        const { temp, wind_spd } = response.data.data[0];
        return {
            temperature:temp,
            windSpeed: wind_spd,
        };
    }
}