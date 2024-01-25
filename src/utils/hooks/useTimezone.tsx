
export const useTimezone = () => {
    let userTimezone: string | null = null;

    if (typeof Intl !== 'undefined') {
        userTimezone = Intl.DateTimeFormat('en', { timeZoneName: 'short' }).formatToParts(Date.now())
            .find((part) => part.type === 'timeZoneName')?.value || null;
    }
    return userTimezone
}