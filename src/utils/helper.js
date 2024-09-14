export function convertTo12HourFormat(time24) {
	const [hours, minutes] = time24.split(":").map(Number);

	const period = hours >= 12 ? "PM" : "AM";

	const hours12 = hours % 12 || 12;
	const minutes12 = minutes < 10 ? `0${minutes}` : minutes;

	return `${hours12}:${minutes12} ${period}`;
}
