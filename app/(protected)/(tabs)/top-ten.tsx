import { FlatList, View } from "react-native";
import { getTop10Players } from "@/utils/retro-api";
import { useQuery } from "@tanstack/react-query";
import { MediaObject } from "@/components/mediaObject";
import { PageLoading } from "@/components/pageLoading";
import { SectionHeader } from "@/components/sectionHeader";

const Top10Players = () => {
    const { data: players, isLoading } = useQuery(["top10Players"], getTop10Players);

    const renderItem = ({ item, index }: { item: typeof players[number]; index: number }) => {
        return (
            <View className="pr-5">
                <MediaObject
                    imageUrl={item.userPic}
                    title={`${item.rank}. ${item.name}`}
                    detailLine1={item.motto || "(No Motto)"}
                    detailLine2={`Points: ${item.totalPoints}`}
                />
            </View>
        );
    };

    return (
        <View className="bg-black h-full w-full">
            {isLoading ? (
                <PageLoading />
            ) : (
                <View className="h-full">
                    <FlatList
                        data={players}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                        ListHeaderComponent={<SectionHeader textClassName="self-start pt-1 pl-4">Top 10 Players</SectionHeader>}
                    />
                </View>
            )}
        </View>
    );
};

export default Top10Players;
