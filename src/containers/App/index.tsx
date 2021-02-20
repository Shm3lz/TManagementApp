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
import { store } from '../../store';

import 'intl';
import { Platform } from 'react-native';

if (Platform.OS === 'android') {
	// See https://github.com/expo/expo/issues/6536 for this issue.
	if (typeof (Intl as any).__disableRegExpRestore === 'function') {
		(Intl as any).__disableRegExpRestore();
	}
}
import 'intl/locale-data/jsonp/en';

const theme = merge(NavigationDefaultTheme, PaperDefaultTheme);

const App: React.FC = () => {
	return (
		<StoreProvider store={store}>
			<PaperProvider theme={theme}>
				<Navigator theme={theme} />
			</PaperProvider>
		</StoreProvider>
	);
};

registerRootComponent(App);
// export default App;
