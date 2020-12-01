import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { isToday, isThisYear } from 'date-fns';

import { State } from '../../store';
import { incrementByDay, decrementByDay } from '../../reducers/chosenDate';
import TasksHeaderWidget from '../../components/TasksHeaderWidget';

interface StateProps {
	dateText: string;
	tasksNumber: number;
	tasksDoneNumber: number;
}

interface DispatchProps {
	onDatePress: () => void;
	onLeftPress: () => void;
	onRightPress: () => void;
}

const mapStateToProps: MapStateToProps<StateProps, any, State> = ({ chosenDate }) => {
	// Локализация
	const dateText = isToday(chosenDate)
		? 'Сегодня'
		: isThisYear(chosenDate)
			? `${chosenDate.getDate()}.${chosenDate.getMonth() + 1}`
			: `${chosenDate.getDate()}.${chosenDate.getMonth() + 1}.${chosenDate.getFullYear()}`;

	return {
		dateText,
		tasksDoneNumber: 1,
		tasksNumber: 10,
	};
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, any> = dispatch => ({
	onDatePress: () => undefined,
	onLeftPress: () => dispatch(decrementByDay()),
	onRightPress: () => dispatch(incrementByDay()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksHeaderWidget);
