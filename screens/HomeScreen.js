import * as React from "react";
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as WebBrowser from "expo-web-browser";
import SubmitName from "../components/SubmitName";
import TriviaQuestions from "../components/TriviaQuestions";
// darkmode: #242C40
// dartext: #D0D0C0

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			questions: "",
			nameSubmit: false,
			name: "",
		};
	}
	nameSubmit = () => {
		fetch("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple").then((res) => {
			res.json().then((questions) => {
				this.setState({ questions: questions.results, nameSubmit: true });
			});
		});
	};
	setNameSubmit = (nameSubmit) => {
		this.setState({
			nameSubmit,
		});
	};
	render() {
		if (this.state.nameSubmit) {
			return <TriviaQuestions questions={this.state.questions} setNameSubmit={this.setNameSubmit} />;
		} else {
			return <SubmitName nameSubmit={this.nameSubmit} />;
		}
	}
}

HomeScreen.navigationOptions = {
	header: null,
};

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
	contentContainer: {
		paddingTop: 30,
	},
	welcomeContainer: {
		alignItems: "center",
		marginTop: 10,
		marginBottom: 20,
	},
	welcomeImage: {
		width: 100,
		height: 80,
		resizeMode: "contain",
		marginTop: 3,
		marginLeft: -10,
	},
	getStartedContainer: {
		alignItems: "center",
		marginHorizontal: 50,
	},
	homeScreenFilename: {
		marginVertical: 7,
	},
	codeHighlightText: {
		color: "rgba(96,100,109, 0.8)",
	},
	codeHighlightContainer: {
		backgroundColor: "rgba(0,0,0,0.05)",
		borderRadius: 3,
		paddingHorizontal: 4,
	},
	getStartedText: {
		fontSize: 17,
		color: "rgba(96,100,109, 1)",
		lineHeight: 24,
		textAlign: "center",
	},
	tabBarInfoContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		...Platform.select({
			ios: {
				shadowColor: "black",
				shadowOffset: { width: 0, height: -3 },
				shadowOpacity: 0.1,
				shadowRadius: 3,
			},
			android: {
				elevation: 20,
			},
		}),
		alignItems: "center",
		backgroundColor: "#fbfbfb",
		paddingVertical: 20,
	},
	tabBarInfoText: {
		fontSize: 17,
		color: "rgba(96,100,109, 1)",
		textAlign: "center",
	},
	navigationFilename: {
		marginTop: 5,
	},
	helpContainer: {
		marginTop: 15,
		alignItems: "center",
	},
	helpLink: {
		paddingVertical: 15,
	},
	helpLinkText: {
		fontSize: 14,
		color: "#2e78b7",
	},
});
