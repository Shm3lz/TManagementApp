import React from 'react';
import { Title, Subheading, withTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface TasksHeader {
	onPress?: () => void;
	dateText?: string;
	tasksNumber?: number;
	tasksDoneNumber?: number;
	theme: ReactNativePaper.Theme;
}

const style = StyleSheet.create({
	dayControl: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		marginLeft: 10,
		marginRight: 10,
	},
	tasksInfo: {
		alignSelf: 'center',
	},
});

const TasksHeader: React.FC<TasksHeader> = ({ theme }) => {
	const typographyStyle = React.useMemo(() => ({
		color: theme?.colors?.text,
	}), [theme]);

	const titleStyle = React.useMemo(() => ({
		...typographyStyle,
		marginLeft: 10,
		marginRight: 10,
	}), [typographyStyle]);

	return (
		<View>
			<View style={style.dayControl}>
				<AntDesign name="left" size={12} color={theme?.colors?.text} />
				<Title style={titleStyle}>Today</Title>
				<AntDesign name="right" size={12} color={theme?.colors?.text} />
			</View>
			<View style={style.tasksInfo}>
				<Subheading style={typographyStyle}>0/10 tasks done</Subheading>
			</View>
		</View>
	);
};


export default withTheme(TasksHeader);
