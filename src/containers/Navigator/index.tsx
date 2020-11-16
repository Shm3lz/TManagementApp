import * as React from 'react';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import type { Theme } from '@react-navigation/native';

import TasksScreen from '../../screens/TasksScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import Routes from '../../routes';

type RootDrawerParamList = {
	[Routes.Main]: undefined,
	[Routes.Settings]: undefined,
};

export declare type ScreenNavigationProp<T extends Routes> = DrawerNavigationProp<RootDrawerParamList, T>;

interface NavigatorProps {
	theme?: Theme
}

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const Navigator: React.FC<NavigatorProps> = ({ theme }) => {
	return (
		<NavigationContainer theme={theme}>
			<Drawer.Navigator initialRouteName={Routes.Main}>
				<Drawer.Screen name={Routes.Main} component={TasksScreen} />
				<Drawer.Screen name={Routes.Settings} component={SettingsScreen} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
};

export default Navigator;
