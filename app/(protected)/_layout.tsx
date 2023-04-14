import { Tabs, Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Image, TouchableOpacity } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/utils/retro-api";

const ProtectedLayout = () => {
    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap | undefined = undefined;

                    if (route.name === "profile") {
                        iconName = "ios-home-outline";
                    } else if (route.name === "latest-achievements") {
                        iconName = "ios-globe-outline";
                    } else if (route.name === "search") {
                        iconName = "ios-search-outline";
                    } else if (route.name === "top-ten") {
                        iconName = "ios-star-outline";
                    }

                    return <Ionicons name={iconName} size={size + 4} color={color} />;
                },
                headerStyle: { backgroundColor: "#1a1a1a" },
                headerTintColor: "white",
                headerBackTitleVisible: true,
                headerShadowVisible: false,
                headerTitle: "",
                headerLeft: () => (
                    <View className="flex justify-center items-center px-4 pb-1">
                        <Image source={require("../../assets/RA-small.png")} className="w-14 h-8" />
                    </View>
                ),
                headerRight: () => <BurgerMenu />,
                tabBarStyle: { backgroundColor: "#1a1a1a", borderTopColor: "#1a1a1a" },
                tabBarShowLabel: false,
                lazy: false
            })}
        >
            <Tabs.Screen name="index" options={{ href: null }} />
            <Tabs.Screen name="profile" options={{ href: "/profile" }} />
            <Tabs.Screen name="latest-achievements" options={{ href: "/latest-achievements" }} />
            <Tabs.Screen name="search" options={{ href: "/search" }} />
            <Tabs.Screen name="top-ten" options={{ href: "/top-ten" }} />
        </Tabs>
    );
};

const BurgerMenu = () => {
    const { showActionSheetWithOptions } = useActionSheet();
    const router = useRouter();
    const queryClient = useQueryClient();
    const { mutate: logoutMutation } = useMutation(logout, {
        onSuccess: () => {
            queryClient.invalidateQueries(["isLoggedIn"]);
        }
    });

    return (
        <TouchableOpacity
            className="px-4"
            onPress={() =>
                showActionSheetWithOptions(
                    {
                        options: ["Settings", "Logout", "Cancel"],
                        cancelButtonIndex: 2
                    },
                    buttonIndex => {
                        switch (buttonIndex) {
                            case 0:
                                router.push("/settings");
                                break;
                            case 1:
                                logoutMutation();
                                break;
                        }
                    }
                )
            }
        >
            <Ionicons name="menu" size={35} color="white" />
        </TouchableOpacity>
    );
};

export default ProtectedLayout;
