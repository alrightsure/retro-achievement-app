import AsyncStorage from "@react-native-async-storage/async-storage";
import { buildAuthorization, getUserSummary } from "@retroachievements/api";

const userName = "apiuser";
const webApiKey = "vquxqhwyumC4H6sqtqTaLuBkYnjwhR4n";

export const authorization = buildAuthorization({ userName, webApiKey });

export const login = async (username: string) => {
    try {
        await getUserDetails(username, 0);
        await AsyncStorage.setItem("username", username);
    } catch (error) {
        throw new Error("User not found. Please create at an account at retroachievements.org");
    }
};

export const getIsLoggedIn = async () => {
    try {
        const username = await AsyncStorage.getItem("username");
        return username !== null;
    } catch (ex) {
        console.log(ex);
    }
};

export const getUsername = async () => {
    const username = await AsyncStorage.getItem("username");
    return username;
};

export const getUserDetails = async (username: string | null | undefined, games: number) => {
    return await getUserSummary(authorization, {
        userName: username,
        recentGamesCount: games
    });
};
