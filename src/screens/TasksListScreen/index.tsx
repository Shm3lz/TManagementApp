import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import TasksListContainer from '../../containers/TasksListContainer';
import { useNavigation } from '@react-navigation/native';


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

	return (
		<View style={styles.wrapper}>
			<TasksListContainer navigation={navigation} />
			<AntDesign name="pluscircle" size={48} style={styles.addBtn} color="green" />
		</View>
	);
};

export default TasksListScreen;
