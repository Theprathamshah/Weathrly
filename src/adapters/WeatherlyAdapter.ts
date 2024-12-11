export interface WeatherlyAdapter {
    getWeather(location: string): Promise<{
        temperature: number;
        windSpeed: number;
        [key: string]: any;
    }>;
}