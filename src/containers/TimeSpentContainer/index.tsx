import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect, MapDispatchToProps } from 'react-redux';

import SetValueModal from '../../components/SetValueModal';
import { Portal } from 'react-native-paper';
import SpentTimeSection from '../../components/SpentTimeSection';
import { setSpentTime, Task } from '../../reducers/tasks';

interface OwnProps {
	data: Task;
}

interface DispatchProps {
	updateSpentTime: (progress: number) => void;
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch, { data }) => {
	return {
		updateSpentTime: timestamp => dispatch(setSpentTime({ id: data.id, timestamp })),
	};
};

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

const TimeSpentContainer: React.FC<OwnProps & DispatchProps> = ({
	data,
	updateSpentTime,
}) => {
	const [modalVisible, setModalVisible] = React.useState(false);
	const handleModalClose = React.useCallback(() => setModalVisible(false), []);
	const openModal = React.useCallback(() => setModalVisible(true), []);
	const handleModalSubmit = (v: string) => {
		handleModalClose();
		updateSpentTime(parseInt(v));
	};

	return (
		<>
			<View style={styles.wrapper}>
				<SpentTimeSection onSetManualPress={openModal} data={data} />
			</View>
			<Portal>
				<SetValueModal
					keyboardType="numeric"
					visible={modalVisible}
					onClose={handleModalClose}
					onSubmit={handleModalSubmit}
				/>
			</Portal>
		</>
	);
};

export default connect(null, mapDispatchToProps)(TimeSpentContainer);
