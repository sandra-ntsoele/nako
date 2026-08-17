import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Text, TouchableOpacity } from "react-native";

import { ComponentStyles } from "@/constants/component-styles";
import { NakoTheme } from "@/constants/theme";

type DurationPickerProps = {
	durations: number[];
	selectedIndex: number;
	onSelect: (index: number) => void;
};

export function DurationPicker({
	durations,
	selectedIndex,
	onSelect,
}: DurationPickerProps) {
	const [trackWidth, setTrackWidth] = useState(0);
	const segmentWidth =
		(trackWidth - NakoTheme.spacing.xs * 2) / durations.length;
	const indicatorX = useRef(new Animated.Value(0)).current;
	const scaleValue = useRef(
		durations.map(() => new Animated.Value(1)),
	).current;

	useEffect(() => {
		if (trackWidth === 0) {
			return;
		}

		Animated.timing(indicatorX, {
			toValue: NakoTheme.spacing.xs + selectedIndex * segmentWidth,
			duration: 220,
			easing: Easing.out(Easing.cubic),
			useNativeDriver: true,
		}).start();
	}, [indicatorX, selectedIndex, segmentWidth, trackWidth]);

	const handlePressIn = (index: number) => {
		onSelect(index);

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
		<Animated.View
			style={ComponentStyles.durationPicker}
			onLayout={(event) => setTrackWidth(event.nativeEvent.layout.width)}
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
			{durations.map((duration, index) => {
				const active = selectedIndex === index;

				return (
					<TouchableOpacity
						key={duration}
						style={[
							ComponentStyles.durationOption,
							{
								transform: [{ scale: scaleValue[index] }],
							},
						]}
						onPressIn={() => handlePressIn(index)}
						onPressOut={() => handlePressOut(index)}
					>
						<Text
							style={[
								ComponentStyles.durationText,
								active && ComponentStyles.durationTextSelected,
							]}
						>
							{duration}
						</Text>
					</TouchableOpacity>
				);
			})}
		</Animated.View>
	);
}
