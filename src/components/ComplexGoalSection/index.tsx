import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox, Subheading, Title, Text } from 'react-native-paper';

import { getGoalProgressString } from '../../helpers/tasks';
import { ComplexGoal } from '../../reducers/tasks';

interface SectionProps {
	data: ComplexGoal;
	onGoalUpdate: (data: ComplexGoal) => void;
}

const styles = StyleSheet.create({
	subtaskItem: {
		display: 'flex',
		flexDirection: 'row',
		alignContent: 'center',
		alignItems: 'center',
	},

	subtaskDone: {
		textDecorationLine: 'line-through',
		textDecorationStyle: 'solid',
	},

	paragraph: {
		paddingLeft: 10,
		paddingRight: 10,
	},
});

const ComplexGoalSection: React.FC<SectionProps> = ({ data, onGoalUpdate }) => {
	const toggleSubtaskDone = (i: number) => {
		const newData = { ...data };

		newData.objective[i] = {
			...newData.objective[i],
			done: !data.objective[i].done,
		};

		onGoalUpdate(newData);
	};

	return (
		<View>
			<View>
				<Title>Subtasks</Title>
				<View style={styles.paragraph}>
					<Subheading>{getGoalProgressString(data)}</Subheading>
					<View>
						{data.objective.map((subtask, i) => (
							<View style={styles.subtaskItem} key={i}>
								<Checkbox onPress={() => toggleSubtaskDone(i)} status={subtask.done ? 'checked' : 'unchecked'} />
								<Text style={subtask.done && styles.subtaskDone}>{subtask.name}</Text>
							</View>
						))}
					</View>
				</View>
			</View>
		</View>
	);
};

export default ComplexGoalSection;
