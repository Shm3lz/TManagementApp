import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Routes from '../../routes';
import { DrawerScreenHeader, ScreenNavigationProp } from '../../containers/Navigator';
import TaskInfoScreen from '../TaskInfoScreen';
import { getFocusedRouteNameFromRoute, Route } from '@react-navigation/native';
import TasksListScreen from '../TasksListScreen';
import DrawerHeaderContainer from '../../containers/DrawerHeaderContainer';
import TasksHeaderWidgetContainer from '../../containers/TasksHeaderWidgetContainer';
import TodayButtonContainer from '../../containers/TodayButtonContainer';
import CreateTaskScreen from '../CreateTaskScreen';

type NavigationParams = {
	[Routes.TaskInfo]: { id: string },
	[Routes.TasksList]: undefined,
	[Routes.CreateTask]: undefined,
}

const Stack = createStackNavigator<NavigationParams>();

interface TasksScreenProps {
	navigation: ScreenNavigationProp<Routes.Main>
	route: Route<Routes.Main>
}

const stackOptions = { headerShown: false };

const TasksScreen: React.FC<TasksScreenProps> = ({ navigation, route }) => {
	const mainScreenHeader: DrawerScreenHeader = props =>
		<DrawerHeaderContainer
			footerWidget={<TasksHeaderWidgetContainer />}
			{...props}
		/>;

	React.useLayoutEffect(() => {
		const focusedRoute = getFocusedRouteNameFromRoute(route);

		if (focusedRoute === Routes.TaskInfo || focusedRoute === Routes.CreateTask) {
			return;
		}

		navigation.setOptions({
			header: mainScreenHeader,
			headerTitle: '',
			headerRight: () => <TodayButtonContainer />,
		});
	}, [navigation, route]);

	return (
		<Stack.Navigator screenOptions={stackOptions} initialRouteName={Routes.TasksList}>
			<Stack.Screen name={Routes.TaskInfo} component={TaskInfoScreen} />
			<Stack.Screen name={Routes.TasksList} component={TasksListScreen} />
			<Stack.Screen name={Routes.CreateTask} component={CreateTaskScreen} />
		</Stack.Navigator>
	);
};

export default TasksScreen;
