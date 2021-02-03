import React from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

import { State } from '../../store';
import { Task } from '../../reducers/tasks';
import { ById } from '../../util/types';

interface StateProps {
	tasks: ById<Task>;
}

const mapStateToProps: MapStateToProps<StateProps, any, State> = (stateProps) => {
	return {
		tasks: {},
	};
};
