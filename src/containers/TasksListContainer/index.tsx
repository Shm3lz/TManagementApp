import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

import { State } from '../../store';
import { setTaskDone, Task } from '../../reducers/tasks';
import { getRegularTasksByDate, getSingleTasksByDate } from '../../selectors/tasks';
import TasksList from '../../components/TasksList';

interface StateProps {
	tasks: Task[];
}

interface DispatchProps {
	onTaskDone: (id: string) => void;
	onTaskUndone: (id: string) => void;
	onCardPress: (id: string) => void;
}

interface OwnProps {
	openTaskInfo: (id: string) => void;
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
	onCardPress: id => props.openTaskInfo(id),
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
