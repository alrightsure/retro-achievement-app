import { MediaObject } from "@/components/mediaObject";
import { getConsoles, getSearchedGameList } from "@/utils/retro-api";
import { useQuery } from "@tanstack/react-query";
import { type SetStateAction, useState, useCallback } from "react";
import { FlatList, KeyboardAvoidingView, Platform, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import type { ConsoleId, GameList } from "@retroachievements/api";
import { styled } from "nativewind";
import { PageLoading } from "@/components/pageLoading";
import { GeneralText } from "@/components/generalText";
import { SearchBar } from "@rneui/base/dist/SearchBar";
import { FlashList } from "@shopify/flash-list";

const Search = () => {
    const [searchValue, updateSearchValue] = useState("");
    const [selectedConsole, setSelectedConsole] = useState(0);
    const { data: consoles, isLoading: consolesLoading } = useQuery(["consoles"], () => getConsoles());
    const { data: games, isLoading: gamesLoading } = useQuery(["games", selectedConsole], () => getSearchedGameList(selectedConsole));

    const sortedConsoles = () => {
        if (!consoles) {
            return [];
        }

        return consoles.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
    };

    const filteredGames = () => {
        if (searchValue && games) {
            return games.filter(g => g.title.toLowerCase().includes(searchValue.toLowerCase()));
        }

        return games;
    };

    const renderItem = ({ item, index }: { item: GameList[number]; index: number }) => (
        <MediaObject
            imageUrl={item.imageIcon}
            title={item.title}
            subtitle={item.consoleName}
            detailLine1={`Achievements: ${item.numAchievements}`}
            detailLine2={`Points: ${item.points}`}
            key={item.id}
        />
    );

    const keyExtractor = useCallback((item: GameList[number]) => item.id.toString(), []);

    return (
        <>
            <View className="bg-darkgrey h-full w-full">
                {consolesLoading ? (
                    <PageLoading />
                ) : (
                    <>
                        <View className="w-full bg-darkGrey z-50 px-3">
                            <ConsolePicker consoles={sortedConsoles()} selectedConsole={selectedConsole} setSelectedConsole={setSelectedConsole} />
                        </View>
                        <View className="w-full bg-darkGrey h-full z-1 pb-28">
                            {gamesLoading ? (
                                <View className="h-1/2 justify-center items-center">
                                    <PageLoading />
                                </View>
                            ) : (
                                <FlashList
                                    data={filteredGames()}
                                    renderItem={renderItem}
                                    refreshing={gamesLoading}
                                    keyExtractor={keyExtractor}
                                    ListEmptyComponent={<GeneralText textClassName="pt-10 pl-4">No games found for the selected console</GeneralText>}
                                    estimatedItemSize={100}
                                />
                            )}
                        </View>
                    </>
                )}
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
                className="absolute w-full p-0 m-0 bg-darkGrey -bottom-1"
            >
                <SearchBar
                    round
                    placeholder="Search for games"
                    containerStyle={{ backgroundColor: "transparent", borderTopColor: "transparent", borderBottomColor: "transparent" }}
                    value={searchValue}
                    onChangeText={value => updateSearchValue(value)}
                    className="font-avantGarde md:text-xl"
                />
            </KeyboardAvoidingView>
        </>
    );
};

interface ConsolePickerProps {
    consoles: ConsoleId[];
    selectedConsole: number;
    setSelectedConsole: (Callback: SetStateAction<number>) => void;
}

const ConsolePicker = ({ consoles, selectedConsole, setSelectedConsole }: ConsolePickerProps) => {
    const [open, setOpen] = useState(false);

    const StyledDropdown = styled(DropDownPicker, {
        props: {
            dropDownContainerStyle: true,
            textStyle: true,
            labelStyle: true
        }
    });

    return (
        <View className="z-50">
            <StyledDropdown
                open={open}
                value={selectedConsole}
                items={consoles.map(console =>
                    console.name == " All"
                        ? // Do this horrible thing because 'All' has to have a space infront of it to be sorted correctly
                          { label: console.name, value: console.id, labelStyle: { marginLeft: -1 } }
                        : { label: console.name, value: console.id }
                )}
                setOpen={setOpen}
                setValue={setSelectedConsole}
                className="bg-darkGrey"
                dropDownContainerStyle="bg-darkGrey"
                textStyle="text-white font-avantGarde md:text-xl"
                labelStyle="text-white font-avantGarde md:text-xl"
            />
        </View>
    );
};

export default Search;
