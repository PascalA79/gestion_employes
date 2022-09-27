module.exports = class DateUtilities{
    
    static getHours({year=0, month=0, day=0}){
        const hours = [];
        for(h = 0; h < 24; h++){
            for(m = 0; m < 60; m += 30){
                hours.push(getDate(year, month, day, h, m));
            }
        }
        return hours;
    }

    static getDate(year, month, day, hour=0, minute=0, second=0, ms=0){
        const newDate = new Date();
        newDate.setFullYear(year, month-1, day);
        newDate.setHours(hour, minute, second, ms);
        return newDate;
    }

    static getDateObj({year, month, day, hour=0, minute=0, second=0, ms=0}){
        return getDate(year, month, day, hour, minute, second, ms);
    }

    static getObj(date){
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds(),
            ms: date.getMilliseconds()
        }
    }

    static isInSpan(test, start, end){
        const testTime = test.getTime();
        return testTime >= start.getTime() && testTime < end.getTime();
    }

    static getDurationH({start, end}){
        return (end.getTime() - start.getTime()) / 36e5;
    }

    static areSameDay(d0, d1){
        return d0.getFullYear() == d1.getFullYear() &&
            d0.getMonth() == d1.getMonth() && 
            d0.getDate() == d1.getDate();
    }

    static areSameDayObj(d0, d1){
        return d0.year == d1.year && 
            d0.month == d1.month && 
            d0.day == d1.day
    }
};