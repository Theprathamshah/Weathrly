import { WeatherlyAdapter } from "./adapters/WeatherlyAdapter";

export class WeatherService {
    private adapter: WeatherlyAdapter;

    constructor(adapter: WeatherlyAdapter) {
        this.adapter = adapter;
    }

    async getWeather(location: string) {
        console.log('Response will be shared soon...');
        return await this.adapter.getWeather(location);
        
    }
}