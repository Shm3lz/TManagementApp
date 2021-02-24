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
import useSwitch from '../../hooks/useSwitch';

import { GoalUnit, Task, TaskInformation } from '../../reducers/tasks';
import { ById, WeekDay } from '../../util/types';
import RepeatDaysSection from './RepeatDaysSection';
import SubtasksForm from './SubtasksForm';

interface TaskFormProps {
	initialValue?: TaskInformation;
	onSubmit: (task: TaskInformation) => void;
}

const styles = StyleSheet.create({
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

function useTextInput(value = '', hasError?: (s: string) => boolean) {
	const [text, setText] = React.useState(value);
	const [error, setError] = React.useState(false);

	return {
		text,
		checkErrors: () => hasError && setError(hasError(text)),
		bind: {
			defaultValue: value,
			onChangeText: (newVal: string) => {
				setText(newVal);
				hasError && setError(hasError(text));
			},
			error,
		},
	};
}

function isEmpty(s: string): boolean {
	return s.trim() === '';
}

const defaultInfo = { date: new Date(), name: 'New task', color: 'black', repeat: [] };

const TaskForm: React.FC<TaskFormProps> = ({ initialValue, onSubmit }) => {
	const { text: taskName, bind: taskNameProps, checkErrors: checkNameEmpty } = useTextInput(initialValue?.name, isEmpty);
	const { text: description, bind: descriptionProps } = useTextInput(initialValue?.description);

	const [hasGoal, toggleGoalSwitch] = useSwitch(Boolean(initialValue?.goal));

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
	const handleChangeSubtasks = (sb: ById<Task>) => setSubtasks(sb);

	const [timeStatsSwitch, toggleTimeSwitch] = useSwitch(Boolean(initialValue?.timeSpent));

	const [repeatDays, setRepeatDays] = React.useState([] as WeekDay[]);
	const handleChangeRepeatDays = React.useCallback((days: Array<WeekDay>) => setRepeatDays(days), [setRepeatDays]);

	const handleFormSubmit = () => {
		if (!taskName) {
			checkNameEmpty();
			return;
		}

		const task = {
			...defaultInfo,
			...initialValue,
			name: taskName,
			description,
		};

		if (hasGoal) {
			if (currentGoal === GoalChip.Subtask && Object.values(subtasks).length) {
				task.subtasks = subtasks;
			} else if (objective > 0) {
				task.goal = {
					progress: 0,
					objective,
					unitName,
				};
			}
		}

		if (timeStatsSwitch) {
			task.timeSpent = 0;
		}

		task.repeat = repeatDays;

		onSubmit(task);
	};

	return (
		<View>
			<ScrollView style={{ height: '100%' }} showsVerticalScrollIndicator={false}>
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
										onChangeText={handleUnitNameChange}
									/>
								</View>
							}
							{currentGoal === GoalChip.Time &&
								<View style={styles.goalForm}>
									<TextInput
										defaultValue={String(objective)}
										keyboardType="numeric"
										style={[styles.marginLeft, styles.goalInput]}
										onChangeText={handleObjectiveChange}
										dense
									/>
									<Subheading style={styles.marginLeft}>minutes</Subheading>
								</View>
							}
							{currentGoal === GoalChip.Subtask &&
								<SubtasksForm onChange={handleChangeSubtasks} />
							}
						</View>
					}
				</Surface>

				<Surface style={styles.section}>
					<View style={styles.sectionTitle}>
						<Title>Time statistics</Title>
						<Switch
							onValueChange={toggleTimeSwitch}
							value={timeStatsSwitch}
						/>
					</View>
				</Surface>

				<Surface style={styles.section}>
					<RepeatDaysSection onChange={handleChangeRepeatDays} />
				</Surface>
				<Button onPress={handleFormSubmit} mode="contained">Submit</Button>
			</ScrollView>
		</View>
	);
};

export default TaskForm;
