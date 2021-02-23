import * as React from 'react';
import { Chip, Switch, Title } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { WeekDay } from '../../../util/types';
import useSwitch from '../../../hooks/useSwitch';

interface RepeatDaysSectionProps {
	onChange: (days: Array<WeekDay>) => void;
}

const weekDays = {
	monday: WeekDay.Monday,
	tuesday: WeekDay.Tuesday,
	wednesday: WeekDay.Wednesday,
	thursday: WeekDay.Thursday,
	friday: WeekDay.Friday,
	saturday: WeekDay.Saturday,
	sunday: WeekDay.Sunday,
};

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
		if (!repeatSwitch) setRepeatDays([]);
	};

	const [repeatDays, setRepeatDays] = React.useState([] as WeekDay[]);
	const handleRepeatDayToggle = (day: WeekDay) => {
		if (repeatDays.includes(day)) {
			setRepeatDays(repeatDays.filter(d => d !== day));
			onChange(repeatDays);
			return;
		}

		setRepeatDays([...repeatDays, day]);
		onChange(repeatDays);
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
					{Object.values(weekDays).map((day, i) => (
						<Chip
							selected={repeatDays.includes(day)}
							onPress={() => handleRepeatDayToggle(day)}
							mode="outlined"
							key={i}
						>
							{day}
						</Chip>
					))}
				</View>
			}
		</View>
	);
};

export default RepeatDaysSection;
