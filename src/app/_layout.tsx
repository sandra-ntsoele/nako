import { DefaultTheme, Stack, ThemeProvider } from "expo-router";

import { NakoTheme } from "@/constants/theme";

const navigationTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: NakoTheme.colors.background,
		border: NakoTheme.colors.border,
		card: NakoTheme.colors.background,
		primary: NakoTheme.colors.primary,
		text: NakoTheme.colors.textPrimary,
	},
};

export default function RootLayout() {
	return (
		<ThemeProvider value={navigationTheme}>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			/>
		</ThemeProvider>
	);
}
