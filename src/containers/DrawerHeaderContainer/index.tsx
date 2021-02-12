import * as React from 'react';
import { DrawerHeaderProps } from '@react-navigation/drawer/lib/typescript/src/types';
import { DrawerActions } from '@react-navigation/native';

import Header from '../../components/Header';

interface HeaderContainerProps extends DrawerHeaderProps {
	footerWidget?: React.ReactNode;
}

const DrawerHeaderContainer: React.FC<HeaderContainerProps> = ({ scene, footerWidget }) => {
	const { options, navigation } = scene.descriptor;

	const title =
		options.headerTitle !== undefined
			? options.headerTitle
			: options.title !== undefined
				? options.title
				: scene.route.name;

	const handleMenuActionPress = () => navigation.dispatch(DrawerActions.toggleDrawer());

	return (
		<Header
			title={title}
			actionIcon="menu"
			onMenuActionPress={handleMenuActionPress}
			rightWidget={options.headerRight && options.headerRight({})}
			footerWidget={footerWidget}
		/>
	);
};

export default DrawerHeaderContainer;
