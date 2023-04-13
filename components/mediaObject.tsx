import { TouchableOpacity, View, Image, Text } from "react-native";

interface MediaObjectProps {
    imageUrl: string;
    title: string;
    subtitle?: string;
    detailLine1: string;
    detailLine2?: string;
    detailLine3?: string;
    onPress?: (() => void) | undefined;
}

interface ConditionalTouchableWrapperProps {
    onPress?: (() => void) | undefined;
    children: React.ReactNode;
}

export const MediaObject = ({ imageUrl, title, subtitle, detailLine1, detailLine2, detailLine3, onPress }: MediaObjectProps) => (
    <ConditionalTouchableWrapper onPress={onPress}>
        <View className="flex flex-row pt-4 pr-4 items-start ml-4">
            <View className="flex justify-center content-center pr-5">
                <Image className="w-20 h-20" source={{ uri: `https://retroachievements.org${imageUrl}` }} resizeMode="stretch" />
            </View>
            <View className="flex-shrink">
                <Text numberOfLines={1} className="text-white font-bold text-sm pb-1 md:text-xl">
                    {title}
                </Text>
                {subtitle && <Text className="text-fadedGrey leading-none text-sm md:text-xl">{subtitle}</Text>}
                <Text numberOfLines={2} className="text-fadedGrey leading-none text-sm md:text-xl">
                    {detailLine1}
                </Text>
                {detailLine2 && <Text className="text-fadedGrey leading-none text-sm md:text-xl">{detailLine2}</Text>}
                {detailLine3 && <Text className="text-fadedGrey leading-none text-sm md:text-xl">{detailLine3}</Text>}
            </View>
        </View>
    </ConditionalTouchableWrapper>
);

const ConditionalTouchableWrapper = ({ onPress, children }: ConditionalTouchableWrapperProps) => {
    if (onPress) {
        return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>;
    }
    return <>{children}</>;
};
