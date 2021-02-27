import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Subheading, Title, Button } from 'react-native-paper';

import { getGoalProgressString } from '../../helpers/tasks';
import { TimeGoal } from '../../reducers/tasks';

interface SectionProps {
	data: TimeGoal;
	onSetManualPress?: () => void;
}

const styles = StyleSheet.create({
	sectionControls: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 6,
	},
});

const TimeGoalSection: React.FC<SectionProps> = ({ data, onSetManualPress }) => {
	return (
		<View>
			<Title>Time goal</Title>
			<View>
				<Subheading>{getGoalProgressString(data)}</Subheading>
				<View style={styles.sectionControls}>
					<Button mode="contained" onPress={onSetManualPress}>Set manually</Button>
					<Button mode="contained" disabled>Run stopwatch</Button>
				</View>
			</View>
		</View>
	);
};

export default TimeGoalSection;
