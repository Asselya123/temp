import { jwtDecode } from "jwt-decode";

export const getTimeDifferenceInMinutes = (target: Date): number => {
    const now = new Date();
    const diffMs = target.getTime() - now.getTime();
    return Math.floor(diffMs / 60000);
};

export const formatTimeDifference = (minutes: number): string => {
    // Adjust for +5 timezone difference
    const adjustedMinutes = minutes + 5 * 60; // Add 5 hours in minutes

    const absMinutes = Math.abs(adjustedMinutes);
    const hours = Math.floor(absMinutes / 60);
    const remainingMinutes = absMinutes % 60;

    let result = "";

    if (hours > 0) {
        result += `${hours}h `;
    }

    result += `${remainingMinutes}m`;

    if (adjustedMinutes < 0) {
        return `Late by ${result}`;
    } else if (adjustedMinutes > 0) {
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
