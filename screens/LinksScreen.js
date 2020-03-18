import * as React from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import { connect } from "react-redux";

class LinksScreen extends React.Component {
	render() {
		console.log(this.props);

		return (
			<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
				<FlatList
					data={this.props.scores}
					renderItem={({ item }) => (
						<View style={styles.option}>
							<Text style={styles.optionText}>
								{item.name} | {item.score}
							</Text>
						</View>
					)}
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
		paddingTop: 15,
	},
	optionIconContainer: {
		marginRight: 12,
	},
	option: {
		backgroundColor: "#242C40",
		paddingHorizontal: 15,
		paddingVertical: 15,
		borderWidth: StyleSheet.hairlineWidth,
		borderBottomWidth: 0,
		borderColor: "#D0D0C0",
	},
	lastOption: {
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	optionText: {
		color: "#D0D0C0",
		fontSize: 15,
		alignSelf: "flex-start",
		marginTop: 1,
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
