console.disableYellowBox = true;

import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/BottomTabNavigator";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers/scoreReducer";

import useLinking from "./navigation/useLinking";
const store = createStore(reducers);

const Stack = createStackNavigator();
// darkmode: #242C40
// dartext: #D0D0C0
export default function App(props) {
	const MyTheme = {
		dark: true,
		colors: {
			primary: "#D0D0C0",
			background: "#242C40",
			card: "#242C40",
			text: "#D0D0C0",
			border: "rgb(199, 199, 204)",
		},
	};
	const [isLoadingComplete, setLoadingComplete] = React.useState(false);
	const [initialNavigationState, setInitialNavigationState] = React.useState();
	const containerRef = React.useRef();
	const { getInitialState } = useLinking(containerRef);

	// Load any resources or data that we need prior to rendering the app
	React.useEffect(() => {
		async function loadResourcesAndDataAsync() {
			try {
				SplashScreen.preventAutoHide();

				// Load our initial navigation state
				setInitialNavigationState(await getInitialState());

				// Load fonts
				await Font.loadAsync({
					...Ionicons.font,
					"space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
				});
			} catch (e) {
				// We might want to provide this error information to an error reporting service
				console.warn(e);
			} finally {
				setLoadingComplete(true);
				SplashScreen.hide();
			}
		}

		loadResourcesAndDataAsync();
	}, []);

	if (!isLoadingComplete && !props.skipLoadingScreen) {
		return null;
	} else {
		return (
			<Provider store={store}>
				<View style={styles.container}>
					{Platform.OS === "ios" && <StatusBar barStyle="default" />}
					<NavigationContainer theme={MyTheme} ref={containerRef} initialState={initialNavigationState}>
						<Stack.Navigator>
							<Stack.Screen name="Root" component={BottomTabNavigator} />
						</Stack.Navigator>
					</NavigationContainer>
				</View>
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});
