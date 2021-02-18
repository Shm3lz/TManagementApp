import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Subheading, Title, Button } from 'react-native-paper';

import { getTaskSpentTime } from '../../helpers/tasks';
import { Task } from '../../reducers/tasks';

interface SectionProps {
	data: Task;
}

const styles = StyleSheet.create({
	sectionControls: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 6,
	},

	paragraph: {
		paddingLeft: 10,
		paddingRight: 10,
	},
});

const SpentTimeSection: React.FC<SectionProps> = ({ data }) => {
	return (
		<View>
			<Title>Time spent</Title>
			<Subheading style={styles.paragraph}>You have {getTaskSpentTime(data)} doing this task.</Subheading>
			<View style={styles.sectionControls}>
				<Button mode="contained">Set manually</Button>
				<Button mode="contained">Run stopwatch</Button>
			</View>
		</View>
	);
};

export default SpentTimeSection;
