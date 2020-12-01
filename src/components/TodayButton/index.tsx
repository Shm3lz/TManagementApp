import React from 'react';
import { Button, withTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface TodayButtonProps {
	onPress?: () => void;
	theme: ReactNativePaper.Theme;
}

const style = StyleSheet.create({
	btn: {
		borderRadius: 50,
	},
});

const TodayButton: React.FC<TodayButtonProps> = ({ onPress, theme }) => {
	const todayButtonTheme = {
		colors: {
			primary: theme.colors.surface,
		},
	};

	return (
		<Button
			style={style.btn}
			mode="contained"
			uppercase={false}
			onPress={onPress}
			theme={todayButtonTheme}
		>
			Today
		</Button>
	);
};


export default React.memo(withTheme(TodayButton));
