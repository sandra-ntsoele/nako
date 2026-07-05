import { DefaultTheme, ThemeProvider } from "expo-router";

import AppTabs from "@/components/app-tabs";
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

export default function TabLayout() {
	return (
		<ThemeProvider value={navigationTheme}>
			<AppTabs />
		</ThemeProvider>
	);
}
