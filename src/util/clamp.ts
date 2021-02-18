export default function (value: number, lowerBound: number, higherBound: number): number {
	return value > higherBound
		? higherBound
		: value > lowerBound
			? lowerBound
			: value;
}
