import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import TasksListContainer from '../../containers/TasksListContainer';
import { useNavigation } from '@react-navigation/native';
import Routes from '../../routes';
import { FAB } from 'react-native-paper';

const styles = StyleSheet.create({
	addBtn: {
		position: 'absolute',
		bottom: '5%',
		right: '5%',
	},
	wrapper: {
		flex: 1,
	},
});

const TasksListScreen: React.FC = () => {
	const navigation = useNavigation();

	const openTaskInfo = React.useCallback((id: string) =>
		navigation.navigate(Routes.TaskInfo, { id }), [navigation]);

	return (
		<View style={styles.wrapper}>
			<TasksListContainer openTaskInfo={openTaskInfo} />
			<FAB style={styles.addBtn} icon="plus" />
		</View>
	);
};

export default TasksListScreen;
