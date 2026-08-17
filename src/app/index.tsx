import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DurationPicker } from "@/components/index/duration-picker";
import { SessionSummary } from "@/components/index/session-summary";
import { ThemedView } from "@/components/themed-view";
import { ComponentStyles } from "@/constants/component-styles";
import {
	BottomTabInset,
	Colors,
	MaxContentWidth,
	Spacing,
} from "@/constants/theme";
import { PlayIcon, StopCircle } from "lucide-react-native";

const DURATION_MINUTES = [1, 45, 60];

export default function HomeScreen() {
	const [selectedDurationIndex, setSelectedDurationIndex] = useState(0);

	return (
		<ThemedView style={styles.container}>
			<SafeAreaView style={styles.safeArea}>
				<View style={[styles.content, ComponentStyles.section]}>
					{/* Header */}
					<View style={ComponentStyles.section}>
						<Text style={ComponentStyles.title}>Nako</Text>
						<Text style={ComponentStyles.caption}>
							Use time intentionally
						</Text>
					</View>

					{/* Timer Face */}
					<View
						style={[
							ComponentStyles.section,
							ComponentStyles.timerShell,
						]}
					>
						<Text style={ComponentStyles.timerText}>MM : SS</Text>

						<View
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								gap: Spacing.five,
							}}
						>
							<TouchableOpacity
								style={[ComponentStyles.secondaryButton]}
							>
								<StopCircle
									width={56}
									color={Colors.light.danger}
								/>
							</TouchableOpacity>

							<TouchableOpacity
								style={ComponentStyles.primaryButton}
							>
								<PlayIcon
									width={56}
									color={Colors.light.textInverted}
								/>
							</TouchableOpacity>
						</View>
					</View>

					<DurationPicker
						durations={DURATION_MINUTES}
						selectedIndex={selectedDurationIndex}
						onSelect={setSelectedDurationIndex}
					/>

					<SessionSummary />
				</View>
			</SafeAreaView>
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
	content: {
		flex: 1,
	},
});
