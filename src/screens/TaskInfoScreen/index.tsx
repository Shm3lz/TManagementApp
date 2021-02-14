import * as React from 'react';
import { Title } from 'react-native-paper';
import { View } from 'react-native';
import { Route } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import TaskInfo from '../../components/TaskInfo';
import Routes from '../../routes';
import StackHeaderContainer from '../../containers/StackHeaderContainer';
import { Task } from '../../reducers/tasks';
import { connect, MapStateToProps } from 'react-redux';
import { State } from '../../store';
import { MaterialIcons } from '@expo/vector-icons';

interface TaskInfoScreenProps {
	navigation: StackNavigationProp<{ [Routes.TaskInfo]: { id: string }}>;
	route: Route<Routes.TaskInfo, { id: string}>;
}

interface StateProps {
	selectedTask: Task & { templateId?: string; };
}

const mapStateToProps: MapStateToProps<StateProps, TaskInfoScreenProps, State> = (state, props) => {
	const { id } = props.route.params;

	return {
		selectedTask: state.tasks.instances[id],
	};
};

const TaskInfoScreen: React.FC<TaskInfoScreenProps & StateProps> = ({ navigation, selectedTask }) => {
	React.useLayoutEffect(() => {
		navigation
			.dangerouslyGetParent()
			?.setOptions({
				header: props => <StackHeaderContainer footerWidget={<Title style={{ textAlign: 'center'}}>{selectedTask.name}</Title>} {...props} />,
				headerTitle: '',
				headerRight: () => <><MaterialIcons name="edit" size={24} color="white" /><MaterialIcons name="delete" size={24} color="white" /></>,
			});
	}, [navigation, selectedTask.name]);

	return (
		<View>
			<TaskInfo data={selectedTask} />
		</View>
	);
};

export default connect(mapStateToProps)(TaskInfoScreen);
