import { Stack } from "expo-router";
import { Platform } from "react-native";

const ProtectedLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: "#1A1A1A" },
                headerTintColor: "white",
                headerBackTitleVisible: true,
                headerShadowVisible: false,
                headerTitle: ""
            }}
        >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="games/[id]" options={{ presentation: "modal", headerShown: Platform.OS === "ios" ? false : true }} />
            <Stack.Screen name="settings" options={{ headerTitle: "Settings" }} />
        </Stack>
    );
};

export default ProtectedLayout;
