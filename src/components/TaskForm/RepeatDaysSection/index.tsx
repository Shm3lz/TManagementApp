import * as React from 'react';
import { Switch, Title } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

import { WeekDay } from '../../../util/types';
import useSwitch from '../../../hooks/useSwitch';
import SimpleChip from '../../SimpleChip';
import { getWeekDayName, WEEK_DAYS } from '../../../helpers/time';

interface RepeatDaysSectionProps {
	onChange: (days: Array<WeekDay>) => void;
}

const styles = StyleSheet.create({
	sectionTitle: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	chips: {
		marginTop: 10,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});

const RepeatDaysSection: React.FC<RepeatDaysSectionProps> = ({ onChange }) => {
	const [repeatSwitch, toggleSwitch] = useSwitch(false);
	const handleSwitchToggle = () => {
		toggleSwitch();
		if (!repeatSwitch) changeRepeatDays([]);
	};

	const [repeatDays, setRepeatDays] = React.useState([] as WeekDay[]);
	const changeRepeatDays = (days: Array<WeekDay>) => {
		onChange(days);
		setRepeatDays(days);
	};

	const handleRepeatDayToggle = (day: WeekDay) => {
		if (repeatDays.includes(day)) {
			changeRepeatDays(repeatDays.filter(d => d !== day));
			return;
		}

		changeRepeatDays([...repeatDays, day]);
	};

	return (
		<View>
			<View style={styles.sectionTitle}>
				<Title>Repeat</Title>
				<Switch
					onValueChange={handleSwitchToggle}
					value={repeatSwitch}
				/>
			</View>
			{repeatSwitch &&
				<View style={styles.chips}>
					{Object.keys(WEEK_DAYS).map((day, i) => (
						<SimpleChip
							checked={repeatDays.includes(parseInt(day))}
							onPress={() => handleRepeatDayToggle(parseInt(day))}
							key={i}
							text={getWeekDayName(parseInt(day)).substr(0, 2)}
						/>
					))}
				</View>
			}
		</View>
	);
};

export default RepeatDaysSection;
