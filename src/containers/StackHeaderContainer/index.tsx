import * as React from 'react';

import Header from '../../components/Header';
import { StackActions } from '@react-navigation/native';
import { StackHeaderProps } from '@react-navigation/stack';

interface HeaderContainerProps extends StackHeaderProps {
	footerWidget?: React.ReactNode;
}

const StackHeaderContainer: React.FC<HeaderContainerProps> = ({ scene, footerWidget }) => {
	const { options, navigation } = scene.descriptor;

	const title =
		options.headerTitle !== undefined
			? options.headerTitle
			: options.title !== undefined
				? options.title
				: scene.route.name;

	const handleMenuActionPress = () => navigation.dispatch(StackActions.pop());

	return (
		<Header
			title={title}
			actionIcon="arrow-left"
			onMenuActionPress={handleMenuActionPress}
			rightWidget={options.headerRight && options.headerRight({})}
			footerWidget={footerWidget}
		/>
	);
};

export default StackHeaderContainer;
