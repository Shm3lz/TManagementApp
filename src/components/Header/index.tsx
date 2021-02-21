import * as React from 'react';
import { Appbar, useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

interface HeaderProps {
	footerWidget?: React.ReactNode;
	actionIcon?: IconSource,
	onMenuActionPress?: () => void;
	rightWidget?: React.ReactNode;
	title: React.ReactNode;
}

const styles = StyleSheet.create({
	topView: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		// width: '100%',
	},
	header: {
		flexDirection: 'column',
		height: 'auto',
		paddingBottom: 5,
		paddingTop: 5,
		marginTop: 0,
	},
	menuAction: {
		marginTop: 0,
		marginBottom: 0,
		paddingTop: 0,
		paddingBottom: 0,
	},
});

const Header: React.FC<HeaderProps> = ({
	footerWidget,
	title,
	rightWidget,
	actionIcon,
	onMenuActionPress,
}) => {
	const theme = useTheme();

	return (
		<Appbar.Header style={styles.header}>
			<View style={styles.topView}>
				{actionIcon && <Appbar.Action
					color={theme.colors.surface}
					style={styles.menuAction}
					icon={actionIcon}
					onPress={onMenuActionPress}
				/>}
				<Appbar.Content title={title} />
				{rightWidget}
			</View>
			{footerWidget}
		</Appbar.Header>
	);
};

export default Header;
