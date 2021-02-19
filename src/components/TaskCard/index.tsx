import React from 'react';
import { Card, ProgressBar } from 'react-native-paper';
import { Task } from '../../reducers/tasks';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { getTaskPercentage, getTaskSubtitle } from '../../helpers/tasks';

interface TaskCardProps {
	data: Task;
	style?: StyleProp<ViewStyle>;
	onPress?: () => void;
}

const style = StyleSheet.create({
	disabled: {
		color: 'gray',
		textDecorationLine: 'line-through',
		textDecorationStyle: 'solid',
	},
	subtitle: {
		marginBottom: 5,
		marginLeft: 7,
	},
});

const TaskCard: React.FC<TaskCardProps> = ({ data, style: wrapperStyle, onPress })=> {
	const titleStyle = React.useMemo(() => ({ color: data.color, paddingRight: 10 }), [data.color]);
	const progressBar = React.useMemo(() => <ProgressBar
		progress={Number(data.done) || getTaskPercentage(data)}
		color={data.color}
	/>, [data]);

	return (
		<Card onPress={onPress} style={wrapperStyle} elevation={10}>
			<Card.Title
				titleStyle={data.done ? style.disabled : titleStyle}
				title={data.name}
				subtitleStyle={style.subtitle}
				subtitle={getTaskSubtitle(data)}
				subtitleNumberOfLines={2}
			/>
			{(data.goal || data.subtasks) && progressBar}
		</Card>
	);
};

export default TaskCard;
