import { View } from "react-native";
import { cn } from "../utils/cn";

export const Container = ({ children, textClassName }: { children: React.ReactNode; textClassName?: string }) => {
    return <View className={cn("flex items-center bg-black py-1 h-full w-full", textClassName)}>{children}</View>
};
