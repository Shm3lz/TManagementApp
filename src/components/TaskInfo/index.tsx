import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Paragraph, Subheading, Text, Title, Button, Checkbox } from 'react-native-paper';
import { getTaskProgressString, hasComplexGoal } from '../../helpers/tasks';
import { ComplexGoal, Task } from '../../reducers/tasks';

interface TaskInfoProps {
	data: Task;
}

const styles = StyleSheet.create({
	wrapper: {
		padding: 5,
		paddingLeft: 10,
	},

	paragraph: {
		paddingLeft: 10,
		paddingRight: 10,
	},

	goalSectionControl: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 6,
	},

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
});

const TaskInfo: React.FC<TaskInfoProps> = ({ data }) => {
	let goalSectionControls;

	if (data.goal) {
		if (hasComplexGoal(data)) {
			goalSectionControls = (
				<View>
					{(data.goal as ComplexGoal).objective.map((subtask, i) => (
						<View style={styles.subtaskItem} key={i}>
							<Checkbox status={subtask.done ? 'checked' : 'unchecked'} />
							<Text style={subtask.done && styles.subtaskDone}>{subtask.name}</Text>
						</View>
					))}
				</View>
			);
		} else {
			const biggerStep = Math.ceil(data.goal.objective as number / 8);
			goalSectionControls = (
				<View style={styles.goalSectionControl}>
					<Button mode="contained">Add 1</Button>
					{biggerStep > 1 && <Button mode="contained">Add {biggerStep}</Button>}
					<Button mode="contained">Set manually</Button>
					{/* <Portal><Modal visible={true}><Title>Set</Title><TextInput /></Modal></Portal> */}
				</View>
			);
		}
	}

	return (
		<View style={styles.wrapper}>
			<Title>Description</Title>
			<Paragraph style={styles.paragraph}>{data.description || 'No description.'}</Paragraph>
			{data.goal && (
				<>
					<Title>Goal</Title>
					<View style={styles.paragraph}>
						<Subheading>{getTaskProgressString(data)}</Subheading>
						{goalSectionControls}
					</View>
				</>
			)}
		</View>
	);
};

export default TaskInfo;
