import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Checkbox, Subheading, Title, Text, Portal } from 'react-native-paper';

import { getTaskProgressString, getTaskSpentTime, hasComplexGoal, hasTimeGoal } from '../../helpers/tasks';
import { ComplexGoal, Goal, Task } from '../../reducers/tasks';
import SetValueModal from '../SetValueModal';

interface TaskStatsProps {
	data: Task;
	onGoalUpdate: (goalData: Goal) => void;
}

const styles = StyleSheet.create({
	sectionControls: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
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

	paragraph: {
		paddingLeft: 10,
		paddingRight: 10,
	},
});

const TaskStats: React.FC<TaskStatsProps> = ({ data, onGoalUpdate }) => {
	const [modalVisible, setModalVisible] = React.useState(false);
	const handleModalClose = React.useCallback(() => setModalVisible(false), []);
	const openModal = React.useCallback(() => setModalVisible(true), []);

	let handleModalSubmit;
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
		} else if (hasTimeGoal(data)) {
			goalSectionControls = (
				<View style={styles.sectionControls}>
					<Button mode="contained">Set manually</Button>
					<Button mode="contained">Run stopwatch</Button>
				</View>
			);
		} else {
			const biggerStep = Math.ceil(data.goal.objective as number / 8);
			goalSectionControls = (
				<View style={styles.sectionControls}>
					<Button mode="contained">Add 1</Button>
					{biggerStep > 1 && <Button mode="contained">Add {biggerStep}</Button>}
					<Button mode="contained" onPress={openModal}>Set manually</Button>
				</View>
			);
			// handleModalSubmit = () => onGoalUpdate()
		}
	}

	return (<View>
		{data.goal && (
			<View>
				<Title>Goal</Title>
				<View style={styles.paragraph}>
					<Subheading>{getTaskProgressString(data)}</Subheading>
					{goalSectionControls}
				</View>
			</View>
		)}
		{data.timeSpent && !hasTimeGoal(data) && (
			<View>
				<Title>Time spent</Title>
				<Subheading style={styles.paragraph}>You have {getTaskSpentTime(data)} doing this task.</Subheading>
				<View style={styles.sectionControls}>
					<Button mode="contained">Set manually</Button>
					<Button mode="contained">Run stopwatch</Button>
				</View>
			</View>
		)}
		<Portal>
			<SetValueModal
				visible={modalVisible}
				keyboardType="numeric"
				onClose={handleModalClose}
				onSubmit={handleModalSubmit}
			/>
		</Portal>
	</View>);
};

export default TaskStats;
