import React from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { isToday, isThisYear } from 'date-fns';
import { DatePickerModal } from 'react-native-paper-dates';

import { State } from '../../store';
import { incrementByDay, decrementByDay, setChosenDate } from '../../reducers/chosenDate';
import TasksHeaderWidget from '../../components/TasksHeaderWidget';
import { useTheme } from 'react-native-paper';
import { countTasksByDate, countTasksDoneByDate } from '../../selectors/tasks';
import { SingleChange } from 'react-native-paper-dates/lib/typescript/src/Date/Calendar';

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

const mapStateToProps: MapStateToProps<StateProps, unknown, State> = (state) => ({
	chosenDate: state.chosenDate,
	tasksDoneNumber: countTasksDoneByDate(state.tasks, state.chosenDate),
	tasksNumber: countTasksByDate(state.tasks, state.chosenDate),
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

	const [visible, setVisible] = React.useState(false);
	const handleDismiss = React.useCallback(() => setVisible(false), [setVisible]);
	const handleOpen = React.useCallback(() => setVisible(true), [setVisible]);

	const handleConfirm: SingleChange = ({ date }) => {
		setDate(date || chosenDate);
		setVisible(false);
	};

	return (
		<>
			<TasksHeaderWidget
				{...props}
				theme={footerTheme}
				dateText={dateText}
				onDatePress={handleOpen}
			/>
			<DatePickerModal
				mode="single"
				visible={visible}
				onDismiss={handleDismiss}
				date={chosenDate}
				onConfirm={handleConfirm}
				saveLabel="Select"
			/>
		</>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksHeaderWidgetContainer);
