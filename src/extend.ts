export interface DisplayState {
    time: number;
    timeType: "Session" | "Break";
    isRunning: boolean;
}

export const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}