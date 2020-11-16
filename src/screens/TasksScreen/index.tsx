import * as React from 'react';
import { Title } from 'react-native-paper';
import { View } from 'react-native';

import Routes from '../../routes';
import { ScreenNavigationProp } from '../../containers/Navigator';

interface TasksScreen {
	navigation: ScreenNavigationProp<Routes.Main>
}

const TasksScreen: React.FC = () => {
	return (
		<View>
			<Title>view</Title>
		</View>
	);
};

export default TasksScreen;
