export function convertCSTtoMMT(cstDateStr: string) {
    // Convert "YYYY-MM-DD HH:mm:ss" to Date object in UTC+8
    const cstDate = new Date(cstDateStr.replace(' ', 'T') + '+08:00');

    // Myanmar Time is UTC+6:30, so offset is -1.5 hours from CST
    // Actually we can just use toLocaleString with 'Asia/Yangon'
    return cstDate.toLocaleString('en-US', { 
        timeZone: 'Asia/Yangon', 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
}

// Example
console.log(convertCSTtoMMT("2026-03-26 00:24:51"));
// Output: "03/25/2026, 22:54:51" in Myanmar Time