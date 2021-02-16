import React from 'react';
import { connect, MapDispatchToProps } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Paragraph, Title } from 'react-native-paper';

import TaskStats from '../../components/TaskStats';
import { editTask, Goal, Task } from '../../reducers/tasks';

interface OwnProps {
	data: Task;
}

interface DispatchProps {
	updateTaskGoal: (id: string, goalData: Goal) => void;
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
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch) => ({
	updateTaskGoal: (id, goalData) => dispatch(editTask({ id, data: { goal: goalData }})),
});

const TaskInfo: React.FC<DispatchProps & OwnProps> = ({ updateTaskGoal, data }) => {
	const handleTaskGoalUpdate = React.useCallback(
		(goalData: Goal) => updateTaskGoal(data.id, goalData), [data.id, updateTaskGoal],
	);

	return (
		<View style={styles.wrapper}>
			<Title>Type</Title>
			<Paragraph style={styles.paragraph}>{data.templateId ? 'Regular task' : 'Single task'}</Paragraph>
			<Title>Description</Title>
			<Paragraph style={styles.paragraph}>{data.description || 'No description.'}</Paragraph>
			<TaskStats onGoalUpdate={handleTaskGoalUpdate} data={data} />
		</View>
	);
};

export default connect(null, mapDispatchToProps)(TaskInfo);
