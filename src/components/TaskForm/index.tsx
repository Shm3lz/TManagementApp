import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Switch, TextInput, Title, ToggleButton } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

import { Task } from '../../reducers/tasks';

interface TaskFormProps {
	initialValue?: Task;
	onSubmit: () => void;
}

const styles = StyleSheet.create({
	field: {
		marginBottom: 15,
	},

	goalTitle: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		marginLeft: 20,
		alignItems: 'center',
	},

	goalSwitch: {
		marginLeft: 20,
	},
});

const TaskForm: React.FC<TaskFormProps> = ({ initialValue, onSubmit }) => {
	const [formData, setFormData] = React.useState({} as Task);
	const handleTextInputChange =
		(fieldName: string) =>
			(text: string) =>
				setFormData({ ...formData, [fieldName]: text });

	const [hasGoal, setHasGoal] = React.useState(false);
	const handleSwitchToggle = () => setHasGoal(!hasGoal);

	return (
		<View>
			<TextInput
				style={styles.field}
				defaultValue={initialValue?.name}
				onChangeText={handleTextInputChange('name')}
				dense
				label="Task name"
			/>

			<DatePickerModal
				// locale={'en'} optional, default: automatic
				mode="single"
				visible={true}
				date={new Date()}
				onConfirm={() => void(0)}
				onDismiss={() => void(0)}
			// onChange={} // same props as onConfirm but triggered without confirmed by user
			// saveLabel="Save" // optional
			// label="Select date" // optional
			// animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
			/>

			<TextInput
				style={styles.field}
				mode="outlined"
				defaultValue={initialValue?.name}
				onChangeText={handleTextInputChange('description')}
				label="Description"
				multiline
				numberOfLines={5}
			/>

			<View>
				<View style={styles.goalTitle}>
					<Title>Goal</Title>
					<Switch
						style={styles.goalSwitch}
						onValueChange={handleSwitchToggle}
						value={hasGoal}
					/>
				</View>
				{hasGoal &&
					<View>
					</View>
				}
			</View>

		</View>
	);
};

export default TaskForm;
