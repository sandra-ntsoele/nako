import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Easing,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedView } from "@/components/themed-view";
import { ComponentStyles } from "@/constants/component-styles";
import {
    BottomTabInset,
    Colors,
    MaxContentWidth,
    NakoTheme,
    Spacing,
} from "@/constants/theme";
import { PlayIcon, StopCircle } from 'lucide-react-native';

const DURATION_MINUTES = [1, 45, 60];

const toMMSS = (minutes: number) => `${String(minutes).padStart(2, "0")}:00`;

interface TimeLeft {
    minutes: string,
    seconds: string
}

export default function HomeScreen() {
	const [selectedDurationIndex, setSelectedDurationIndex] = useState(0);
	const [trackWidth, setTrackWidth] = useState(0);
	const segmentWidth =
		(trackWidth - NakoTheme.spacing.xs * 2) / DURATION_MINUTES.length;
	const indicatorX = useRef(new Animated.Value(0)).current;
	const scaleValue = useRef(
		DURATION_MINUTES.map(() => new Animated.Value(1)),
    ).current;

    const [isRunning, setIsRunning] = useState<boolean>(false);
    const startTimestamp = Date.now();
    const targetTimestamp = startTimestamp + (DURATION_MINUTES[selectedDurationIndex] * 60000);
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        minutes: String(DURATION_MINUTES[0]).padStart(2, "0"),
        seconds: String(0).padStart(2, "0")
    });

    const calcTimeLeft = () => {
        const diff = targetTimestamp - Date.now();

        if (diff <= 0) return {
            minutes: String(0).padStart(2, "0"),
            seconds: String(0).padStart(2, "0")
        };

        return {
            minutes: String(Math.floor(diff / 60000) % 60).padStart(2, "0"),
            seconds: String(Math.floor(diff / 1000) % 60).padStart(2, "0")
        }
    }

    useEffect(() => {
        if (!isRunning) return;

        const timer = setInterval(() => {
            setTimeLeft(calcTimeLeft())
        }, 1000);

        return () => clearInterval(timer);
    }, [isRunning])

	useEffect(() => {
		if (trackWidth === 0) {
			return;
        }
        
        setTimeLeft({
            minutes: String(DURATION_MINUTES[selectedDurationIndex]).padStart(2, "0"),
            seconds: String(0).padStart(2, "0")
        })

		Animated.timing(indicatorX, {
			toValue:
				NakoTheme.spacing.xs + selectedDurationIndex * segmentWidth,
			duration: 220,
			easing: Easing.out(Easing.cubic),
			useNativeDriver: true,
		}).start();
    }, [indicatorX, selectedDurationIndex, segmentWidth, trackWidth]);
    

    const handleDurationPressIn = (index: number) => {
        setSelectedDurationIndex(index);

		Animated.spring(scaleValue[index], {
			toValue: 0.95,
			useNativeDriver: true,
		}).start();
	};

	const handleDurationPressOut = (index: number) => {
		Animated.spring(scaleValue[index], {
			toValue: 1,
			friction: 3,
			tension: 40,
			useNativeDriver: true,
		}).start();
    };
    
    const startTimer = () => {
        setIsRunning(true);
    }

    const stopTimer = () => {
        setIsRunning(false);

        setTimeLeft({
            minutes: String(DURATION_MINUTES[selectedDurationIndex]).padStart(2, "0"),
            seconds: String(0).padStart(2, "0")
        })
    }

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
                            {timeLeft.minutes}:{timeLeft.seconds}
                        </Text>

                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                gap: Spacing.five
                            }}
                        >
                            <TouchableOpacity
                                onPress={stopTimer}
                                style={[ComponentStyles.secondaryButton]}
                            >
                                <StopCircle width={56} color={Colors.light.danger}/>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                style={ComponentStyles.primaryButton}
                                onPress={startTimer}
                            >
                                <PlayIcon width={56} color={Colors.light.textInverted}/>
                            </TouchableOpacity>
                        </View>

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
									onPressIn={() => handleDurationPressIn(index)}
									onPressOut={() => handleDurationPressOut(index)}
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
