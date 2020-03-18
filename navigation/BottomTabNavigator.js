import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";
// darkmode: #242C40
// dartext: #D0D0C0

export default function BottomTabNavigator({ navigation, route }) {
	// Set the header title on the parent stack navigator depending on the
	// currently active tab. Learn more in the documentation:
	// https://reactnavigation.org/docs/en/screen-options-resolution.html
	navigation.setOptions({ headerTitle: getHeaderTitle(route) });

	return (
		<BottomTab.Navigator theme={DarkTheme} initialRouteName={INITIAL_ROUTE_NAME}>
			{/* Game Screen */}
			<BottomTab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					title: "Trivia",
					tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="logo-game-controller-b" />,
				}}
			/>
			{/* Bottom tab button to leaderbaord */}
			<BottomTab.Screen
				name="Links"
				component={LinksScreen}
				options={{
					title: "Leaderboard",
					tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-stats" />,
				}}
			/>
		</BottomTab.Navigator>
	);
}

function getHeaderTitle(route) {
	const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
	switch (routeName) {
		case "Home":
			return "Trivia";
		case "Links":
			return "Leaderboard";
	}
}
