import { useEffect, useRef, useState } from "react";
import {
	Animated,
	Easing,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedView } from "@/components/themed-view";
import { ComponentStyles } from "@/constants/component-styles";
import {
	BottomTabInset,
	MaxContentWidth,
	NakoTheme,
	Spacing,
} from "@/constants/theme";

const DURATION_MINUTES = [25, 45, 60];

const toMMSS = (minutes: number) => `${String(minutes).padStart(2, "0")}:00`;

export default function HomeScreen() {
	const [selectedDurationIndex, setSelectedDurationIndex] = useState(0);
	const [trackWidth, setTrackWidth] = useState(0);
	const segmentWidth =
		(trackWidth - NakoTheme.spacing.xs * 2) / DURATION_MINUTES.length;
	const indicatorX = useRef(new Animated.Value(0)).current;
	const scaleValue = useRef(
		DURATION_MINUTES.map(() => new Animated.Value(1)),
	).current;

	useEffect(() => {
		if (trackWidth === 0) {
			return;
		}

		Animated.timing(indicatorX, {
			toValue:
				NakoTheme.spacing.xs + selectedDurationIndex * segmentWidth,
			duration: 220,
			easing: Easing.out(Easing.cubic),
			useNativeDriver: true,
		}).start();
	}, [indicatorX, selectedDurationIndex, segmentWidth, trackWidth]);

	const handlePressIn = (index: number) => {
		setSelectedDurationIndex(index);

		Animated.spring(scaleValue[index], {
			toValue: 0.95,
			useNativeDriver: true,
		}).start();
	};

	const handlePressOut = (index: number) => {
		Animated.spring(scaleValue[index], {
			toValue: 1,
			friction: 3,
			tension: 40,
			useNativeDriver: true,
		}).start();
	};

	return (
		<ThemedView style={styles.container}>
			<SafeAreaView style={styles.safeArea}>
				<View style={[styles.content, ComponentStyles.section]}>
					<View style={ComponentStyles.section}>
						<Text style={ComponentStyles.title}>Nako</Text>
						<Text style={ComponentStyles.caption}>
							Use time intentionally
						</Text>
					</View>

					<View
						style={[
							ComponentStyles.section,
							ComponentStyles.timerShell,
						]}
					>
						<Text style={ComponentStyles.timerText}>
							{toMMSS(DURATION_MINUTES[selectedDurationIndex])}
						</Text>
					</View>

					<View
						style={ComponentStyles.durationPicker}
						onLayout={(event) =>
							setTrackWidth(event.nativeEvent.layout.width)
						}
					>
						{trackWidth > 0 && (
							<Animated.View
								style={[
									ComponentStyles.durationIndicator,
									{
										width: segmentWidth,
										transform: [{ translateX: indicatorX }],
									},
								]}
							/>
						)}
						{DURATION_MINUTES.map((duration, index) => {
							const active = selectedDurationIndex === index;

							return (
								<TouchableOpacity
									key={duration}
									style={[
										ComponentStyles.durationOption,
										{
											transform: [
												{ scale: scaleValue[index] },
											],
										},
									]}
									onPressIn={() => handlePressIn(index)}
									onPressOut={() => handlePressOut(index)}
								>
									<Text
										style={[
											ComponentStyles.durationText,
											active &&
												ComponentStyles.durationTextSelected,
										]}
									>
										{duration}
									</Text>
								</TouchableOpacity>
							);
						})}
					</View>

					<View style={ComponentStyles.summaryCard}>
						<View style={ComponentStyles.summaryItem}>
							<Text style={ComponentStyles.caption}>
								Total Minutes
							</Text>
							<Text style={ComponentStyles.summaryValue}>0</Text>
						</View>

						<View style={ComponentStyles.summaryDivider} />

						<View style={ComponentStyles.summaryItem}>
							<Text style={ComponentStyles.caption}>
								Total Sessions
							</Text>
							<Text style={ComponentStyles.summaryValue}>0</Text>
						</View>
					</View>

					<Text style={ComponentStyles.emptyStateText}>
						No focus sessions yet. Start with one intentional block.
					</Text>
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
