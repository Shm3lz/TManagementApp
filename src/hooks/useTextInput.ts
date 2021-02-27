import React from 'react';

interface UseTextInput {
	text: string;
	checkErrors: () => void;
	bind: {
		defaultValue: string;
		onChangeText: (v: string) => void;
		error: boolean;
	}
}

export default function useTextInput(value = '', hasError?: (s: string) => boolean): UseTextInput {
	const [text, setText] = React.useState(value);
	const [error, setError] = React.useState(false);

	return {
		text,
		checkErrors: () => hasError && setError(hasError(text)),
		bind: {
			defaultValue: value,
			onChangeText: (newVal: string) => {
				setText(newVal);
				hasError && setError(hasError(text));
			},
			error,
		},
	};
}
