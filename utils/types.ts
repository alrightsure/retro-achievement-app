export type GameObject = {
    ID: number;
    Title: string;
    ConsoleID: number;
    ConsoleName: string;
    ImageIcon: string;
    ImageTitle: string;
    ImageInGame: string;
    ImageBoxArt: string;
    Publisher: string;
    Developer: string;
    Genre: string;
    Released?: Date;
    NumAchievements: number;
    NumDistinctPlayersCasual: number;
    NumDistinctPlayersHardcore: number;
    Achievements: Achievement[];
    NumAwardedToUser: number;
    NumAwardedToUserHardcore: number;
    UserCompletion: string;
    UserCompletionHardcore: string;
};

export type Achievement = {
    ID: number;
    NumAwared: number;
    NumAwardedHardcore: number;
    Title: string;
    Description: string;
    Points: number;
    TrueRatio: number;
    Author: string;
    DateModified: Date;
    DateCreated: Date;
    BadgeName: string;
    DisplayOrder: number;
    DateEarned?: string;
};

export type User = {
    ID: number;
    name: string;
    Rank: number;
    Points: number;
    TotalPoints: number;
    TotalSoftcorePoints: number;
    Status: string;
    UserPic: string;
    LastGameID: number;
    Motto: string;
    MemberSince: string;
    RecentlyPlayed: RecentlyPlayedGame[];
    RecentAchievements: RecentAchievementWrapperWrapper;
    Completion: Completion[];
    Awarded: AwardedWrapper;
};

export type RecentlyPlayedGame = {
    GameID: number;
    ConsoleID: number;
    ConsoleName: string;
    Title: string;
    ImageIcon: string;
    LastPlayed?: string;
};

export type Awarded = {
    NumPossibleAchievements: number;
    PossibleScore: number;
    NumAchieved: number;
    ScoreAchieved: number;
    NumAchievedHardcore: number;
    ScoreAchivedHardcore: number;
    completedPercentage?: number;
};

type AwardedWrapper = {
    [key: string]: Awarded;
};

type RecentAchievementWrapper = {
    [key: string]: RecentAchievement;
};

type RecentAchievementWrapperWrapper = {
    [key: string]: RecentAchievementWrapper;
};

export interface Completion extends RecentlyPlayedGame {
    NumAwarded: number;
    MaxPossible: number;
    PctWon: number;
    HardcoreMode: number;
}

export type RecentAchievement = {
    ID: number;
    GameID: number;
    GameTitle: string;
    Title: string;
    Description: string;
    Points: number;
    BadgeName: string;
    DateAwarded: string;
    HardcoreAchieved: boolean;
};

export type RootTabsParamList = {
    Profile: undefined;
    "Recent Achievements": undefined;
    Search: undefined;
    Top10: undefined;
    Settings: undefined;
    GameDetails: { gameId: number };
};

export type GameListItem = {
    ID: number;
    Title: string;
    ConsoleID: number;
    ConsoleName: string;
    ImageIcon: string;
    NumAchievements: number;
    NumLeaderboards: number;
    Points: number;
    DateModified?: string;
};

export type Console = {
    ID: number;
    Name: string;
};

export type Top10Return = {
    1: string;
    2: string;
    3: string;
};

export enum SortOptions {
    "Order Achieved",
    "Standard Order"
}
