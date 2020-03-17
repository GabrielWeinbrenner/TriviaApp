import * as React from "react";
import { Text } from "react-native";
import * as Font from "expo-font";

export function MonoText(props) {
	return <Text {...props} style={[props.style]} />;
}
