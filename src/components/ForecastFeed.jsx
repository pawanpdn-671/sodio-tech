import { useEffect, useState } from "react";
import ForecastFeedCard from "./ForecastFeedCard";

const ForecastFeed = ({ coordinates }) => {
	const [loading, setLoading] = useState(true);
	const [forecastData, setForecastData] = useState([]);

	const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

	const fetchWeatherForecast = async () => {
		setLoading(true);
		try {
			const res = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.long}&appid=${apiKey}&units=metric`,
			);
			const data = await res.json();
			setForecastData(data?.list);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (coordinates?.lat && coordinates?.long) {
			fetchWeatherForecast();
		}
	}, [coordinates]);

	return (
		<div>
			<div>
				<h2 className="fs-3 fw-bold">Weather Forecast</h2>
			</div>
			<div className="mt-4">
				{loading ? (
					<ForecastFeed.Skeleton />
				) : forecastData?.length > 0 ? (
					<div className="d-flex overflow-x-auto gap-4 hide-scroll">
						{forecastData?.map((item, i) => (
							<ForecastFeedCard data={item} key={i} />
						))}
					</div>
				) : (
					<p className="text-center fs-5 fw-medium text-danger">No Weather Forecast Data Found</p>
				)}
			</div>
		</div>
	);
};

export default ForecastFeed;

ForecastFeed.Skeleton = function ForecastFeedSkeletonList() {
	return (
		<div className="w-100 d-flex gap-4">
			<div className="skeleton-loader empty-card-lg"></div>
			<div className="skeleton-loader empty-card-lg"></div>
			<div className="skeleton-loader empty-card-lg"></div>
			<div className="skeleton-loader empty-card-lg"></div>
		</div>
	);
};
