import { useState } from "react";
import { Alert, KeyboardAvoidingView, TextInput, TouchableOpacity, View, Image, Keyboard, TouchableWithoutFeedback } from "react-native";
import { GeneralText } from "../components/generalText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PageLoading } from "../components/pageLoading";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../utils/retro-api";

const Login = () => {
    const [usernameText, setUsernameText] = useState("");
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation(login, {
        onSuccess: () => {
            queryClient.setQueryData(["isLoggedIn"], true);
        },
        onError: (ex: any) => {
            Alert.alert("Error", ex.message);
        }
    });

    const onQuestionPress = () => {
        Alert.alert(
            "Retro Achievements",
            "Please input your Retro Achievements username. If you don't have one, you can visit retroachievements.org to create an account."
        );
    };

    const onLogin = async () => {
        if (usernameText) {
            mutate(usernameText);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} className="justify-center pt-24">
            <>
                <View className="w-10/12 mb-4">
                    <View className="flex flex-row w-full justify-between">
                        <GeneralText textClassName="px-3 pb-.5 self-end">Login</GeneralText>
                        <TouchableOpacity onPress={() => onQuestionPress()}>
                            <Ionicons name="ios-help-circle-outline" size={28} color="white" className="px-2" />
                        </TouchableOpacity>
                    </View>
                    <KeyboardAvoidingView>
                        <TextInput
                            className="border bg-fadedGrey h-10 rounded-lg px-3 mb-1 md:text-xl"
                            value={usernameText}
                            onChangeText={text => setUsernameText(text)}
                            placeholder="Username"
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            onPress={() => onLogin()}
                            className="w-full items-center justify-center border border-fadedGrey rounded-lg h-10 md:h-15 mt-1"
                        >
                            <GeneralText textClassName="text-lg md:text-2xl">Go</GeneralText>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </View>
                <Image source={require("../assets/RA-small.png")} resizeMode="contain" className="h-40 w-40" />
                {isLoading && <PageLoading isFullScreen />}
            </>
        </TouchableWithoutFeedback>
    );
};

export default Login;
