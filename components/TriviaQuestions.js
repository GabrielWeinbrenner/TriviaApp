import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { MonoText } from "../components/StyledText";
import { FlatList } from "react-native-gesture-handler";

export default class TriviaQuestions extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentQuestion: 0,
			questionsRight: 0,
		};
	}
	checkIfCorrect = (item) => {
		if (item === this.props.questions[this.state.currentQuestion].correct_answer) {
			console.log("CORRECT");
			this.setState({
				currentQuestion: this.state.currentQuestion + 1,
			});
			return true;
		} else {
			this.setState({
				currentQuestion: this.state.currentQuestion + 1,
			});
			return false;
		}
	};
	shuffle = (a) => {
		var j, x, i;
		for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
		}
		return a;
	};
	render() {
		var answers = this.shuffle(
			this.props.questions[this.state.currentQuestion].incorrect_answers.concat(
				this.props.questions[this.state.currentQuestion].correct_answer
			)
		);
		console.log(answers);
		return (
			<View style={styles.container}>
				<View>
					<MonoText style={styles.questionText}> {this.props.questions[this.state.currentQuestion].question} </MonoText>
				</View>
				<View style={styles.answersContainer}>
					<FlatList
						data={answers}
						numColumns={2}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => this.checkIfCorrect(item)}
								style={styles.answerContainer}
								key={id}>
								<Text style={styles.answerText}>{item}</Text>
							</TouchableOpacity>
						)}
						keyExtractor={(item, index) => {
							index.toString();
						}}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
	},
	questionText: {
		marginTop: 20,
		fontSize: 20,
		textAlign: "center",
	},
	answersContainer: {
		marginTop: 50,
		height: 500,
		width: 400,
		backgroundColor: "white",
	},
	answerText: {
		fontSize: 20,
		color: "black",
	},
	answerContainer: {
		height: 170,
		width: 170,
		borderRadius: 20,
		marginLeft: 16,
		margin: 12,
		borderColor: "black",
		borderWidth: 1,
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
	},
});
