import * as React from 'react';
import { Paragraph, Title } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { Route } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Routes from '../../routes';
import StackHeaderContainer from '../../containers/StackHeaderContainer';
import { Task } from '../../reducers/tasks';
import { connect, MapStateToProps } from 'react-redux';
import { State } from '../../store';
import { MaterialIcons } from '@expo/vector-icons';
import GoalSectionContainer from '../../containers/GoalSectionContainer';

interface TaskInfoScreenProps {
	navigation: StackNavigationProp<{ [Routes.TaskInfo]: { id: string } }>;
	route: Route<Routes.TaskInfo, { id: string }>;
}

interface StateProps {
	selectedTask: Task;
}

const mapStateToProps: MapStateToProps<StateProps, TaskInfoScreenProps, State> = (state, props) => {
	const { id } = props.route.params;

	return {
		selectedTask: state.tasks.instances[id],
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

const TaskInfoScreen: React.FC<TaskInfoScreenProps & StateProps> = ({ navigation, selectedTask }) => {
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
			<Title>Type</Title>
			<Paragraph style={styles.paragraph}>{selectedTask.templateId ? 'Regular task' : 'Single task'}</Paragraph>
			<Title>Description</Title>
			<Paragraph style={styles.paragraph}>{selectedTask.description || 'No description.'}</Paragraph>
			<GoalSectionContainer data={selectedTask} />
		</View>
	);
};

export default connect(mapStateToProps)(TaskInfoScreen);
