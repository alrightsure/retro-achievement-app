import { GeneralText } from "@/components/generalText";
import { MediaObject } from "@/components/mediaObject";
import { SectionHeader } from "@/components/sectionHeader";
import { getMyRecentAchievements, getUsername } from "@/utils/retro-api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { type ExtendedRecentAchievementEntity } from "@retroachievements/api";
import { FlashList } from "@shopify/flash-list";

const LatestAchievements = () => {
    const { data: recentAchievements, refetch } = useQuery(["recentAchievements"], () => getMyRecentAchievements(), {
        onSettled: () => setRefreshing(false)
    });

    const [refreshing, setRefreshing] = useState(false);

    const renderItem = ({ item, index }: { item: ExtendedRecentAchievementEntity; index: number }) => {
        return (
            <MediaObject
                imageUrl={`/Badge/${item.badgeName}.png`}
                title={item.title}
                detailLine1={item.description}
                detailLine2={`Unlocked: ${item.dateAwarded.split(" ")[0]}`}
                detailLine3={`Points: ${item.points}`}
            />
        );
    };

    return (
        <View className="w-full h-full bg-darkGrey">
            <FlashList
                data={recentAchievements}
                renderItem={renderItem}
                onRefresh={() => {
                    setRefreshing(true);
                    refetch();
                }}
                refreshing={refreshing}
                keyExtractor={item => item.id.toString()}
                ListHeaderComponent={<SectionHeader textClassName="pt-1 pl-4">Latest Achievements</SectionHeader>}
                ListEmptyComponent={<GeneralText textClassName="text-center pt-10 text-lg pl-4">No Achievements! (..yet)</GeneralText>}
                ListFooterComponent={<View className="pb-4" />}
                estimatedItemSize={100}
            />
        </View>
    );
};

export default LatestAchievements;
