export function sessionDurationToMMSS(durationMin: number) {
    const mins = Math.floor(durationMin);
    const secs = Math.round((durationMin - mins) * 60);

    const mm = String(mins).padStart(2, "0");
    const ss = String(secs).padStart(2, "0");

    return `${mm}:${ss}`
}

export function milliSecondsToMMSS(durationMs: number) {
    const totalSecs = Math.floor(durationMs / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60

    const mm = String(mins).padStart(2, "0");
    const ss = String(secs).padStart(2, "0");

    return `${mm}:${ss}`
}