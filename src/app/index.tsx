import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DurationPicker } from "@/components/index/duration-picker";
import { SessionSummary } from "@/components/index/session-summary";
import { ThemedView } from "@/components/themed-view";
import { ComponentStyles } from "@/constants/component-styles";
import { SESSION_DURATION_OPTIONS, SessionDuration } from "@/constants/misc";
import {
    BottomTabInset,
    Colors,
    MaxContentWidth,
    Spacing,
} from "@/constants/theme";
import { sessionDurationToMMSS } from "@/utils/time.utils";
import { PlayIcon, StopCircle } from "lucide-react-native";

export default function HomeScreen() {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [selectedDuration, setSelectedDuration] = useState<SessionDuration>(SESSION_DURATION_OPTIONS[0]);

    const stopTimer = () => { }
    const startTimer = () => {
        
    }

	return (
		<ThemedView style={styles.container}>
			<SafeAreaView style={styles.safeArea}>
				<View style={[styles.content, ComponentStyles.section]}>

					{/* Timer Face */}
					<View
						style={[
							ComponentStyles.section,
							ComponentStyles.timerShell,
						]}
                    >
                        
                        <Text style={ComponentStyles.timerText}>
                            {sessionDurationToMMSS(selectedDuration)}
                        </Text>

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
                                onPress={stopTimer}
							>
								<StopCircle
									width={56}
									color={Colors.light.danger}
								/>
							</TouchableOpacity>

							<TouchableOpacity
                                style={ComponentStyles.primaryButton}
                                onPress={startTimer}
							>
								<PlayIcon
									width={56}
									color={Colors.light.textInverted}
								/>
							</TouchableOpacity>
						</View>
					</View>

					<DurationPicker
						selectedDuration={selectedDuration}
						onSelectedDuration={setSelectedDuration}
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
