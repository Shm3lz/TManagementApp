import * as React from 'react';
import { DrawerHeaderProps } from '@react-navigation/drawer/lib/typescript/src/types';
import { Appbar, useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

interface HeaderContainerProps extends DrawerHeaderProps{
	footerWidget?: React.ComponentType<{ theme: ReactNativePaper.Theme }>;
}

const styles = StyleSheet.create({
	topView: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	header: {
		flexDirection: 'column',
		height: 'auto',
		paddingBottom: 5,
		paddingTop: 5,
	},
	menuAction: {
		marginTop: 0,
		marginBottom: 0,
		paddingTop: 0,
		paddingBottom: 0,
	},
});

const HeaderContainer: React.FC<HeaderContainerProps> = ({ scene, footerWidget: Footer }) => {
	const theme = useTheme();
	const footerTheme = React.useMemo(() => ({
		...theme,
		colors: {
			...theme.colors,
			text: theme.colors.surface,
		},
	}), [theme]);

	const { options, navigation } = scene.descriptor;
	const title =
	options.headerTitle !== undefined
		? options.headerTitle
		: options.title !== undefined
			? options.title
			: scene.route.name;

	const onMenuActionPress = () => navigation.dispatch(DrawerActions.toggleDrawer());

	return (
		<Appbar.Header style={styles.header}>
			<View style={styles.topView}>
				<Appbar.Action
					color={theme.colors.surface}
					style={styles.menuAction}
					icon="menu"
					onPress={onMenuActionPress}
				/>
				<Appbar.Content title={title} />
				{options.headerRight && options.headerRight({})}
			</View>
			{Footer && <Footer theme={footerTheme}></Footer>}
		</Appbar.Header>
	);
};

export default HeaderContainer;
