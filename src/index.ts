import dotenv from 'dotenv'
import express, {Express, Request, Response} from 'express'
import { OpenWeatherAdapter } from './adapters/OpenWeatherAdapter';
import { WeatherStackAdapter } from './adapters/WeatherStackAdapter';
import { WeatherService } from './WeatherService';
import { WeatherBitAdapter } from './adapters/WeaterBitAdapter';

dotenv.config();

const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;
const weatherStackApiKey = process.env.WEATHER_STACK_API_KEY;
const weatherBitApiKey = process.env.WEATHER_BIT_API_KEY;
const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (_req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/weather", async (req: Request, res: Response): Promise<any> => {
  const location = req.query.location;
  const platform = req.query.platform;

  if (!location) {
    return res.status(400).json({ error: "Location query parameter is required" });
  }

  try {
    let result;

    switch (platform) {
      case "weather-stack":
        console.log("In weather-stack switch case");
        const adapter2 = new WeatherStackAdapter(weatherStackApiKey as string);
        const weatherService2 = new WeatherService(adapter2);
        result = await weatherService2.getWeather(location as string);
        break;
      
      case 'weather-bit':
        console.log("In weather-bit switch case");
        const weatherBitAdapter = new WeatherBitAdapter(weatherBitApiKey as string)
        const weatherService3 = new WeatherService(weatherBitAdapter);
        result = await weatherService3.getWeather(location as string);
        break;

      default:
        console.log("In open weather switch case");
        const adapter = new OpenWeatherAdapter(openWeatherApiKey as string);
        const weatherService = new WeatherService(adapter);
        result = await weatherService.getWeather(location as string);
        break;
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.get("/", async (req: Request, res: Response): Promise<any> => {
  res.send("Welcome to Weatherly Application")
})
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

