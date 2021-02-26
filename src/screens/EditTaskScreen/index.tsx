import * as React from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Route } from '@react-navigation/native';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';

import { Task, editTask, TaskInformation, editTemplate, RegularTaskTemplate } from '../../reducers/tasks';
import Routes from '../../routes';
import StackHeaderContainer from '../../containers/StackHeaderContainer';
import TaskForm from '../../components/TaskForm';
import { State } from '../../store';

interface EditTaskScreenProps {
	navigation: StackNavigationProp<{ [Routes.EditTask]: { id: string } }>;
	route: Route<Routes.EditTask, { id: string }>;
}

interface StateProps {
	task: Task;
	template?: RegularTaskTemplate;
}

interface DispatchProps {
	editTask: (id: string, info: TaskInformation) => void;
	editTemplate: (id: string, data: TaskInformation) => void;
}

const mapStateToProps: MapStateToProps<StateProps, EditTaskScreenProps, State> = (state, props) => {
	const { id } = props.route.params;
	const task = state.tasks.instances[id];
	const template = task.templateId ? state.tasks.templates[task.templateId] : undefined;

	return {
		task,
		template,
	};
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, EditTaskScreenProps> = (dispatch) => ({
	editTask: (id, data) => dispatch(editTask({ id, data })),
	editTemplate: (id, data) => dispatch(editTemplate({ id, data })),
});

const CreateTaskScreen: React.FC<EditTaskScreenProps & DispatchProps & StateProps> = ({ navigation, editTask, task, template }) => {
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
		editTask(task.id, info);
		navigation.goBack();
	};

	return (
		<View>
			<TaskForm initialValue={{ repeat: [], ...task, ...template }} onSubmit={handleSubmit}/>
		</View>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskScreen);
