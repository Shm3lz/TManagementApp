import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

import { State } from '../../store';
import { setTaskDone, Task } from '../../reducers/tasks';
import { getRegularTasksByDate, getSingleTasksByDate } from '../../selectors/tasks';
import TasksList from '../../components/TasksList';
import { NavigationProp } from '@react-navigation/native';
import Routes from '../../routes';

interface StateProps {
	tasks: Task[];
}

interface DispatchProps {
	onTaskDone: (id: string) => void;
	onTaskUndone: (id: string) => void;
	onCardPress: () => void;
}

interface OwnProps {
	navigation: NavigationProp<any>;
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = state => {
	return {
		tasks: [
			...getSingleTasksByDate(state, state.chosenDate),
			...getRegularTasksByDate(state, state.chosenDate),
		].sort((a, b) => Number(a.done) - Number(b.done)),
	};
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch, props) => ({
	onTaskDone: id => dispatch(setTaskDone({ id })),
	onTaskUndone: id => dispatch(setTaskDone({ id, done: false })),
	onCardPress: () => props.navigation.navigate(Routes.TaskInfo),
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
