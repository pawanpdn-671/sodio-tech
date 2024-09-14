import { Droplets, Wind } from "lucide-react";
import { countryCodes } from "../utils/constants";
import TempInfo from "./TempInfo";

const WeatherCard = ({ data }) => {
	const cityname = data?.name ?? "";
	const countryname = (countryCodes.find((country) => country.code === data?.sys?.country) || {})?.name || "";
	const temp = data?.main?.temp;
	const weatherInfo = data?.weather[0];
	const weatherIcon = `http://openweathermap.org/img/w/${data?.weather[0]?.icon}.png`;
	const weatherDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(
		new Date(data.dt * 1000),
	);

	return (
		<div className="weather-container">
			<div className="weather-info">
				<div className="d-flex flex-column">
					<span className="weather-date">{weatherDate}</span>
					<span className="city-country">
						{cityname}, {countryname}
					</span>
					<div className="mt-2 d-flex weather-other-details">
						<span className="d-flex align-items-center gap-1">
							<Wind />
							{data?.wind?.speed ?? "0"} m/s
						</span>
						<span className="d-flex align-items-center gap-1">
							<Droplets />
							{data?.main?.humidity ?? "0"}%
						</span>
					</div>
				</div>
				<div className="d-flex flex-column align-items-end">
					<TempInfo value={temp} />
					<div className="weather-info-type">
						{weatherInfo?.main}
						{weatherIcon && (
							<img src={weatherIcon} alt="Icon depicting current weather" className="weather-icon" />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default WeatherCard;
