import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
	Button,
	Checkbox,
	Chip,
	Divider,
	IconButton,
	Portal,
	Subheading,
	Surface,
	Switch,
	TextInput,
	Title,
} from 'react-native-paper';

import { GoalUnit, Task } from '../../reducers/tasks';
import { ById, WeekDay } from '../../util/types';
import SetValueModal from '../SetValueModal';

interface TaskFormProps {
	initialValue?: Task;
	onSubmit: () => void;
}

const styles = StyleSheet.create({
	field: {
		marginBottom: 15,
	},
	section: {
		elevation: 3,
		padding: 10,
		borderRadius: 10,
		marginBottom: 15,
	},
	sectionTitle: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	goalChips: {
		marginTop: 10,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	goalForm: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10,
	},
	marginLeft: {
		marginLeft: 10,
	},
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

enum GoalChip {
	Simple,
	Time,
	Subtask,
}

const weekDays = {
	monday: WeekDay.Monday,
	tuesday: WeekDay.Tuesday,
	wednesday: WeekDay.Wednesday,
	thursday: WeekDay.Thursday,
	friday: WeekDay.Friday,
	saturday: WeekDay.Saturday,
	sunday: WeekDay.Sunday,
};

const TaskForm: React.FC<TaskFormProps> = ({ initialValue, onSubmit }) => {
	const [formData, setFormData] = React.useState({} as Task);
	const handleTextInputChange =
		(fieldName: string) =>
			(text: string) =>
				setFormData({ ...formData, [fieldName]: text });

	const [hasGoal, setHasGoal] = React.useState(false);
	const handleSwitchToggle = () => setHasGoal(!hasGoal);

	const [currentGoal, setCurrentGoal] = React.useState(GoalChip.Simple);
	const handleChipPress = (chip: GoalChip) => () => {
		if (chip === GoalChip.Simple) setUnitName(GoalUnit.Simple);
		if (chip === GoalChip.Time) setUnitName(GoalUnit.Time);

		setObjective(0);
		setCurrentGoal(chip);
	};

	const [objective, setObjective] = React.useState(initialValue?.goal?.objective || 0);
	const handleObjectiveChange = React.useCallback((value: string) => setObjective(Number(value)), [setObjective]);

	const [unitName, setUnitName] = React.useState(initialValue?.goal?.unitName || GoalUnit.Simple);
	const handleUnitNameChange = React.useCallback((value: string) => setUnitName(value), [setUnitName]);

	const [subtasks, setSubtasks] = React.useState({} as ById<Task>);

	const [modalVisible, setModalVisible] = React.useState(false);
	const handleModalClose = React.useCallback(() => setModalVisible(false), [setModalVisible]);
	const openModal = React.useCallback(() => setModalVisible(true), [setModalVisible]);
	const handleModalSubmit = (value: string) => {
		const id = Date.now();

		setSubtasks({
			...subtasks,
			[id]: {
				id,
				name: value,
			},
		});
		setModalVisible(false);
	};
	const handleDeleteSubtask = (id: string) => {
		const { [id]: _, ...rest } = subtasks;

		setSubtasks(rest);
	};

	const [timeStatsSwitch, setTimeStatsSwitch] = React.useState(false);
	const handleTimeSwitchToggle = () => setTimeStatsSwitch(!timeStatsSwitch);

	const [repeatSwitch, setRepeatSwitch] = React.useState(false);
	const handleRepeatSwitchToggle = () => setRepeatSwitch(!repeatSwitch);
	const [repeatDays, setRepeatDays] = React.useState([] as WeekDay[]);
	const handleRepeatDayToggle = (day: WeekDay) => {
		if (repeatDays.includes(day)) {
			setRepeatDays(repeatDays.filter(d => d !== day));
			return;
		}

		setRepeatDays([...repeatDays, day]);
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<Surface style={styles.section}>
				<Title style={styles.sectionTitle}>Information about task</Title>
				<TextInput
					style={styles.field}
					defaultValue={initialValue?.name}
					onChangeText={handleTextInputChange('name')}
					dense
					label="Task name"
				/>

				<TextInput
					style={styles.field}
					defaultValue={initialValue?.name}
					onChangeText={handleTextInputChange('description')}
					label="Description"
					multiline
					numberOfLines={5}
				/>
			</Surface>

			<Surface style={styles.section}>
				<View style={styles.sectionTitle}>
					<Title>Goal</Title>
					<Switch
						onValueChange={handleSwitchToggle}
						value={hasGoal}
					/>
				</View>
				{hasGoal &&
					<View>
						<View style={styles.goalChips}>
							<Chip onPress={handleChipPress(GoalChip.Simple)} selected={currentGoal === GoalChip.Simple}>Simple goal</Chip>
							<Chip onPress={handleChipPress(GoalChip.Time)} selected={currentGoal === GoalChip.Time}>Time goal</Chip>
							<Chip onPress={handleChipPress(GoalChip.Subtask)} selected={currentGoal === GoalChip.Subtask}>Subtasks</Chip>
						</View>
						<Divider style={styles.divider} />
						{currentGoal === GoalChip.Simple &&
							<View style={styles.goalForm}>
								<TextInput
									defaultValue={String(objective)}
									keyboardType="numeric"
									style={styles.marginLeft}
									dense
									onChangeText={handleObjectiveChange}
								/>
								<TextInput
									defaultValue={unitName}
									style={styles.marginLeft}
									dense
									onChangeText={handleUnitNameChange}
								/>
							</View>
						}
						{currentGoal === GoalChip.Time &&
							<View style={styles.goalForm}>
								<TextInput keyboardType="numeric" style={styles.marginLeft} onChangeText={handleObjectiveChange} dense>0</TextInput>
								<Subheading style={styles.marginLeft}>minutes</Subheading>
							</View>
						}
						{currentGoal === GoalChip.Subtask &&
							<View>
								<View style={styles.addSubtaskBtn}>
									<Button mode="contained" onPress={openModal}>
										Add
									</Button>
								</View>
								{Object.values(subtasks).map((subtask, i) =>
									<Surface style={styles.subtask} key={i}>
										<Checkbox.IOS status="checked" />
										<Subheading>{subtask.name}</Subheading>
										<IconButton
											onPress={() => handleDeleteSubtask(subtask.id)}
											style={styles.deleteSubtaskBtn}
											icon="delete"
										/>
									</Surface>,
								)}
								<Portal>
									<SetValueModal
										visible={modalVisible}
										onClose={handleModalClose}
										onSubmit={handleModalSubmit}
									/>
								</Portal>
							</View>
						}
					</View>
				}
			</Surface>

			<Surface style={styles.section}>
				<View style={styles.sectionTitle}>
					<Title>Time statistics</Title>
					<Switch
						onValueChange={handleTimeSwitchToggle}
						value={timeStatsSwitch}
					/>
				</View>
			</Surface>

			<Surface style={styles.section}>
				<View style={styles.sectionTitle}>
					<Title>Repeat</Title>
					<Switch
						onValueChange={handleRepeatSwitchToggle}
						value={repeatSwitch}
					/>
				</View>
				{repeatSwitch &&
					<View style={styles.goalChips}>
						{Object.values(weekDays).map((day, i) => (
							<Chip selected={repeatDays.includes(day)} onPress={() => handleRepeatDayToggle(day)} mode="outlined" key={i}>{day}</Chip>
						))}
					</View>
				}
			</Surface>
		</ScrollView>
	);
};

export default TaskForm;
