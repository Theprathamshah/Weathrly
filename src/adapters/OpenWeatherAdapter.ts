import axios from 'axios';
import { WeatherlyAdapter } from './WeatherlyAdapter';

export class OpenWeatherAdapter implements WeatherlyAdapter {
    private apiKey: string;
    private apiUrl = `https://api.openweathermap.org/data/2.5/weather`
    constructor(apiKey: string) {
        console.log('Open weather adapter used');
        
        this.apiKey = apiKey;
    }
    
    
    async getWeather(location: string) {
        console.log(`location is ${location}`);
        
        const response = await axios.get(this.apiUrl, {
        params: {
            q: location,
            appid: this.apiKey,
            units: "metric",
            },
        });

        console.log('response data is : ',response.data);
        
    
        const { main, wind } = response.data;
        return {
            temperature: main.temp,
            windSpeed: wind.speed,
        };
    }
}