import React from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

import { State } from '../../store';
import { Task } from '../../reducers/tasks';
import { getRegularTasksByDate, getSingleTasksByDate } from '../../selectors/tasks';
import TaskCard from '../../components/TaskCard';


interface StateProps {
	tasks: Task[];
}

type ContainerProps = StateProps;

const mapStateToProps: MapStateToProps<StateProps, any, State> = state => {
	return {
		tasks: [
			...getSingleTasksByDate(state, state.chosenDate),
			...getRegularTasksByDate(state, state.chosenDate),
		],
	};
};

const TasksListContainer: React.FC<ContainerProps> = props => {
	return (
		<>
			{props.tasks.map((task, i) => <TaskCard data={task} key={i} />)}
		</>
	);

};

export default connect(mapStateToProps, null)(TasksListContainer);
