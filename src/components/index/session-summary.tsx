import { Text, View } from "react-native";

import { ComponentStyles } from "@/constants/component-styles";

export function SessionSummary() {
	return (
		<>
			<View style={ComponentStyles.summaryCard}>
				<View style={ComponentStyles.summaryItem}>
					<Text style={ComponentStyles.caption}>Total Minutes</Text>
					<Text style={ComponentStyles.summaryValue}>0</Text>
				</View>

				<View style={ComponentStyles.summaryDivider} />

				<View style={ComponentStyles.summaryItem}>
					<Text style={ComponentStyles.caption}>Total Sessions</Text>
					<Text style={ComponentStyles.summaryValue}>0</Text>
				</View>
			</View>

			<Text style={ComponentStyles.emptyStateText}>
				No focus sessions yet. Start with one intentional block.
			</Text>
		</>
	);
}
