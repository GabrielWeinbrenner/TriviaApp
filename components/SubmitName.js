import React, { Component } from "react";
import { StyleSheet, View, Image, Button, TextInput, TouchableHighlightComponent } from "react-native";
import { MonoText } from "../components/StyledText";

export default class SubmitName extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
		};
	}
	render() {
		return (
			<View style={styles.container}>
				<MonoText style={styles.welcomeText}>Welcome to Trivia!!</MonoText>
				<View style={styles.welcomeContainer}>
					<Image
						source={__DEV__ ? require("../assets/images/brain.png") : require("../assets/images/brain.png")}
						style={[styles.welcomeImage, { width: 300, height: 300 }]}
					/>
				</View>
				<View>
					<View></View>
					<MonoText style={styles.nameLabel}>ENTER YOUR NAME:</MonoText>
					<View style={styles.nameInput}>
						<TextInput
							style={{ color: "#D0D0C0" }}
							onChangeText={(name) => this.setState({ name })}
							value={this.state.name}
						/>
					</View>
					<View style={styles.submitButton}>
						<Button style={styles.submitButton} title="SUBMIT" onPress={this.props.nameSubmit} />
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#242C40",
		justifyContent: "center",
		alignItems: "center",
	},
	welcomeText: {
		marginBottom: 20,
		color: "rgba(0,0,0,0.4)",
		fontSize: 30,
		color: "#D0D0C0",
		textAlign: "center",
	},
	nameLabel: {
		color: "#D0D0C0",
		marginTop: 10,
		letterSpacing: 2,
		fontSize: 16,
	},
	submitButton: { marginTop: 20, color: "#D0D0C0" },
	nameInput: {
		color: "#D0D0C0",
		backgroundColor: "#242C40",
		borderBottomColor: "#D0D0C0",
		borderBottomWidth: 1,
		marginTop: 20,
		fontSize: 20,
		width: 300,
	},
});
