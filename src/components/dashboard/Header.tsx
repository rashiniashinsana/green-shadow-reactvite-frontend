import { useEffect, useState } from "react";
import axios from "axios";

const DashboardHeader = () => {
    const [greeting, setGreeting] = useState("🌅 Good Morning!");
    const [weatherText, setWeatherText] = useState("Fetching weather...");
    const [weatherEmoji, setWeatherEmoji] = useState("☀️");

    const fetchWeather = async () => {
        try {
            const { latitude, longitude } = { latitude: 6.9271, longitude: 79.8612 };
            const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

            const response = await axios.get(apiUrl);
            const data = response.data.current_weather;
            const temp = Math.round(data.temperature);
            const weatherCode = data.weathercode;

            setWeatherEmoji(getWeatherEmoji(weatherCode));
            setWeatherText(`${weatherEmoji} ${temp}° | ${getWeatherDescription(weatherCode)}`);
        } catch (error) {
            console.error("Failed to fetch weather data", error);
            setWeatherText("❌ Unable to fetch weather");
        }
    };

    const getWeatherDescription = (weatherCode: number) => {
        const descriptions: { [key: number]: string } = {
            0: "Clear Sky ☀️", 1: "Sunny ☀️", 2: "Partly Cloudy ⛅",
            3: "Overcast ☁️", 45: "Foggy 🌫️", 48: "Foggy 🌫️",
            51: "Light Drizzle 🌦️", 53: "Drizzle 🌦️", 55: "Heavy Drizzle 🌦️",
            61: "Light Rain 🌧️", 63: "Rain 🌧️", 65: "Heavy Rain 🌧️",
            71: "Light Snow ❄️", 73: "Snowfall ❄️", 75: "Heavy Snowfall ❄️",
            80: "Heavy Showers 🌧️", 95: "Thunderstorm ⛈️", 96: "Stormy ⛈️", 99: "Severe Storm ⛈️"
        };
        return descriptions[weatherCode] || "🌈 Unknown Weather";
    };

    const getWeatherEmoji = (weatherCode: number) => {
        const emojis: { [key: number]: string } = {
            0: "☀️", 1: "☀️", 2: "⛅", 3: "☁️", 45: "🌫️", 48: "🌫️",
            51: "🌦️", 53: "🌦️", 55: "🌦️", 61: "🌧️", 63: "🌧️", 65: "🌧️",
            71: "❄️", 73: "❄️", 75: "❄️", 80: "🌧️", 95: "⛈️", 96: "⛈️", 99: "⛈️"
        };
        return emojis[weatherCode] || "🌈";
    };

    const updateGreeting = () => {
        const hours = new Date().getHours();
        let emoji = "🌅";
        let message = "Good Morning!";

        if (hours >= 12 && hours < 17) {
            emoji = "☀️"; message = "Good Afternoon!";
        } else if (hours >= 17 && hours < 21) {
            emoji = "🌆"; message = "Good Evening!";
        } else {
            emoji = "🌙"; message = "Good Night!";
        }

        setGreeting(`${emoji} ${message}`);
    };

    useEffect(() => {
        updateGreeting();
        fetchWeather();
    }, []);

    return (
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 mb-6">
            <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1">
                    {greeting}
                </h1>
                <p className="text-white-200 text-xs sm:text-sm lg:text-base">
                    🌾 Optimize Your Crop Monitoring with Real-Time Insights
                </p>
            </div>
            <div className="flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
                <span className="mr-2 text-2xl sm:text-xl lg:text-2xl">
                    {weatherEmoji}
                </span>
                <p className="font-medium text-xs sm:text-sm lg:text-base">
                    {weatherText}
                </p>
            </div>
        </header>
    );
};

export default DashboardHeader;
