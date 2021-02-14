import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Checkbox, Subheading, Title, Text } from 'react-native-paper';

import { getTaskProgressString, getTaskSpentTime, hasComplexGoal, hasTimeGoal } from '../../helpers/tasks';
import { ComplexGoal, Task } from '../../reducers/tasks';

interface TaskStatsProps {
	data: Task;
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
