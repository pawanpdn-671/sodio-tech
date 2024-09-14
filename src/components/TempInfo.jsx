import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

const TempInfo = ({ value, size }) => {
	const [isCelsius, setIsCelsius] = useState(true);
	const [temperature, setTemperature] = useState(0);

	const convertToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

	const toggleTemperatureUnit = () => {
		if (isCelsius) {
			setTemperature(convertToFahrenheit(temperature));
		} else {
			setTemperature(parseInt(value));
		}
		setIsCelsius(!isCelsius);
	};

	useEffect(() => {
		setTemperature(parseInt(value));
	}, [value]);

	return (
		<div className="d-flex gap-2">
			<h2 className={`${size ? size : "fs-1 fw-bolder"}`}>
				{Math.round(temperature ?? 0)}
				{isCelsius ? "°C" : "°F"}
			</h2>
			<RefreshCcw
				onClick={toggleTemperatureUnit}
				className={`cursor-pointer ${size ? "toggle-temp-icon-sm" : "toggle-temp-icon"}`}
			/>
		</div>
	);
};

export default TempInfo;
