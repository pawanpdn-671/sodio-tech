import { convertTo12HourFormat } from "../utils/helper";
import TempInfo from "./TempInfo";

const ForecastFeedCard = ({ data }) => {
	const temp = data?.main?.temp;
	const weatherInfo = data?.weather[0];
	const weatherIcon = `http://openweathermap.org/img/w/${data?.weather[0]?.icon}.png`;
	const minTemp = data?.main?.temp_min ?? 0;
	const maxTemp = data?.main?.temp_max ?? 0;

	const time = convertTo12HourFormat(data?.dt_txt?.split(" ")[1]) ?? "n/a";
	const date = data?.dt_txt?.split(" ")[0] ?? "n/a";

	return (
		<div className="forecast-card">
			<h4 className="fs-6 text-center">{date}</h4>
			<div className="mt-3">
				<div className="d-flex gap-2 justify-content-between">
					<TempInfo value={temp} size={"fs-3 fw-semibold"} />
					<span>{time}</span>
				</div>
				<div className="mt-2 weather-info-type text-center fw-light">
					{weatherInfo?.main}
					{weatherIcon && <img src={weatherIcon} alt="Icon depicting current weather" className="weather-icon" />}
				</div>
			</div>
			<div className="d-flex gap-5 justify-content-between mt-4">
				<div>
					<span className="fs-6 fw-light text-warning">Min</span>
					<TempInfo value={minTemp} size={"fs-4 fw-semibold"} />
				</div>
				<div>
					<span className="fs-6 fw-light text-danger">Max</span>
					<TempInfo value={maxTemp} size={"fs-4 fw-semibold"} />
				</div>
			</div>
		</div>
	);
};

export default ForecastFeedCard;
