
/***
 * Parses a time string (e.g., "30s", "5m", "2h", "1d", "1y") into milliseconds.
 * @param {string} timeStr - The time string to parse.
 * @returns {number} The time in milliseconds.
 * @throws Will throw an error if the format is invalid.    
 */
const parseTime=(timeStr)=>{
    const units={
        's':1000,
        'm':1000*60,
        'h':1000*60*60,
        'd':1000*60*60*24,
        'y':1000*60*60*24*365

    };
    const match=timeStr.match(/^(\d+)([smhdy])$/g);
    const matchStr=timeStr.match(/[smhdy]/g)
    if (!match) throw new Error ('Invalid time format');
    return parseInt(match)*units[matchStr];
}
module.exports={parseTime};