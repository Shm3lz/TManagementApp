import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect, MapDispatchToProps } from 'react-redux';

import TimeGoalSection from '../../components/TimeGoalSection';
import SimpleGoalSection from '../../components/SimpleGoalSection';
import SubtasksSection from '../../components/SubtasksSection';

import { Task, TimeGoal, updateGoal, updateSubtask } from '../../reducers/tasks';
import { hasTimeGoal } from '../../helpers/tasks';
import SetValueModal from '../../components/SetValueModal';
import { Portal } from 'react-native-paper';

interface OwnProps {
	data: Task;
}

interface DispatchProps {
	onGoalUpdate: (progress: number) => void;
	onSubtaskUpdate: (id: string, done: boolean) => void;
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch, { data }) => {
	return {
		onGoalUpdate: progress => dispatch(updateGoal({ id: data.id, progress })),
		onSubtaskUpdate: (id, done) => dispatch(updateSubtask({ taskId: data.id, subtaskId: id, done })),
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
	onSubtaskUpdate,
	onGoalUpdate,
}) => {
	const [modalVisible, setModalVisible] = React.useState(false);
	const handleModalClose = React.useCallback(() => setModalVisible(false), []);
	const openModal = React.useCallback(() => setModalVisible(true), []);
	const handleModalSubmit = (v: string) => {
		handleModalClose();
		onGoalUpdate(Number(v));
	};

	return (
		<>
			<View style={styles.wrapper}>
				{data.subtasks && (
					<SubtasksSection
						subtasks={data.subtasks}
						onSubtaskUpdate={onSubtaskUpdate}
					/>
				)}
				{hasTimeGoal(data)
					? <TimeGoalSection
						data={data.goal as TimeGoal}
						onSetManualPress={openModal}
					/>
					: data.goal && <SimpleGoalSection
						data={data.goal}
						onSetManualPress={openModal}
						onGoalUpdate={onGoalUpdate}
					/>
				}
			</View>
			<Portal>
				<SetValueModal
					keyboardType="numeric"
					visible={modalVisible}
					onClose={handleModalClose}
					onSubmit={handleModalSubmit}
				/>
			</Portal>
		</>
	);
};

export default connect(null, mapDispatchToProps)(GoalSectionContainer);
