import React from 'react';
import { Card, ProgressBar } from 'react-native-paper';
import { Task } from '../../reducers/tasks';
import { StyleSheet, View } from 'react-native';
import { countTasksDone, hasComplexGoal } from '../../helpers/tasks';

interface TaskCardProps {
	data: Task;
}

const style = StyleSheet.create({
	wrapper: {
		margin: 10,
	},
	disabled: {
		color: 'gray',
		textDecorationLine: 'line-through',
		textDecorationStyle: 'solid',
	},
	progressBar: {
		zIndex: 100,
	},
});

const TaskCard: React.FC<TaskCardProps> = ({ data })=> {
	const titleStyle = React.useMemo(() => ({ color: data.color }), [data.color]);

	let
		subtitle,
		progressBar;

	if (data.goal) {
		const { progress, unitName } = data.goal;

		const objective = Array.isArray(data.goal.objective) ? countTasksDone(data.goal.objective) : data.goal.objective;

		subtitle = `${progress} of ${objective} ${unitName}`;
		progressBar = <ProgressBar style={style.progressBar} progress={progress / objective} color={data.color}/>;
	}

	return (
		<View style={style.wrapper}>
			<Card elevation={10}>
				<Card.Title titleStyle={data.done ? style.disabled : titleStyle} title={data.name} subtitle={subtitle} />
				{data.goal && progressBar}
			</Card>
		</View>
	);
};

export default TaskCard;
