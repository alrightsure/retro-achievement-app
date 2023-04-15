import { GeneralText } from "@/components/generalText";
import { MediaObject } from "@/components/mediaObject";
import { PageLoading } from "@/components/pageLoading";
import { PageTitle } from "@/components/pageTitle";
import { SectionHeader } from "@/components/sectionHeader";
import { CustomGameInfoAndUserProgress, getGameDetailsAndUserProgress } from "@/utils/retro-api";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useSegments } from "expo-router";
import { Platform, View, Image } from "react-native";

export default function GameDetails() {
    const params = useSearchParams();
    const { isLoading, data: gameDetails } = useQuery(["gameDetails", params.id], () => getGameDetailsAndUserProgress(params.id as string));

    const renderItem = ({ item }: { item: typeof gameDetails.achievements[number] }) => {
        let finalBadgeName = item.badgeName;
        if (item.dateEarned == undefined) {
            finalBadgeName += "_lock";
        }

        return (
            <MediaObject
                imageUrl={`/Badge/${finalBadgeName}.png`}
                title={item.title}
                detailLine1={item.description}
                detailLine2={item.dateEarned ? `Unlocked: ${item.dateEarned?.split(" ")[0]}` : `Points: ${item.points}`}
                {...(item.dateEarned ? { detailLine3: `Points: ${item.points}` } : {})}
            />
        );
    };

    return (
        <View className="h-full bg-black">
            {Platform.OS === "ios" && (
                <View className="w-full flex justify-center items-center">
                    <View className="bg-pullDownGray w-20 h-1 mt-3 mb-2 rounded" />
                </View>
            )}
            {!isLoading && gameDetails ? (
                <View className="pt-3 w-full h-full">
                    <FlashList
                        data={gameDetails.achievements}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                        ListHeaderComponent={<GameDetailsHeader gameDetails={gameDetails} />}
                        ListEmptyComponent={<GeneralText textClassName="text-center pt-10 text-lg">No Achievements! (..yet)</GeneralText>}
                        ListFooterComponent={<View className="pb-14" />}
                        estimatedItemSize={120}
                    />
                </View>
            ) : (
                <PageLoading />
            )}
        </View>
    );
}

function GameDetailsHeader({ gameDetails }: { gameDetails: CustomGameInfoAndUserProgress }) {
    const pointsAchieved = () => {
        if (gameDetails == undefined) {
            return 0;
        }

        return gameDetails.achievements
            .filter(achievment => achievment.dateEarned)
            .map(achivement => Number(achivement.points))
            .reduce((a, b) => a + b, 0);
    };

    const totalPoints = () => {
        if (gameDetails == undefined) {
            return 0;
        }

        return gameDetails.achievements.map(achievment => Number(achievment.points)).reduce((a, b) => a + b, 0);
    };

    return (
        <View className="pl-4">
            <View className="flex flex-row pb-1">
                <View className="pr-3">
                    <Image className="h-36 w-36 m-2" source={{ uri: `https://retroachievements.org/${gameDetails.imageIcon}` }} />
                </View>
                <View className="w-1/2 self-end pb-1">
                    <PageTitle>{gameDetails.title}</PageTitle>
                    <GeneralText textClassName="text-fadedGrey pb-1">{gameDetails.consoleName}</GeneralText>
                    <GeneralText>
                        Achievements: {gameDetails.numAwardedToUser}/{gameDetails.numAchievements}
                    </GeneralText>
                    <GeneralText>
                        Points: {pointsAchieved()}/{totalPoints()}
                    </GeneralText>
                </View>
            </View>
            <SectionHeader>Achievements</SectionHeader>
        </View>
    );
}
