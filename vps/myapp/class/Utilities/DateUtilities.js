const DateError =require('../Error/DateError')
module.exports = class DateUtilities{
    
    static getHours({year=0, month=0, day=0}){
        const hours = [];
        for(let h = 0; h < 24; h++){
            for(let m = 0; m < 60; m += 30){
                hours.push(DateUtilities.getDate(year, month, day, h, m));
            }
        }
        return hours;
    }

    static getDaysDate(start, end){
        start = DateUtilities.removeHoursDate(start);
        const days = [];
        while(start < end){
            days.push(start);
            start = DateUtilities.deltaDaysDate(start, 1);
        }
        return days;
    }

    static getDate(year, month, day, hour=0, minute=0, second=0, ms=0){
        const newDate = new Date();
        newDate.setFullYear(year, month-1, day);
        newDate.setHours(hour, minute, second, ms);
        if(newDate=='Invalid Date')
            throw new DateError()
        return newDate
    }

    static getDateObj({year, month, day, hour=0, minute=0, second=0, ms=0}){
        return DateUtilities.getDate(year, month, day, hour, minute, second, ms);
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
        return this.areSameDayObj(DateUtilities.getObj(d0), DateUtilities.getObj(d1))
        // return d0.getFullYear() == d1.getFullYear() &&
        //     d0.getMonth() == d1.getMonth() && 
        //     d0.getDate() == d1.getDate();
    }

    static areSameDayObj(d0, d1){
        return d0.year == d1.year &&  
            d0.month == d1.month && 
            (d0.day == d1.day || 
                Math.abs(d0.day - d1.day) == 1 && 
                (DateUtilities.isMidnightObj(d0) || 
                DateUtilities.isMidnightObj(d1)));
    }
    // correctif
    static isMidnightObj(d){
        return d.hour == 0 && d.minute == 0 && d.second == 0 && d.ms == 0;
    }

    static isMidnightDate(date){
        return DateUtilities.isMidnightObj(DateUtilities.getObj(date));
    }

    static objToHoursString(obj){
        return `${DateUtilities.addZeroes(obj.hour)}:${DateUtilities.addZeroes(obj.minute)}`
    }

    static dateToHoursString(date){
        return DateUtilities.objToHoursString(DateUtilities.getObj(date));
    }

    static objToDateString(obj){
        return `${obj.year}-${DateUtilities.addZeroes(obj.month)}-${DateUtilities.addZeroes(obj.day)}`
    }

    static dateToDateString(date){
        return DateUtilities.objToDateString(DateUtilities.getObj(date));
    }

    static objToFullDateString(obj){
        return `${DateUtilities.objToDateString(obj)} ${DateUtilities.objToHoursString(obj)}`
    }

    static dateToFullDateString(date){
        return DateUtilities.objToFullDateString(DateUtilities.getObj(date));
    }

    static addZeroes(num){
        return num.toString().padStart(2, '0');
    }

    static deltaDaysDate(date, deltaDays){
        const msPerDay = 36e5 * 24;
        return new Date(date.getTime() + msPerDay * deltaDays);
    }

    static deltaDaysObj(obj, deltaDays){
        const date = DateUtilities.getDateObj(obj);
        const newDate = DateUtilities.deltaDaysDate(date, deltaDays);
        return DateUtilities.getObj(newDate);
    }

    static parseDate(str){
        const cells = str.split("-");
        return DateUtilities.getDate(cells[0], cells[1], cells[2]);
    }

    static removeHoursDate(date){
        const obj = DateUtilities.getObj(date);
        return this.getDate(obj.year, obj.month, obj.day);
    }

    static removeHoursObj(obj){
        return {...obj, hour:0, minute:0, second:0, ms:0};
    }

    static getWeekDay(date, desiredDayOfWeek){
        // const date = new Date();
        const currentDayOfWeek = date.getDay();
        const sunday = DateUtilities.deltaDaysDate(date, desiredDayOfWeek-currentDayOfWeek);
        // console.log(`${DateUtilities.dateToDateString(sunday)}: ${i}`)
        return sunday;
    }

    static getDBDateStringFromString(dateStr){
        return DateUtilities.getDBDateString(new Date(dateStr));
    }
    static getDBDateString(date){
        let offset = date.getTimezoneOffset();
        let date2 = new Date(date.getTime() + offset * 60 * 1000)
        return  date2.toISOString().replace("T", " ").replace("Z", "");
    }
};