import { TouchableOpacity, View, Image, Text } from "react-native";
import { Link } from "expo-router";

interface MediaObjectProps {
    imageUrl: string;
    title: string;
    subtitle?: string;
    detailLine1: string;
    detailLine2?: string;
    detailLine3?: string;
    href?: string | undefined;
}

interface ConditionalLinkWrapper {
    href?: string | undefined;
    children: React.ReactNode;
}

export const MediaObject = ({ imageUrl, title, subtitle, detailLine1, detailLine2, detailLine3, href }: MediaObjectProps) => (
    <ConditionalLinkWrapper href={href}>
        <View className="flex flex-row pt-4 pr-4 items-start ml-4">
            <View className="flex justify-center content-center pr-5">
                <Image className="w-20 h-20" source={{ uri: `https://retroachievements.org${imageUrl}` }} resizeMode="stretch" />
            </View>
            <View className="flex-shrink">
                <Text numberOfLines={1} className="text-white font-avantGardeBold text-sm pb-1 md:text-xl" style={{ lineHeight: 16 }}>
                    {title}
                </Text>
                {subtitle && (
                    <Text className="text-fadedGrey leading-tight font-avantGarde text-sm md:text-xl">
                        {subtitle}
                    </Text>
                )}
                <Text numberOfLines={2} className="text-fadedGrey font-avantGarde text-sm md:text-xl" style={{ lineHeight: 16 }}>
                    {detailLine1}
                </Text>
                {detailLine2 && (
                    <Text className="text-fadedGrey font-avantGarde text-sm md:text-xl" style={{ lineHeight: 16 }}>
                        {detailLine2}
                    </Text>
                )}
                {detailLine3 && (
                    <Text className="text-fadedGrey font-avantGarde text-sm md:text-xl" style={{ lineHeight: 16 }}>
                        {detailLine3}
                    </Text>
                )}
            </View>
        </View>
    </ConditionalLinkWrapper>
);

const ConditionalLinkWrapper = ({ href, children }: ConditionalLinkWrapper) => {
    if (href) {
        return (
            <Link href={href} asChild>
                <TouchableOpacity>{children}</TouchableOpacity>
            </Link>
        );
    }
    return <>{children}</>;
};
