import React from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { isToday, isThisYear } from 'date-fns';

import { State } from '../../store';
import { incrementByDay, decrementByDay, setChosenDate } from '../../reducers/chosenDate';
import TasksHeaderWidget from '../../components/TasksHeaderWidget';

interface StateProps {
	chosenDate: Date;
	tasksNumber: number;
	tasksDoneNumber: number;
}

interface DispatchProps {
	onLeftPress: () => void;
	onRightPress: () => void;
	setDate: (date: Date) => void;
}

type ContainerProps = StateProps & DispatchProps & { theme: ReactNativePaper.Theme };

const mapStateToProps: MapStateToProps<StateProps, any, State> = ({ chosenDate }) => ({
	chosenDate,
	tasksDoneNumber: 1,
	tasksNumber: 10,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, any> = dispatch => ({
	onLeftPress: () => dispatch(decrementByDay()),
	onRightPress: () => dispatch(incrementByDay()),
	setDate: (date: Date) => dispatch(setChosenDate(date)),
});


const TasksHeaderWidgetContainer: React.FC<ContainerProps> = props => {
	const { chosenDate, setDate } = props;

	// TODO: Локализация
	const dateText = isToday(chosenDate)
		? 'Сегодня'
		: isThisYear(chosenDate)
			? `${chosenDate.getDate()}.${chosenDate.getMonth() + 1}`
			: `${chosenDate.getDate()}.${chosenDate.getMonth() + 1}.${chosenDate.getFullYear()}`;

	return (
		<>
			<TasksHeaderWidget {...props} dateText={dateText} onDatePress={void(0)} />
		</>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksHeaderWidgetContainer);
