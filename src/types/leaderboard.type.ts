export type LeaderboardType = {
    username: string;
    point: number;
};

export type LeaderboardUserType = {
    username: string;
    name: string;
    profilePicture: string;
    totalPoints: number;
    rank?: number;
};