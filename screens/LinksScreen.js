import * as React from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import { connect } from "react-redux";
import { MonoText } from "../components/StyledText";

class LinksScreen extends React.Component {
	render() {
		console.log(this.props);

		return (
			<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
				<FlatList
					data={this.props.scores}
					renderItem={({ item }) => (
						<View style={[styles.option, { flex: 1, flexDirection: "row", margin: 1 }]}>
							<MonoText style={[styles.optionText, { width: 120 }]}> {item.place}</MonoText>
							<MonoText style={[styles.optionText, { width: 180 }]}> {item.name}</MonoText>
							<MonoText style={[styles.optionText, { width: 110 }]}> {item.score}</MonoText>
						</View>
					)}
					ListHeaderComponent={
						<View style={[styles.option, { flex: 1, flexDirection: "row", margin: 1 }]}>
							<MonoText style={[styles.optionText, { width: 120, fontSize: 20 }]}> PLACE</MonoText>
							<MonoText style={[styles.optionText, { width: 180, fontSize: 20 }]}> NAME</MonoText>
							<MonoText style={[styles.optionText, { width: 110, fontSize: 20 }]}>SCORE</MonoText>
						</View>
					}
					keyExtractor={(item) => item.id}
				/>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#242C40",
	},

	contentContainer: {
		paddingTop: 0,
	},
	option: {
		backgroundColor: "#242C40",

		borderWidth: StyleSheet.hairlineWidth,
		borderBottomWidth: 1,
		borderColor: "#D0D0C0",
	},
	optionText: {
		width: 75,
		height: 75,
		color: "#D0D0C0",
		fontSize: 20,
		marginTop: 1,
		padding: 20,
		paddingRight: 30,
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
});
function mapStateToProps(state) {
	console.log(state);
	return {
		scores: state.scores,
	};
}

// wrapping the component within the connect HOC and calling the default function directly
export default connect(mapStateToProps)(LinksScreen);
