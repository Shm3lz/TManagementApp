import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Paragraph, Title } from 'react-native-paper';

import TaskStats from '../../components/TaskStats';
import { Task } from '../../reducers/tasks';

interface TaskInfoProps {
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

const TaskInfo: React.FC<TaskInfoProps> = ({ data }) => {
	return (
		<View style={styles.wrapper}>
			<Title>Type</Title>
			<Paragraph style={styles.paragraph}>{data.templateId ? 'Regular task': 'Single task'}</Paragraph>
			<Title>Description</Title>
			<Paragraph style={styles.paragraph}>{data.description || 'No description.'}</Paragraph>
			<TaskStats data={data} />
		</View>
	);
};

export default TaskInfo;
