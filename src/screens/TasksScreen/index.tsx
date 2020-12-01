import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { View } from 'react-native';

import Routes from '../../routes';
import { ScreenNavigationProp } from '../../containers/Navigator';
import TodayButton from '../../components/TodayButton';

interface TasksScreen {
	navigation: ScreenNavigationProp<Routes.Main>
}

const TasksScreen: React.FC = () => {
	const theme = useTheme();
	return (
		<View>
		</View>
	);
};

export default TasksScreen;
