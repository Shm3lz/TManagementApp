import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface TodayButtonProps {
	onPress?: () => void;
}

const style = StyleSheet.create({
	btn: {
		borderRadius: 50,
	},
});

const TodayButton: React.FC<TodayButtonProps> = ({ onPress }) => {
	return (
		<Button mode="contained" style={style.btn} uppercase={false} onPress={onPress}>
			Today
		</Button>
	);
};


export default React.memo(TodayButton);
