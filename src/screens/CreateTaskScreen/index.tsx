import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Route } from '@react-navigation/native';
import { connect, MapDispatchToProps } from 'react-redux';

import { addSingleTask, addRegularTask, TaskInformation } from '../../reducers/tasks';
import Routes from '../../routes';
import StackHeaderContainer from '../../containers/StackHeaderContainer';
import TaskForm from '../../components/TaskForm';
import { WeekDay } from '../../util/types';
import { Task } from '../../reducers/tasks';

interface CreateTaskScreenProps {
	navigation: StackNavigationProp<{ [Routes.CreateTask]: undefined }>;
	route: Route<Routes.CreateTask>;
}

interface DispatchProps {
	createTask: (info: TaskInformation) => void;
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, CreateTaskScreenProps> = (dispatch) => ({
	createTask: info => {
		if (info.repeat.length === 0) {
			dispatch(addSingleTask({
				id: String(Date.now()),
				...info,
				done: false,
			}));

			return;
		}

		dispatch(addRegularTask({
			id: String(Date.now()),
			...info,
			done: false,
		}));
	},
});

const styles = StyleSheet.create({
	wrapper: {
		padding: 15,
	},
});

const CreateTaskScreen: React.FC<CreateTaskScreenProps & DispatchProps> = ({ navigation, createTask }) => {
	React.useLayoutEffect(() => {
		navigation
			.dangerouslyGetParent()
			?.setOptions({
				header: props => <StackHeaderContainer {...props} />,
				headerTitle: 'Create task',
				headerRight: () => <></>,
			});
	}, [navigation]);

	const handleSubmit = (info: TaskInformation) => {
		createTask(info);
		navigation.goBack();
	};

	return (
		<View style={styles.wrapper}>
			<TaskForm onSubmit={handleSubmit}/>
		</View>
	);
};

export default connect(null, mapDispatchToProps)(CreateTaskScreen);
