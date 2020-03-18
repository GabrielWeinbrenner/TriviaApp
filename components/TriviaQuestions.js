import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { MonoText } from "../components/StyledText";
import { FlatList } from "react-native-gesture-handler";
import { uploadScore } from "../actions/score";
import { connect } from "react-redux";

class TriviaQuestions extends Component {
	constructor(props) {
		super(props);
		var a = [...Array(this.props.questions.length + 1).keys()].slice(1);
		var b = a.map((x) => {
			return {
				questionNum: x,
				wasCorrect: null,
			};
		});
		this.state = {
			currentQuestion: 0,
			questionsRight: 0,
			questionLog: b,
		};
	}
	checkIfCorrect = (item) => {
		if (item === this.props.questions[this.state.currentQuestion].correct_answer) {
			var obj = this.state.questionLog[this.state.currentQuestion];
			obj.wasCorrect = true;
			var questLog = this.state.questionLog;
			questLog[this.state.currentQuestion] = obj;
			this.setState({
				currentQuestion: this.state.currentQuestion + 1,
				questionsRight: this.state.questionsRight + 1,
				questionLog: questLog,
			});
		} else {
			var obj = this.state.questionLog[this.state.currentQuestion];
			obj.wasCorrect = false;
			var questLog = this.state.questionLog;
			questLog[this.state.currentQuestion] = obj;

			this.setState({
				currentQuestion: this.state.currentQuestion + 1,
				questionLog: questLog,
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
	convert = (item) => {
		item = item.replace(/&#039;/g, "'");
		item = item.replace(/&quot;/g, '"');
		return item;
	};

	render() {
		var colors = this.shuffle(["#008000", "#cc2900", "#cca300", "#0052cc"]);

		if (this.state.currentQuestion == this.props.questions.length) {
			this.props.uploadScore({
				name: this.props.name,
				score: this.state.questionsRight,
			});

			this.props.setNameSubmit(false);
			return (
				<View>
					<Text>Done</Text>
				</View>
			);
		} else {
			var answers = this.shuffle(
				this.props.questions[this.state.currentQuestion].incorrect_answers.concat(
					this.props.questions[this.state.currentQuestion].correct_answer
				)
			);
			// Math.floor(Math.random() * 280) + 270
			answers = answers.map((x, index) => {
				return {
					question: x,
					color: colors[index],
					rotate: index == 2 || index == 0 ? "-5deg" : "5deg",
				};
			});
			return (
				<View style={styles.container}>
					<View>
						<MonoText style={styles.questionText}>
							{" "}
							{this.convert(this.props.questions[this.state.currentQuestion].question)}{" "}
						</MonoText>
					</View>
					<View style={[styles.answersContainer]}>
						<FlatList
							data={answers}
							numColumns={2}
							renderItem={({ item, index }) => (
								<TouchableOpacity
									onPress={() => this.checkIfCorrect(item.question)}
									style={[
										styles.answerContainer,
										{ backgroundColor: item.color },
										{ transform: [{ rotate: item.rotate }] },
									]}>
									<Text style={styles.answerText}>{this.convert(item.question)}</Text>
								</TouchableOpacity>
							)}
							keyExtractor={(item, index) => {
								index.toString();
							}}
						/>
					</View>
					<View style={styles.questLog}>
						<ScrollView>
							<FlatList
								contentContainerStyle={{
									alignSelf: "flex-start",
								}}
								numColumns={this.state.questionLog.length / 2}
								showsVerticalScrollIndicator={false}
								showsHorizontalScrollIndicator={false}
								data={this.state.questionLog}
								renderItem={({ item }) => (
									<View
										style={[
											styles.questionsNumber,
											item.wasCorrect !== null
												? item.wasCorrect
													? styles.questionCorrect
													: styles.questionIncorrect
												: styles.questionNotSolved,
										]}>
										<Text>{item.questionNum}</Text>
									</View>
								)}
							/>
						</ScrollView>
					</View>
				</View>
			);
		}
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		uploadScore: (score) => dispatch(uploadScore(score)),
	};
};

export default connect(null, mapDispatchToProps)(TriviaQuestions);

// darkmode: #242C40
// dartext: #D0D0C0

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#242C40",
		alignItems: "center",
	},
	questionText: {
		marginTop: 20,
		height: 120,
		width: 400,
		fontSize: 20,
		textAlign: "center",
		color: "#D0D0C0",
	},
	answersContainer: {
		marginTop: 30,
		height: 500,
		width: 400,
		backgroundColor: "#242C40",
	},
	answerText: {
		fontSize: 20,
		color: "#D0D0C0",
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
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.0,
		elevation: 24,
	},
	questLog: {
		top: -70,
	},
	questionsNumber: {
		alignItems: "center",
		justifyContent: "center",
		height: 30,
		margin: 10,
		marginRight: 20,
		marginLeft: 20,
		width: 30,
		borderRadius: 15,
		borderColor: "black",
	},
	questionCorrect: {
		// borderWidth: 1,
		// borderColor: "black",
		backgroundColor: "#00b300",
	},
	questionIncorrect: {
		// borderWidth: 1,
		// borderColor: "black",
		backgroundColor: "#ff3300",
	},
	questionNotSolved: {
		borderWidth: 1,
		borderColor: "black",
		backgroundColor: "white",
	},
});
