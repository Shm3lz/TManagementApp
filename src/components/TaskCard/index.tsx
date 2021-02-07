import React from 'react';
import { Card, ProgressBar } from 'react-native-paper';
import { Task } from '../../reducers/tasks';
import { StyleSheet, View } from 'react-native';
import { countTasksDone, getTaskProgress, getTaskProgressString, hasComplexGoal } from '../../helpers/tasks';

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

	const subtitle = getTaskProgressString(data);
	const progressBar = <ProgressBar style={style.progressBar} progress={+data.done || data.goal && getTaskProgress(data.goal)} color={data.color}/>;

	return (
		<View style={style.wrapper}>
			<Card elevation={10}>
				<Card.Title
					titleStyle={data.done ? style.disabled : titleStyle}
					title={data.name}
					subtitle={subtitle}
				/>
				{data.goal && progressBar}
			</Card>
		</View>
	);
};

export default TaskCard;
