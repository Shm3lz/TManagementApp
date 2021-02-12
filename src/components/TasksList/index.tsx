import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';

import TaskCard from '../TaskCard';
import { Task } from '../../reducers/tasks';

interface TasksListProps {
	tasks: Task[];
	onTaskDone: (id: string) => void;
	onTaskUndone: (id: string) => void;
	onCardPress: (id: string) => void;
}

const margin = 10;

const style = StyleSheet.create({
	swipeRow: {
		margin,
	},
});

const TasksList: React.FC<TasksListProps> = ({ tasks, onTaskDone, onTaskUndone, onCardPress }) => {
	return (
		<View>
			{tasks.map((data, i) => (
				<SwipeRow
					style={style.swipeRow}
					key={`${data.id}${i}`}
					// onSwipeValueChange={swipeData => {
					// 	const width = Dimensions.get('window').width;

					// 	if (Math.abs(swipeData.value) >= width) {
					// 		console.log(true);
					// 		data.done ? onTaskUndone(data.id) : onTaskDone(data.id);
					// 	}
					// }}
					disableLeftSwipe={data.done}
					disableRightSwipe={!data.done}
					rightOpenValue={-Dimensions.get('window').width}
					// leftOpenValue={Dimensions.get('window').width}
					useNativeDriver={false}
					// swipeToClosePercent={50}
					swipeToOpenPercent={50}
					onRowDidOpen={() => onTaskDone(data.id)}
				>
					<View></View>
					<TaskCard onPress={onCardPress.bind(null, data.id)}data={data} />
				</SwipeRow>
			))}
		</View>
	);
};

export default TasksList;
