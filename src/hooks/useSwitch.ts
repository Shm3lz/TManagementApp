import React from 'react';

type SwitchHook = [boolean, () => void];

export default function useSwitch(value: boolean): SwitchHook {
	const [sw, setSwitch] = React.useState(value);

	return [
		sw,
		() => setSwitch(!sw),
	];
}
