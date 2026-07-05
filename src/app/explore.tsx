import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";

export default function HistoryScreen() {
	return (
		<ThemedView style={styles.container}>
			<SafeAreaView style={styles.safeArea} />
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
	},
	safeArea: {
		flex: 1,
		maxWidth: MaxContentWidth,
		paddingBottom: BottomTabInset + Spacing.three,
		paddingHorizontal: Spacing.four,
	},
});
