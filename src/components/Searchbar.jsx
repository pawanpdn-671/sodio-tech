import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

const Searchbar = ({ onChange }) => {
	const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

	const [cityInput, setCityInput] = useState("");
	const [cities, setCities] = useState([]);
	const [showSearchSuggestion, setShowSearchSuggestion] = useState(false);
	const popupRef = useRef();
	const debounceInput = useDebounce(cityInput, 300);

	const fetchCities = async (input) => {
		try {
			const response = await fetch(
				`https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=10&appid=${apiKey}`,
			);
			const data = await response.json();
			setCities(data);
		} catch (error) {
			console.error("Error fetching cities:", error);
		}
	};

	useEffect(() => {
		if (cityInput.trim() === "") {
			setCities([]);
			return;
		} else {
			fetchCities(debounceInput);
		}
	}, [debounceInput]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			const popup = popupRef?.current;
			const input = document.getElementById("search-place");

			if (popup && !popup.contains(event.target) && event.target !== input) {
				setShowSearchSuggestion(false);
			}
		};

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	const handleCityClick = (lat, long) => {
		setCityInput("");
		onChange(lat, long);

		localStorage.setItem("clima-track-last-search", JSON.stringify({ lat, long }));
	};

	return (
		<div className="position-relative mx-auto custom-sm-container">
			<Search className="position-absolute search-icon top-50 translate-middle-y" />
			<input
				type="text"
				id="search-place"
				className="search-input"
				placeholder="Search and select location"
				value={cityInput}
				onFocus={() => setShowSearchSuggestion(true)}
				onChange={(e) => setCityInput(e.target.value)}
			/>

			{showSearchSuggestion && cities.length > 0 && (
				<ul ref={popupRef} className="position-absolute list-group">
					{cities?.map((city, index) => (
						<li
							className="cursor-pointer list-group-item"
							key={`${city.name}-${index + 1}`}
							onClick={() => handleCityClick(city.lat, city.lon)}>
							{city.name}, {city.country}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Searchbar;
