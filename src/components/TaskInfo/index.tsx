import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Paragraph, Title } from 'react-native-paper';

import TaskStats from '../../components/TaskStats';
import { Goal, Task } from '../../reducers/tasks';

interface OwnProps {
	data: Task;
}

const styles = StyleSheet.create({
	wrapper: {
		padding: 5,
		paddingLeft: 10,
	},

	paragraph: {
		paddingLeft: 10,
		paddingRight: 10,
	},
});

const TaskInfo: React.FC<OwnProps> = ({ data }) => {
	return (
		<View style={styles.wrapper}>
			<Title>Type</Title>
			<Paragraph style={styles.paragraph}>{data.templateId ? 'Regular task' : 'Single task'}</Paragraph>
			<Title>Description</Title>
			<Paragraph style={styles.paragraph}>{data.description || 'No description.'}</Paragraph>
		</View>
	);
};

export default TaskInfo;
