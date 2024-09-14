import { useEffect, useState } from "react";
import Searchbar from "./components/Searchbar";
import WeatherCard from "./components/WeatherCard";
import ForecastFeed from "./components/ForecastFeed";

function App() {
	const [coordinates, setCoordinates] = useState({
		lat: null,
		long: null,
	});
	const [weatherData, setWeatherData] = useState({});
	const [loading, setLoading] = useState(true);

	const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

	const fetchWeatherData = async () => {
		setLoading(true);
		try {
			const res = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.long}&appid=${apiKey}&units=metric`,
			);
			const data = await res.json();
			setWeatherData(data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const fetchData = async () => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;

				setCoordinates({
					lat: latitude,
					long: longitude,
				});
				setLoading(false);
			},
			(err) => {
				console.log(err);
				setLoading(false);
			},
		);
	};

	useEffect(() => {
		const storedCoords = localStorage.getItem("clima-track-last-search");
		if (storedCoords) {
			const { lat, long } = JSON.parse(storedCoords);
			setCoordinates({ lat: lat, long: long });
		} else {
			fetchData();
		}
	}, []);

	useEffect(() => {
		if (coordinates.lat && coordinates.long) {
			setLoading(true);
			fetchWeatherData();
		}
	}, [coordinates]);

	return (
		<main className="min-vh-100 pb-5">
			<div className="app-bg">
				<div className="app-inner-bg" />
			</div>

			<div className=" mx-auto px-3">
				<header className="py-4 text-center">
					<h1 className="fs-3 fw-bold app-title">ClimaTrack</h1>
				</header>
				<section className="pt-2">
					<Searchbar onChange={(lat, long) => setCoordinates({ lat: lat, long: long })} />
				</section>
				<div className="mt-5 custom-sm-container mx-auto">
					{loading ? (
						<App.WeatherCardSkeleton />
					) : Object.keys(weatherData).length > 0 ? (
						<WeatherCard data={weatherData} coordinates={coordinates} />
					) : (
						<p className="text-center fs-4 fw-medium lh-sm">
							No Weather Information. <br />
							<span className="fs-6 fw-normal ">
								Allow app to access location or search and select a location to view the weather information.
							</span>
						</p>
					)}
				</div>
			</div>
			<div className="mt-5 px-3 custom-md-container mx-auto">
				{Object.keys(weatherData).length > 0 && <ForecastFeed coordinates={coordinates} />}
			</div>
		</main>
	);
}

export default App;

App.WeatherCardSkeleton = function WeatherCardSkeleton() {
	return (
		<div className="w-100 d-flex justify-content-between">
			<div className="skeleton-loader empty-card w-50"></div>
			<div className="skeleton-loader empty-card w-25"></div>
		</div>
	);
};
