import * as React from 'react';
import { Title, useTheme } from 'react-native-paper';
import { View } from 'react-native';

import Routes from '../../routes';
import { ScreenNavigationProp } from '../../containers/Navigator';

interface TasksScreen {
	navigation: ScreenNavigationProp<Routes.Main>
}

const TasksScreen: React.FC = () => {
	return (
		<View>
			<Title>3123123</Title>
		</View>
	);
};

export default TasksScreen;
