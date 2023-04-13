import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Slot, SplashScreen, useRouter, useSegments } from "expo-router";
import { getIsLoggedIn } from "@/utils/retro-api";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const queryClient = new QueryClient();

const AppLayout = () => {
    const segments = useSegments();
    const router = useRouter();
    const { isLoading, data: isLoggedIn } = useQuery(["isLoggedIn"], getIsLoggedIn);
    const onLoginPage = segments.includes("login");

    if (isLoading) {
        return <SplashScreen />;
    }

    if (!isLoggedIn && !onLoginPage) {
        router.replace("/login");
    }

    if (isLoggedIn && onLoginPage) {
        router.replace("/");
    }

    return (
        <SafeAreaView className="flex items-center bg-black py-1 h-full w-full">
            <Slot />
        </SafeAreaView>
    );
};

const AppWrapper = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AppLayout />
        </QueryClientProvider>
    );
};

export default AppWrapper;
