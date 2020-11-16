import { registerRootComponent } from 'expo';
import React from 'react';
import {
	Provider as PaperProvider,
	DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { Provider as StoreProvider } from 'react-redux';
import merge from 'deepmerge';

import Navigator from '../Navigator';

const theme = merge(NavigationDefaultTheme, PaperDefaultTheme);

const App: React.FC = () => {
	return (
		<PaperProvider theme={theme}>
			<Navigator theme={theme} />
		</PaperProvider>
	);
};

registerRootComponent(App);
export default App;
