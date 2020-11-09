import { StatusBar } from 'expo-status-bar';
import { registerRootComponent } from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const App: React.FC = () => {
	return (
		<View style={styles.container}>
			<Text>Open up App.tsx to start working on your app fasdfdsfsdf!</Text>
			<StatusBar style="auto" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

registerRootComponent(App);
export default App;
