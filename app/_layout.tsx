import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Slot, SplashScreen, useRouter, useSegments } from "expo-router";
import { getIsLoggedIn } from "@/utils/retro-api";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

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

    return <Slot />;
};

const AppLayoutWrapper = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ActionSheetProvider>
                <AppLayout />
            </ActionSheetProvider>
        </QueryClientProvider>
    );
};

export default AppLayoutWrapper;
