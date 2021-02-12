import React from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { isToday, isThisYear } from 'date-fns';

import { State } from '../../store';
import { incrementByDay, decrementByDay, setChosenDate } from '../../reducers/chosenDate';
import TasksHeaderWidget from '../../components/TasksHeaderWidget';
import { useTheme } from 'react-native-paper';

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

type ContainerProps = StateProps & DispatchProps;

const mapStateToProps: MapStateToProps<StateProps, unknown, State> = ({ chosenDate }) => ({
	chosenDate,
	tasksDoneNumber: 1,
	tasksNumber: 10,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, unknown> = dispatch => ({
	onLeftPress: () => dispatch(decrementByDay()),
	onRightPress: () => dispatch(incrementByDay()),
	setDate: (date: Date) => dispatch(setChosenDate(date)),
});


const TasksHeaderWidgetContainer: React.FC<ContainerProps> = props => {
	const { chosenDate, setDate } = props;
	const theme = useTheme();
	const footerTheme = React.useMemo(() => ({
		...theme,
		colors: {
			...theme.colors,
			text: theme.colors.surface,
		},
	}), [theme]);

	// TODO: Локализация
	const dateText = isToday(chosenDate)
		? 'Сегодня'
		: isThisYear(chosenDate)
			? `${chosenDate.getDate()}.${chosenDate.getMonth() + 1}`
			: `${chosenDate.getDate()}.${chosenDate.getMonth() + 1}.${chosenDate.getFullYear()}`;

	return (
		<TasksHeaderWidget
			{...props}
			theme={footerTheme}
			dateText={dateText}
			onDatePress={void(0)}
		/>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksHeaderWidgetContainer);
