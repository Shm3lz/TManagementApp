import * as React from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Route } from '@react-navigation/native';
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux';

import { addSingleTask, addRegularTask, TaskInformation } from '../../reducers/tasks';
import Routes from '../../routes';
import StackHeaderContainer from '../../containers/StackHeaderContainer';
import TaskForm from '../../components/TaskForm';
import { State } from '../../store';

interface CreateTaskScreenProps {
	navigation: StackNavigationProp<{ [Routes.CreateTask]: undefined }>;
	route: Route<Routes.CreateTask>;
}

interface DispatchProps {
	createTask: (info: TaskInformation) => void;
}

interface StateProps {
	chosenDate: Date;
}

const mapStateToProps: MapStateToPropsParam<StateProps, unknown, State> = ({ chosenDate }) => ({ chosenDate });

const mapDispatchToProps: MapDispatchToProps<DispatchProps, CreateTaskScreenProps> = dispatch => ({
	createTask: info => {
		if (info.repeat.length < 1) {
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
		}));
	},
});

const CreateTaskScreen: React.FC<CreateTaskScreenProps & DispatchProps & StateProps> = ({ navigation, createTask, chosenDate }) => {
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
		info.date = chosenDate;
		createTask(info);
		navigation.goBack();
	};

	return (
		<View>
			<TaskForm onSubmit={handleSubmit}/>
		</View>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskScreen);
