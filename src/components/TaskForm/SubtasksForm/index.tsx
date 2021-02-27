import * as React from 'react';
import { Button, Checkbox, IconButton, Portal, Subheading } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { ById } from '../../../util/types';
import SetValueModal from '../../SetValueModal';
import { Task } from '../../../reducers/tasks';

interface RepeatDaysSectionProps {
	onChange: (subtasks: ById<Task>) => void;
	defaultValue?: ById<Task>;
}

const styles = StyleSheet.create({
	subtask: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		elevation: 1,
		borderRadius: 10,
		margin: 5,
	},
	addSubtaskBtn: {
		display: 'flex',
		flexDirection: 'row',
		margin: 10,
	},
	divider: {
		marginTop: 10,
		marginBottom: 3,
	},
	deleteSubtaskBtn: {
		marginLeft: 'auto',
	},
});

const SubtasksForm: React.FC<RepeatDaysSectionProps> = ({ defaultValue, onChange }) => {
	const [subtasks, setSubtasks] = React.useState(defaultValue || {} as ById<Task>);

	const [modalVisible, setModalVisible] = React.useState(false);
	const handleModalClose = React.useCallback(() => setModalVisible(false), [setModalVisible]);
	const openModal = React.useCallback(() => setModalVisible(true), [setModalVisible]);
	const handleModalSubmit = (value: string) => {
		const id = Date.now();

		const newSubtasks = {
			...subtasks,
			[id]: {
				id,
				name: value,
				done: false,
			},
		};

		setSubtasks(newSubtasks);
		onChange(newSubtasks);
		setModalVisible(false);
	};
	const handleDeleteSubtask = (id: string) => {
		const { [id]: _, ...rest } = subtasks;

		setSubtasks(rest);
		onChange(rest);
	};

	return (
		<View>
			<View style={styles.addSubtaskBtn}>
				<Button mode="contained" onPress={openModal}>
					Add
				</Button>
			</View>
			{Object.values(subtasks).map((subtask, i) =>
				<View style={styles.subtask} key={i}>
					<Checkbox.IOS status="checked" />
					<Subheading>{subtask.name}</Subheading>
					<IconButton
						onPress={() => handleDeleteSubtask(subtask.id)}
						style={styles.deleteSubtaskBtn}
						icon="delete"
					/>
				</View>,
			)}
			<Portal>
				<SetValueModal
					visible={modalVisible}
					onClose={handleModalClose}
					onSubmit={handleModalSubmit}
				/>
			</Portal>
		</View>
	);
};

export default SubtasksForm;
