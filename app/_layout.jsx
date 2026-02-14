import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAppStyles } from "./_Styles";

export default function RootLayout() {
    const { isDark } = useAppStyles();

    return (
        <>
            <StatusBar style={isDark ? "light" : "dark"} />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(tabs)" />
            </Stack>
        </>
    );
}