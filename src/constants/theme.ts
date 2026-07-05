import "@/global.css";

import { Platform } from "react-native";

export const NakoTheme = {
	colors: {
		background: "#FFFFFF",
		surface: "#F2F4F5",
		border: "#E4E7EB",
		primary: "#34C759",
		primaryGradientStart: "#27AE60",
		primaryGradientEnd: "#A3E635",
		danger: "#FF3B30",
		dangerSurface: "#FFEBEA",
		textPrimary: "#1C1C1E",
		textSecondary: "#6A6C70",
		textInverted: "#FFFFFF",
	},
	typography: {
		fontFamily: Platform.select({
			ios: "SF Pro Rounded",
			default: "system-ui",
			web: "var(--font-rounded)",
		}),
		sizes: {
			xs: 12,
			sm: 14,
			base: 16,
			lg: 20,
			xl: 24,
			display: 80,
		},
		weights: {
			regular: "400" as const,
			medium: "500" as const,
			semibold: "600" as const,
			bold: "700" as const,
		},
	},
	spacing: {
		xs: 4,
		sm: 8,
		md: 16,
		lg: 24,
		xl: 32,
	},
	radius: {
		sm: 8,
		md: 12,
		lg: 20,
		full: 9999,
	},
} as const;

export type ThemeType = typeof NakoTheme;

export const Colors = {
	light: {
		text: NakoTheme.colors.textPrimary,
		background: NakoTheme.colors.background,
		backgroundElement: NakoTheme.colors.surface,
		backgroundSelected: NakoTheme.colors.border,
		textSecondary: NakoTheme.colors.textSecondary,
		border: NakoTheme.colors.border,
		primary: NakoTheme.colors.primary,
		danger: NakoTheme.colors.danger,
		dangerSurface: NakoTheme.colors.dangerSurface,
		textInverted: NakoTheme.colors.textInverted,
	},
	dark: {
		text: NakoTheme.colors.textPrimary,
		background: NakoTheme.colors.background,
		backgroundElement: NakoTheme.colors.surface,
		backgroundSelected: NakoTheme.colors.border,
		textSecondary: NakoTheme.colors.textSecondary,
		border: NakoTheme.colors.border,
		primary: NakoTheme.colors.primary,
		danger: NakoTheme.colors.danger,
		dangerSurface: NakoTheme.colors.dangerSurface,
		textInverted: NakoTheme.colors.textInverted,
	},
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
	ios: {
		sans: "system-ui",
		serif: "ui-serif",
		rounded: "ui-rounded",
		mono: "ui-monospace",
	},
	default: {
		sans: "normal",
		serif: "serif",
		rounded: "normal",
		mono: "monospace",
	},
	web: {
		sans: "var(--font-display)",
		serif: "var(--font-serif)",
		rounded: "var(--font-rounded)",
		mono: "var(--font-mono)",
	},
});

export const Spacing = {
	half: 2,
	one: NakoTheme.spacing.xs,
	two: NakoTheme.spacing.sm,
	three: NakoTheme.spacing.md,
	four: NakoTheme.spacing.lg,
	five: NakoTheme.spacing.xl,
	six: 64,
} as const;

export const Radius = NakoTheme.radius;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
