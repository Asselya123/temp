import { jwtDecode } from "jwt-decode";

export const getTimeDifferenceInMinutes = (target: Date): number => {
    const now = new Date();
    const diffMs = target.getTime() - now.getTime();
    return Math.floor(diffMs / 60000);
};

export const formatTimeDifference = (minutes: number): string => {
    const absMinutes = Math.abs(minutes);
    const hours = Math.floor(absMinutes / 60);
    const remainingMinutes = absMinutes % 60;

    let result = "";

    if (hours > 0) {
        result += `${hours}h `;
    }

    result += `${remainingMinutes}m`;

    if (minutes < 0) {
        return `Late by ${result}`;
    } else if (minutes > 0) {
        return `${result} left`;
    } else {
        return "Time's up";
    }
};

export const safeDecodeJwt = <T>(token: string): T | null => {
    try {
        return jwtDecode(token);
    } catch (error) {
        return null;
    }
};
