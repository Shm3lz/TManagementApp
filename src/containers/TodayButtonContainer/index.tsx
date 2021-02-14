import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import React from 'react';

import { setChosenDate } from '../../reducers/chosenDate';
import TodayButton from '../../components/TodayButton';
import { State } from '../../store';
import { isToday } from 'date-fns';

interface DispatchProps {
	onPress: () => void;
}

interface StateProps {
	chosenDate: Date;
}

const mapStateToProps: MapStateToProps<StateProps, unknown, State> = ({ chosenDate }) => ({
	chosenDate,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, unknown> = dispatch => ({
	onPress: () => dispatch(setChosenDate(new Date())),
});

const TodayButtonContainer: React.FC<StateProps & DispatchProps & { theme: ReactNativePaper.Theme }> = props => {
	return (isToday(props.chosenDate) ?
		<></> : <TodayButton onPress={props.onPress} theme={props.theme} />
	);
};


export default connect(mapStateToProps, mapDispatchToProps)(TodayButtonContainer);
