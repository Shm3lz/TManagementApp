import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
	Button,
	Chip,
	Divider,
	Subheading,
	Surface,
	Switch,
	TextInput,
	Title,
} from 'react-native-paper';
import { hasTimeGoal } from '../../helpers/tasks';
import { getTimeString } from '../../helpers/time';
import useSwitch from '../../hooks/useSwitch';
import useTextInput from '../../hooks/useTextInput';

import { GoalUnit, Task, TaskInformation } from '../../reducers/tasks';
import { ById, WeekDay } from '../../util/types';
import RepeatDaysSection from './RepeatDaysSection';
import SubtasksForm from './SubtasksForm';

interface TaskFormProps {
	initialValue?: TaskInformation;
	onSubmit: (task: TaskInformation) => void;
}

const styles = StyleSheet.create({
	container: {
		padding: 15,
	},
	field: {
		marginBottom: 15,
	},
	goalInput: {
		maxWidth: '50%',
	},
	section: {
		elevation: 3,
		padding: 10,
		borderRadius: 10,
		marginBottom: 15,
		marginHorizontal: 3,
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
	divider: {
		marginTop: 10,
		marginBottom: 3,
	},
	fab: {
		position: 'absolute',
		bottom: '5%',
		right: '5%',
	},
});

enum GoalChip {
	Simple,
	Time,
	Subtask,
}

function getTaskChip(task?: TaskInformation): GoalChip | void {
	if (!task) return;

	if (task.subtasks) return GoalChip.Subtask;

	if (task.goal) {
		if (hasTimeGoal(task)) return GoalChip.Time;

		return GoalChip.Simple;
	}
}

function isEmpty(s: string): boolean {
	return s.trim() === '';
}

const TaskForm: React.FC<TaskFormProps> = ({ initialValue, onSubmit }) => {
	const { text: taskName, bind: taskNameProps, checkErrors: checkNameEmpty } = useTextInput(initialValue?.name, isEmpty);
	const { text: description, bind: descriptionProps } = useTextInput(initialValue?.description);

	const [hasGoal, toggleGoalSwitch] = useSwitch(Boolean(initialValue?.goal || initialValue?.subtasks));

	const [currentGoal, setCurrentGoal] = React.useState(getTaskChip(initialValue) || GoalChip.Simple);
	const handleChipPress = (chip: GoalChip) => () => {
		if (chip === GoalChip.Simple) setUnitName(GoalUnit.Simple);
		if (chip === GoalChip.Time) setUnitName(GoalUnit.Time);

		setObjective(0);
		setCurrentGoal(chip);
	};

	const [objective, setObjective] = React.useState(initialValue?.goal?.objective || 0);
	const handleObjectiveChange = React.useCallback((value: string) => setObjective(parseInt(value)), [setObjective]);

	const [unitName, setUnitName] = React.useState(initialValue?.goal?.unitName || GoalUnit.Simple);
	const [subtasks, setSubtasks] = React.useState(initialValue?.subtasks || {} as ById<Task>);
	const [repeatDays, setRepeatDays] = React.useState(initialValue?.repeat || [] as WeekDay[]);

	const handleFormSubmit = () => {
		if (!taskName) {
			checkNameEmpty();
			return;
		}

		const task = {
			color: 'black',
			date: new Date(),
			...initialValue,
			repeat: repeatDays,
			name: taskName,
			description,
			timeSpent: 0,
		};

		if (hasGoal) {
			if (currentGoal === GoalChip.Subtask && Object.values(subtasks).length > 0) {
				task.subtasks = subtasks;
			} else if (objective > 0) {
				task.goal = {
					progress: 0,
					objective,
					unitName,
				};
			}
		}

		onSubmit(task);
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={styles.container}>
				<Surface style={styles.section}>
					<Title style={styles.sectionTitle}>Information about task</Title>
					<TextInput
						style={styles.field}
						{...taskNameProps}
						dense
						label="Task name"
					/>

					<TextInput
						style={styles.field}
						{...descriptionProps}
						label="Description"
						multiline
						numberOfLines={4}
					/>
				</Surface>

				<Surface style={styles.section}>
					<View style={styles.sectionTitle}>
						<Title>Goal</Title>
						<Switch
							onValueChange={toggleGoalSwitch}
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
										style={[styles.marginLeft, styles.goalInput]}
										dense
										onChangeText={handleObjectiveChange}
									/>
									<TextInput
										defaultValue={unitName}
										style={[styles.marginLeft, styles.goalInput]}
										dense
										onChangeText={setUnitName}
									/>
								</View>
							}
							{currentGoal === GoalChip.Time &&
								<View style={styles.goalForm}>
									<Subheading style={styles.marginLeft}>{getTimeString(objective) || 'No objective'}</Subheading>
									<Button mode="contained">Set</Button>
								</View>
							}
							{currentGoal === GoalChip.Subtask &&
								<SubtasksForm defaultValue={subtasks} onChange={setSubtasks} />
							}
						</View>
					}
				</Surface>

				<Surface style={styles.section}>
					<RepeatDaysSection defaultValue={initialValue?.repeat} onChange={setRepeatDays} />
				</Surface>
				<Button onPress={handleFormSubmit} mode="contained">Submit</Button>
			</View>
		</ScrollView>
	);
};

export default TaskForm;
