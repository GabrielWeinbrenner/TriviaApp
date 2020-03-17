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
			questionLog: [],
		};
	}
	checkIfCorrect = (item) => {
		if (item === this.props.questions[this.state.currentQuestion].correct_answer) {
			console.log("CORRECT");
			var question = {
				num: this.state.currentQuestion + 1,
				wasCorrect: true,
			};
			var newArr = this.state.questionLog.concat(question);
			this.setState({
				currentQuestion: this.state.currentQuestion + 1,
				questionsRight: this.state.questionsRight + 1,
				questionLog: newArr,
			});
		} else {
			question = {
				num: this.state.currentQuestion + 1,
				wasCorrect: false,
			};
			var newArr = this.state.questionLog.concat(question);

			this.setState({
				currentQuestion: this.state.currentQuestion + 1,

				questionLog: newArr,
			});
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
								style={styles.answerContainer}>
								<Text style={styles.answerText}>{item}</Text>
							</TouchableOpacity>
						)}
						keyExtractor={(item, index) => {
							index.toString();
						}}
					/>
				</View>
				<View style={styles.correctQuestions}>
					<FlatList
						data={this.state.questionLog}
						horizontal={true}
						renderItem={({ item }) => (
							<View
								style={[
									styles.questionsNumber,
									item.wasCorrect ? styles.questionCorrect : styles.questionIncorrect,
								]}>
								<Text>{item.num}</Text>
							</View>
						)}
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
		height: 100,
		width: 400,
		fontSize: 20,
		textAlign: "center",
	},
	answersContainer: {
		marginTop: 30,
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
	correctQuestions: {
		position: "relative",

		marginBottom: 20,
	},
	questionsNumber: {
		alignItems: "center",
		justifyContent: "center",

		height: 30,
		margin: 20,
		width: 30,
		borderRadius: 15,
		borderColor: "black",
	},
	questionCorrect: {
		backgroundColor: "#00b300",
	},
	questionIncorrect: {
		backgroundColor: "#ff3300",
	},
});
