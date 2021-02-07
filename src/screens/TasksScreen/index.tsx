import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import TasksListContainer from '../../containers/TasksListContainer';
import Routes from '../../routes';
import { ScreenNavigationProp } from '../../containers/Navigator';

interface TasksScreen {
	navigation: ScreenNavigationProp<Routes.Main>
}

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

const TasksScreen: React.FC = () => {
	return (
		<View style={styles.wrapper}>
			<TasksListContainer />
			<AntDesign name="pluscircle" size={48} style={styles.addBtn} color="green" />
		</View>
	);
};

export default TasksScreen;
