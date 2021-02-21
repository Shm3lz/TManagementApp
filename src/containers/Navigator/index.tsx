import * as React from 'react';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import type { Theme } from '@react-navigation/native';

import TasksScreen from '../../screens/TasksScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import Routes from '../../routes';
import DrawerHeaderContainer from '../DrawerHeaderContainer';
import { DrawerHeaderProps } from '@react-navigation/drawer/lib/typescript/src/types';

type RootDrawerParamList = {
	[Routes.Main]: undefined,
	[Routes.Settings]: undefined,
};

export declare type ScreenNavigationProp<T extends keyof RootDrawerParamList> = DrawerNavigationProp<RootDrawerParamList, T>;
export declare type DrawerScreenHeader = ((props: DrawerHeaderProps) => React.ReactNode) | undefined;

interface NavigatorProps {
	theme?: Theme
}

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const Navigator: React.FC<NavigatorProps> = ({ theme }) => {
	const defaultHeader: DrawerScreenHeader = props => <DrawerHeaderContainer {...props} />;
	return (
		<NavigationContainer theme={theme}>
			<Drawer.Navigator screenOptions={{ header: defaultHeader }} initialRouteName={Routes.Main}>
				<Drawer.Screen name={Routes.Main} component={TasksScreen} />
				<Drawer.Screen name={Routes.Settings} component={SettingsScreen} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
};

export default Navigator;
