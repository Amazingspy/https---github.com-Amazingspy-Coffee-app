import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAppStyles } from "../constants/Styles";
import { CartProvider } from "../context/CartContext";

export default function RootLayout() {
    const { isDark } = useAppStyles();

    return (
        <CartProvider>
            <StatusBar style={isDark ? "light" : "dark"} />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(tabs)" />
            </Stack>
        </CartProvider>
    );
}