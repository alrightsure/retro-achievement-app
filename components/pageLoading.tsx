import { ActivityIndicator, View } from "react-native";

export const PageLoading = ({ isFullScreen }: { isFullScreen?: boolean }) => {
    if (isFullScreen) {
        return (
            <View className="flex absolute justify-center flex-1 h-full w-full bg-darkGrey z-10" style={{ opacity: 0.7 }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View className="h-full justify-center">
            <ActivityIndicator size="large" />
        </View>
    );
};
