import * as React from 'react';
import { Button, Dialog, Paragraph, Surface, Title } from 'react-native-paper';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Route } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Routes from '../../routes';
import StackHeaderContainer from '../../containers/StackHeaderContainer';
import { deleteTask, Task } from '../../reducers/tasks';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { State } from '../../store';
import { MaterialIcons } from '@expo/vector-icons';
import GoalSectionContainer from '../../containers/GoalSectionContainer';
import { WeekDay } from '../../util/types';
import TimeSpentContainer from '../../containers/TimeSpentContainer';
import SimpleChip from '../../components/SimpleChip';
import { getWeekDayName, WEEK_DAYS } from '../../helpers/time';
import { TasksNavigationParams } from '../TasksScreen';

interface TaskInfoScreenProps {
	navigation: StackNavigationProp<TasksNavigationParams>;
	route: Route<Routes.TaskInfo, { id: string }>;
}

interface StateProps {
	selectedTask?: Task;
	repeat: WeekDay[],
}

interface DispatchProps {
	deleteTask: (id: string) => void;
}

const mapStateToProps: MapStateToProps<StateProps, TaskInfoScreenProps, State> = (state, props) => {
	const { id } = props.route.params;

	const task = state.tasks.instances[id];
	const repeat = task?.templateId ?
		state.tasks.templates[task.templateId].repeat : [];

	return {
		selectedTask: task,
		repeat,
	};
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, unknown> = dispatch => ({
	deleteTask: id => dispatch(deleteTask(id)),
});

const styles = StyleSheet.create({
	section: {
		elevation: 3,
		padding: 10,
		borderRadius: 10,
		marginBottom: 15,
		marginHorizontal: 3,
	},
	repeatDays: {
		marginTop: 10,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
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

const TaskInfoScreen: React.FC<TaskInfoScreenProps & StateProps & DispatchProps> = ({
	navigation,
	selectedTask,
	repeat,
	deleteTask,
}) => {
	const handleDeleteBtnClick = React.useCallback(() => {
		navigation.goBack();
		if (selectedTask) {
			deleteTask(selectedTask.id);
		}
	}, [navigation, selectedTask, deleteTask]);

	const handleEditBtnClick = React.useCallback(() => {
		if (!selectedTask) return;

		navigation.navigate(Routes.EditTask, { id: selectedTask.id });
	}, [navigation, selectedTask]);

	React.useLayoutEffect(() => {
		navigation
			.dangerouslyGetParent()
			?.setOptions({
				header: props => <StackHeaderContainer {...props} />,
				headerTitle: selectedTask?.name,
				headerRight: () => (
					<>
						<MaterialIcons onPress={handleEditBtnClick} name="edit" size={24} color="white" />
						<MaterialIcons onPress={handleDeleteBtnClick} name="delete" size={24} color="white" />
					</>
				),
			});
	}, [navigation, selectedTask?.name, deleteTask, selectedTask?.id, handleDeleteBtnClick, handleEditBtnClick]);

	if (!selectedTask) {
		return <></>;
	}

	return (
		<ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
			<Surface style={styles.section}>
				<Title>Description</Title>
				<Paragraph style={styles.paragraph}>{selectedTask.description || 'No description.'}</Paragraph>
			</Surface>
			<Surface style={styles.section}>
				<GoalSectionContainer data={selectedTask} />
			</Surface>
			{typeof selectedTask.timeSpent !== 'undefined' &&
				<Surface style={styles.section}>
					<TimeSpentContainer data={selectedTask} />
				</Surface>
			}
			{repeat.length > 0 &&
				<Surface style={styles.section}>
					<Title>Repeat</Title>
					<View style={styles.repeatDays}>
						{Object.keys(WEEK_DAYS).map((day, i) => (
							<SimpleChip
								checked={repeat.includes(parseInt(day))}
								key={i}
								text={getWeekDayName(parseInt(day)).substr(0, 2)}
							/>
						))}
					</View>
				</Surface>
			}
			<Dialog visible={false}>
				<Dialog.Content>
					Are you sure?
				</Dialog.Content>
				<Dialog.Actions>
					<Button>Ok</Button>
					<Button>Cancel</Button>
				</Dialog.Actions>
			</Dialog>
		</ScrollView>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskInfoScreen);
