import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { ListItem } from "@rneui/base/dist/ListItem";
import { Icon } from "@rneui/base/dist/Icon";
import { styled } from "nativewind";
import { useState } from "react";
import { SortOptions, getSortDirection, setSortDirection } from "@/utils/retro-api";
import { Link } from "expo-router";

const StyledListItem = styled(ListItem, {
    props: {
        containerStyle: true
    }
});

const StyledDropdownPicker = styled(DropDownPicker, {
    props: {
        style: true,
        dropDownContainerStyle: true,
        textStyle: true,
        labelStyle: true
    }
});

const Settings = () => {
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const queryClient = useQueryClient();
    const { data: sortDirection, isLoading } = useQuery(["sortDirection"], getSortDirection);
    const { mutate } = useMutation(setSortDirection, {
        onSuccess: data => {
            queryClient.setQueryData(["sortDirection"], data);
            queryClient.invalidateQueries(["gameDetails"]);
        }
    });

    return (
        <View className="w-full h-full bg-black flex content-start pt-1">
            <StyledListItem containerStyle="bg-black items-start" bottomDivider>
                <Icon name="funnel-outline" type="ionicon" color="white" />
                <ListItem.Content>
                    <ListItem.Title className="text-white font-avantGarde pb-1 md:text-2xl">Sort Achievements</ListItem.Title>
                    <StyledDropdownPicker
                        loading={isLoading}
                        open={dropDownOpen}
                        setOpen={setDropDownOpen}
                        value={Number(sortDirection)}
                        setValue={callback => {
                            const newSort = callback(sortDirection) as number;
                            mutate(newSort as SortOptions);
                        }}
                        className="bg-darkGrey md:p-4"
                        dropDownContainerStyle="bg-darkGrey min-h-0"
                        textStyle="text-white font-avantGarde md:text-2xl"
                        labelStyle="text-white font-avantGarde md:text-2xl"
                        items={Object.keys(SortOptions).map((key, index) => ({
                            label: SortOptions[Number(key)],
                            value: index
                        }))}
                    />
                </ListItem.Content>
            </StyledListItem>
            <Link href="https://www.buymeacoffee.com/raUDCEESjC" asChild>
                <StyledListItem containerStyle="bg-black items-start">
                    <Icon name="cafe-outline" type="ionicon" color="white" />
                    <ListItem.Content>
                        <ListItem.Title className="text-white font-avantGarde pb-1 md:text-2xl">Buy me a coffee</ListItem.Title>
                    </ListItem.Content>
                </StyledListItem>
            </Link>
        </View>
    );
};

export default Settings;
