import { Stack } from "expo-router";
import { useAppStyles } from "../../constants/Styles";

export default function AuthLayout() {
    const { styles } = useAppStyles();
    return (
        <Stack screenOptions={{ headerShown: false, headerStyle: { backgroundColor: styles.background } }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" options={{ animation: 'slide_from_right', headerShown: false }} />
            <Stack.Screen name="signup" options={{ animation: 'slide_from_left', headerShown: false }} />
        </Stack>
    );
}
