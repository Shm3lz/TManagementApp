import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';

import TimeGoalSection from '../../components/TimeGoalSection';
import SimpleGoalSection from '../../components/SimpleGoalSection';
import ComplexGoalSection from '../../components/ComplexGoalSection';

import { ComplexGoal, SimpleGoal, Task, TimeGoal, updateGoal } from '../../reducers/tasks';
import clamp from '../../util/clamp';
import { hasComplexGoal, hasTimeGoal } from '../../helpers/tasks';

interface OwnProps {
	data: Task;
}

interface DispatchProps {
	onSimpleGoalUpdate: (progress: number) => void;
	onComplexGoalUpdate: (goalData: ComplexGoal) => void;
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch, { data }) => {
	return {
		onSimpleGoalUpdate: progress => {
			if (!data.goal) return;

			dispatch(updateGoal({
				id: data.id,
				goalData: {
					...data.goal,
					progress: clamp(progress, 0, (data.goal as SimpleGoal | TimeGoal).objective),
				},
			}));
		},

		onComplexGoalUpdate: goalData => {
			if (!data.goal) return;

			dispatch(updateGoal({
				id: data.id,
				goalData,
			}));
		},
	};
};

const styles = StyleSheet.create({
	wrapper: {
		padding: 5,
		paddingLeft: 10,
	},

	paragraph: {
		paddingLeft: 10,
		paddingRight: 10,
	},
});

const GoalSectionContainer: React.FC<OwnProps & DispatchProps> = ({
	data,
	onComplexGoalUpdate,
	onSimpleGoalUpdate,
}) => {


	return (
		<View style={styles.wrapper}>
			{hasComplexGoal(data) ?
				<ComplexGoalSection
					data={data.goal as ComplexGoal}
					onGoalUpdate={onComplexGoalUpdate}
				/>
				: hasTimeGoal(data)
					? <TimeGoalSection
						data={data.goal as TimeGoal}
						onGoalUpdate={onSimpleGoalUpdate}
					/>
					: <SimpleGoalSection
						data={data.goal as SimpleGoal}
						onGoalUpdate={onSimpleGoalUpdate}
					/>
			}
		</View>
	);
};

export default connect(null, mapDispatchToProps)(GoalSectionContainer);
