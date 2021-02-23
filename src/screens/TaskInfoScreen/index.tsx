import * as React from 'react';
import { Paragraph, Title } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { Route } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Routes from '../../routes';
import StackHeaderContainer from '../../containers/StackHeaderContainer';
import { Task, TaskInformation } from '../../reducers/tasks';
import { connect, MapStateToProps } from 'react-redux';
import { State } from '../../store';
import { MaterialIcons } from '@expo/vector-icons';
import GoalSectionContainer from '../../containers/GoalSectionContainer';
import { WeekDay } from '../../util/types';
import TimeSpentContainer from '../../containers/TimeSpentContainer';

interface TaskInfoScreenProps {
	navigation: StackNavigationProp<{ [Routes.TaskInfo]: { id: string } }>;
	route: Route<Routes.TaskInfo, { id: string }>;
}

interface StateProps {
	selectedTask: Task;
	repeat: WeekDay[],
}

const mapStateToProps: MapStateToProps<StateProps, TaskInfoScreenProps, State> = (state, props) => {
	const { id } = props.route.params;

	const task = state.tasks.instances[id];
	const repeat = task.templateId ?
		state.tasks.templates[task.templateId].repeat : [];

	return {
		selectedTask: task,
		repeat,
	};
};

const styles = StyleSheet.create({
	wrapper: {
		padding: 5,
		paddingLeft: 10,
	},

	paragraph: {
		paddingLeft: 10,
		paddingRight: 10,
	},

	alignTextCenter: {
		textAlign: 'center',
	},
});

const TaskInfoScreen: React.FC<TaskInfoScreenProps & StateProps> = ({ navigation, selectedTask, repeat }) => {
	React.useLayoutEffect(() => {
		navigation
			.dangerouslyGetParent()
			?.setOptions({
				header: props => <StackHeaderContainer {...props} />,
				headerTitle: selectedTask.name,
				headerRight: () => <><MaterialIcons name="edit" size={24} color="white" /><MaterialIcons name="delete" size={24} color="white" /></>,
			});
	}, [navigation, selectedTask.name]);

	return (
		<View style={styles.wrapper}>
			<Title>Description</Title>
			<Paragraph style={styles.paragraph}>{selectedTask.description || 'No description.'}</Paragraph>
			<GoalSectionContainer data={selectedTask} />
			{typeof selectedTask.timeSpent !== 'undefined' && <TimeSpentContainer data={selectedTask} />}
		</View>
	);
};

export default connect(mapStateToProps)(TaskInfoScreen);
