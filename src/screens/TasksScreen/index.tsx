import * as React from 'react';
import { View } from 'react-native';

import TasksListContainer from '../../containers/TasksListContainer';
import Routes from '../../routes';
import { ScreenNavigationProp } from '../../containers/Navigator';

interface TasksScreen {
	navigation: ScreenNavigationProp<Routes.Main>
}

const TasksScreen: React.FC = () => {
	return (
		<View>
			<TasksListContainer />
		</View>
	);
};

export default TasksScreen;
