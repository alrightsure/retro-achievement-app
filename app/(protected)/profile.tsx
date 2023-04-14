import { useState } from "react";
import { MediaObject } from "@/components/mediaObject";
import { PageLoading } from "@/components/pageLoading";
import { authorization, getUsername } from "@/utils/retro-api";
import { useQuery } from "@tanstack/react-query";
import { View, Image } from "react-native";
import { PageTitle } from "@/components/pageTitle";
import { GeneralText } from "@/components/generalText";
import { SectionHeader } from "@/components/sectionHeader";
import { getUserSummary, type UserSummary, type RecentlyPlayedGameEntity } from "@retroachievements/api";
import { FlashList } from "@shopify/flash-list";

const Profile = () => {
    const [refreshing, setRefreshing] = useState(false);
    const { data: userName } = useQuery(["username"], getUsername);
    const {
        isLoading,
        data: userDetails,
        refetch
    } = useQuery(
        ["userDetails", userName],
        () =>
            getUserSummary(authorization, {
                userName: userName,
                recentGamesCount: 10
            }),
        { enabled: !!userName, onSettled: () => setRefreshing(false) }
    );

    const renderItem = ({ item }: { item: RecentlyPlayedGameEntity; index: number }) => {
        if (userDetails) {
            const achievementDetails = userDetails.awarded[item.gameId];

            return (
                <MediaObject
                    imageUrl={item.imageIcon}
                    title={item.title}
                    detailLine1={`Last Played: ${item.lastPlayed?.split(" ")[0]}`}
                    detailLine2={`Achievements: ${achievementDetails?.numAchieved}/${achievementDetails?.numPossibleAchievements}`}
                    detailLine3={`Points: ${achievementDetails?.scoreAchieved}/${achievementDetails?.possibleScore}`}
                />
            );
        } else {
            return <PageLoading />;
        }
    };

    return (
        <View className="bg-darkGrey h-full w-full">
            {!isLoading && userDetails ? (
                <FlashList
                    data={userDetails.recentlyPlayed}
                    renderItem={renderItem}
                    keyExtractor={item => item.gameId.toString()}
                    onRefresh={() => {
                        setRefreshing(true);
                        refetch();
                    }}
                    refreshing={refreshing}
                    ListHeaderComponent={<ProfileHeader userName={userName} userDetails={userDetails} />}
                    ListEmptyComponent={<GeneralText textClassName="text-center pt-10 text-lg pl-4">You haven't played anything yet!</GeneralText>}
                    ListFooterComponent={<View className="pb-4" />}
                    className="w-full"
                    estimatedItemSize={100}
                />
            ) : (
                <PageLoading />
            )}
        </View>
    );
};

const ProfileHeader = ({ userName, userDetails }: { userName: string | null | undefined; userDetails: UserSummary }) => {
    return (
        <View className="pl-4">
            <View className="flex flex-row pb-3 pt-3">
                <Image className="h-32 w-32 rounded-full" source={{ uri: `https://retroachievements.org${userDetails.userPic}` }} />
                <View className="flex justify-center pl-6">
                    <PageTitle>{userName}</PageTitle>
                    {!!userDetails.motto && <GeneralText>{userDetails.motto}</GeneralText>}
                    <GeneralText textClassName="md:text-xl md:leading-1">Hardcore Points: {userDetails.totalPoints}</GeneralText>
                    <GeneralText textClassName="md:text-xl md:leading-1">Softcore Points: {userDetails.totalSoftcorePoints}</GeneralText>
                </View>
            </View>
            <SectionHeader>Recently Played</SectionHeader>
        </View>
    );
};

export default Profile;
