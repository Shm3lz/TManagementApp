import React from 'react';
import { Title, Subheading, withTheme, TouchableRipple } from 'react-native-paper';
import { StyleSheet, View, TextStyle } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface TasksHeader {
	onDatePress?: () => void;
	onLeftPress?: () => void;
	onRightPress?: () => void;
	dateText: string;
	tasksNumber: number;
	tasksDoneNumber: number;
	theme: ReactNativePaper.Theme;
}

const style = StyleSheet.create({
	dayControl: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	tasksInfo: {
		alignSelf: 'center',
	},
	dateText: {
		borderRadius: 200,
	},
	icons: {
		padding: 7,
		borderRadius: 20,
	},
});

const TasksHeader: React.FC<TasksHeader> = ({
	theme,
	dateText,
	tasksDoneNumber,
	tasksNumber,
	onDatePress,
	onLeftPress,
	onRightPress,
}) => {
	const typographyStyle = React.useMemo(() => ({
		color: theme?.colors?.text,
	}), [theme]);

	const titleStyle = React.useMemo(() => ({
		...typographyStyle,
		marginLeft: 10,
		marginRight: 10,
		minWidth: 100,
		textAlign: 'center' as TextStyle['textAlign'],
	}), [typographyStyle]);

	return (
		<View>
			<View style={style.dayControl}>
				<TouchableRipple borderless style={style.icons} onPress={onLeftPress}>
					<AntDesign name="left" size={24} color={theme?.colors?.text} />
				</TouchableRipple>
				<TouchableRipple borderless style={style.dateText} onPress={onDatePress}>
					<Title style={titleStyle}>{dateText}</Title>
				</TouchableRipple>
				<TouchableRipple borderless style={style.icons} onPress={onRightPress}>
					<AntDesign name="right" size={24} color={theme?.colors?.text} />
				</TouchableRipple>
			</View>
			<View style={style.tasksInfo}>
				{tasksNumber > 0 && <Subheading style={typographyStyle}>{tasksDoneNumber}/{tasksNumber} tasks done</Subheading>}
			</View>
		</View>
	);
};


export default withTheme(TasksHeader);
