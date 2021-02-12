import React from 'react';
import { Card, ProgressBar } from 'react-native-paper';
import { Task } from '../../reducers/tasks';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { getTaskProgress, getTaskProgressString } from '../../helpers/tasks';

interface TaskCardProps {
	data: Task;
	style?: StyleProp<ViewStyle>;
	onPress?: () => void;
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

const TaskCard: React.FC<TaskCardProps> = ({ data, style: wrapperStyle, onPress })=> {
	const titleStyle = React.useMemo(() => ({ color: data.color }), [data.color]);

	const subtitle = getTaskProgressString(data);
	const progressBar = React.useMemo(() => <ProgressBar
		style={style.progressBar}
		progress={Number(data.done) || data.goal && getTaskProgress(data.goal)}
		color={data.color}
	/>, [data.done, data.color, data.goal]);

	return (
		<Card onPress={onPress} style={wrapperStyle} elevation={10}>
			<Card.Title
				titleStyle={data.done ? style.disabled : titleStyle}
				title={data.name}
				subtitle={subtitle}
			/>
			{data.goal && progressBar}
		</Card>
	);
};

export default TaskCard;
