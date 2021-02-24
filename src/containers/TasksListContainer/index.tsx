import React from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

import { State } from '../../store';
import { clearRegularTasks, instantiateRegularTasks, RegularTaskTemplate, setTaskDone, Task } from '../../reducers/tasks';
import { getTasksByDate } from '../../selectors/tasks';
import TasksList from '../../components/TasksList';
import { ById } from '../../util/types';

interface StateProps {
	tasks: Task[];
	templates: ById<RegularTaskTemplate>,
	chosenDate: Date;
}

interface DispatchProps {
	onTaskDone: (id: string) => void;
	onTaskUndone: (id: string) => void;
	instantiateRegularTasks: (date: Date) => void;
	clearRegularTasks: (date: Date) => void;
}

interface OwnProps {
	openTaskInfo: (id: string) => void;
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = state => {
	return {
		tasks: getTasksByDate(state.tasks, state.chosenDate).sort((a, b) => Number(a.done) - Number(b.done)),
		chosenDate: state.chosenDate,
		templates: state.tasks.templates,
	};
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, unknown> = (dispatch) => ({
	onTaskDone: id => dispatch(setTaskDone({ id })),
	onTaskUndone: id => dispatch(setTaskDone({ id, done: false })),
	instantiateRegularTasks: date => dispatch(instantiateRegularTasks(date)),
	clearRegularTasks: date => dispatch(clearRegularTasks(date)),
});

const TasksListContainer: React.FC<OwnProps & DispatchProps & StateProps> = ({
	tasks,
	templates,
	chosenDate,
	onTaskDone,
	onTaskUndone,
	openTaskInfo,
	instantiateRegularTasks,
	clearRegularTasks,
}) => {
	const handleCardPress = React.useCallback((id: string) => openTaskInfo(id), [openTaskInfo]);
	React.useEffect(() => {
		instantiateRegularTasks(chosenDate);
		return () => {
			clearRegularTasks(chosenDate);
		};
	}, [chosenDate, templates, instantiateRegularTasks, clearRegularTasks]);

	return (
		<TasksList
			tasks={tasks}
			onTaskDone={onTaskDone}
			onTaskUndone={onTaskUndone}
			onCardPress={handleCardPress}
		/>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksListContainer);
