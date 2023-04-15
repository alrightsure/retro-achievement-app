import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Slot, SplashScreen, useRouter, useSegments } from "expo-router";
import { getIsLoggedIn } from "@/utils/retro-api";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { useFonts } from "expo-font";

const queryClient = new QueryClient();

const AppLayout = () => {
    const segments = useSegments();
    const router = useRouter();
    const { isLoading, data: isLoggedIn } = useQuery(["isLoggedIn"], getIsLoggedIn);
    const [loaded] = useFonts({
        AvantGarde: require("../assets/fonts/ITCAvantGardeStd-Md.otf"),
        AvantGardeBold: require("../assets/fonts/ITCAvantGardeStd-Bold.otf")
    });
    const onLoginPage = segments.includes("login");

    if (isLoading || !loaded) {
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
