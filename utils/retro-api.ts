import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    ExtendedRecentAchievementEntity,
    buildAuthorization,
    getConsoleIds,
    getUserSummary,
    getGameList,
    getTopTenUsers,
    UserSummary
} from "@retroachievements/api";

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

export const logout = async () => {
    await AsyncStorage.removeItem("username");
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

export const getMyRecentAchievements = async () => {
    const user = await getUserSummary(authorization, {
        userName: await getUsername(),
        recentAchievementsCount: 10
    });
    const achievements: ExtendedRecentAchievementEntity[] = [];

    if (user.recentAchievements) {
        // Reduce the insane Recent Achievements object into a simple array
        for (const achievementWrapper of Object.values(user.recentAchievements)) {
            for (const achievement of Object.values(achievementWrapper)) {
                if (achievement.dateAwarded) {
                    achievements.push(achievement);
                }
            }
        }
    }

    // Sort the array by most recent and assign it to our state
    return achievements.sort((a, b) =>
        b.dateAwarded.toString().split("/").reverse().join().localeCompare(a.dateAwarded.toString().split("/").reverse().join())
    );
};

export const getConsoles = async () => {
    const consolesToOmit = [
        "wii",
        "wii u",
        "xbox",
        "dos",
        "commodore64",
        "zx81",
        "oric",
        "vic-20",
        "amiga",
        "atari st",
        "philips cd-i",
        "pc-9800",
        "atari 5200",
        "sharp x68000",
        "cassette vision",
        "super cassette vision",
        "neo geo cd",
        "fairchild channel f",
        "fm towns",
        "zx spectrum",
        "game and watch",
        "nokia n-gage",
        "nintendo 3ds",
        "pc engine",
        "Sharp X1",
        "TIC-80",
        "Thomson TO8",
        "PC-6000",
        "sega pico",
        "zeebo",
        "arduboy",
        "WASM-4",
        "Hubs",
        "Events",
        "game & watch"
    ];

    const consoles = await getConsoleIds(authorization);
    consoles.push({ id: 0, name: " All" });
    return consoles.filter(c => !consolesToOmit.some(element => element.toLowerCase() === c.name.toLowerCase()));
};

export const getSearchedGameList = async (consoleId?: number) => {
    return await getGameList(authorization, {
        consoleId
    });
};

interface User extends UserSummary {
    name: string;
}

export const getTop10Players = async () => {
    const topTenUsers: User[] = [];
    const users = await getTopTenUsers(authorization);

    for (const user of users) {
        topTenUsers.push({ ...(await getUserDetails(user.userName, 0)), name: user.userName });
    }

    return topTenUsers;
};
