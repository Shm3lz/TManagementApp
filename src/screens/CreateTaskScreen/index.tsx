import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Routes from '../../routes';
import { Route } from '@react-navigation/native';
import StackHeaderContainer from '../../containers/StackHeaderContainer';
import TaskForm from '../../components/TaskForm';

interface CreateTaskScreenProps {
	navigation: StackNavigationProp<{ [Routes.CreateTask]: undefined }>;
	route: Route<Routes.CreateTask>;
}

const styles = StyleSheet.create({
	wrapper: {
		padding: 15,
	},
});

const CreateTaskScreen: React.FC<CreateTaskScreenProps> = ({ navigation }) => {
	React.useLayoutEffect(() => {
		navigation
			.dangerouslyGetParent()
			?.setOptions({
				header: props => <StackHeaderContainer {...props} />,
				headerTitle: 'Create task',
			});
	}, [navigation]);

	return (
		<View style={styles.wrapper}>
			<TaskForm />
		</View>
	);
};

export default CreateTaskScreen;
