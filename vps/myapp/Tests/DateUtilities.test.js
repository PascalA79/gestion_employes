const DateUtilities = require("../class/Utilities/DateUtilities");
const DateError = require("../class/Error/DateError");

// getHours()

// getDaysDate()

// getDate()
test("getDate - normal", () => {
    let myDate = new Date();
    myDate.setFullYear(2022, 9, 10);
    myDate.setHours(2, 3, 4, 5);
    expect(DateUtilities.getDate(2022, 10, 10, 2, 3, 4, 5)).toEqual(myDate);
});
test("getDate - invalid params", () => {
    expect(() => DateUtilities.getDate('inv', 10, 10)).toThrow(DateError);
    expect(() => DateUtilities.getDate(2022, 'inv', 10)).toThrow(DateError);
    expect(() => DateUtilities.getDate(2022, 10, 'inv')).toThrow(DateError);
    expect(() => DateUtilities.getDate(2022, 10, 10, 'inv')).toThrow(DateError);
    expect(() => DateUtilities.getDate(2022, 10, 10, 2, 'inv')).toThrow(DateError);
    expect(() => DateUtilities.getDate(2022, 10, 10, 2, 3, 'inv')).toThrow(DateError);
    expect(() => DateUtilities.getDate(2022, 10, 10, 2, 3, 4, 'inv')).toThrow(DateError);
});

// getDateObj()
test("getDateObj - OK", () => {
    let dateObj = {
        year: 2022, month: 10, day: 10,
        hour: 2, minute: 3, second: 4, ms: 5
    };
    let myDate = new Date();
    myDate.setFullYear(dateObj.year, dateObj.month-1, dateObj.day);
    myDate.setHours(dateObj.hour, dateObj.minute, dateObj.second, dateObj.ms);
    expect(DateUtilities.getDateObj(dateObj)).toEqual(myDate);
});
test.todo("getDateObj - null param obj");
test.todo("getDateObj - invalid params");

//getObj()
test("getObj - OK", () => {
    let dateObj = {
        year: 2022, month: 10, day: 10,
        hour: 2, minute: 3, second: 4, ms: 5
    };
    let myDate = new Date();
    myDate.setFullYear(dateObj.year, dateObj.month-1, dateObj.day);
    myDate.setHours(dateObj.hour, dateObj.minute, dateObj.second, dateObj.ms);
    expect(DateUtilities.getObj(myDate)).toEqual(dateObj);
});
test.todo("getObj - null param");

// isInSpan()
test("isInSpan - inside", () => {
    let start = DateUtilities.getDate(2022, 10, 10);
    let end = DateUtilities.getDate(2022, 10, 15);
    let myDate = DateUtilities.getDate(2022, 10, 12);
    expect(DateUtilities.isInSpan(myDate, start, end)).toBe(true);
});
test("isInSpan - outside", () => {
    let start = DateUtilities.getDate(2022, 10, 10);
    let end = DateUtilities.getDate(2022, 10, 15);
    let before = DateUtilities.getDate(2022, 10, 9, 23, 59, 59, 999);
    let after = DateUtilities.getDate(2022, 10, 15, 0, 0, 0, 1);
    expect(DateUtilities.isInSpan(before, start, end)).toBe(false);
    expect(DateUtilities.isInSpan(after, start, end)).toBe(false);
});
test("isInSpan - equals start", () => {
    let start = DateUtilities.getDate(2022, 10, 10);
    let end = DateUtilities.getDate(2022, 10, 15);
    let myDate = DateUtilities.getDate(2022, 10, 10);
    expect(DateUtilities.isInSpan(myDate, start, end)).toBe(true);
});
test("isInSpan - equals end", () => {
    let start = DateUtilities.getDate(2022, 10, 10);
    let end = DateUtilities.getDate(2022, 10, 15);
    let myDate = DateUtilities.getDate(2022, 10, 15);
    expect(DateUtilities.isInSpan(myDate, start, end)).toBe(false);
});
test.todo("isInSpan - invalid date");

//getDurationH()
test("getDurationH - normal", () => {
    let obj = {};
    obj.start = DateUtilities.getDate(2022, 10, 10, 9);
    obj.end = DateUtilities.getDate(2022, 10, 10, 17);
    expect(DateUtilities.getDurationH(obj)).toBeCloseTo(8);
});
test.todo("getDurationH - invalid date");
test.todo("getDurationH - start > end");

// areSameDay()
test.todo("areSameDay - same");
test.todo("areSameDay - diff day");
test.todo("areSameDay - diff month");
test.todo("areSameDay - diff year");
test.todo("areSameDay - same start midnight");
test.todo("areSameDay - same end midnight");
test.todo("areSameDay - null start");
test.todo("areSameDay - null end");

// areSameDayObj()
test.todo("areSameDayObj - same");
test.todo("areSameDayObj - diff day");
test.todo("areSameDayObj - diff month");
test.todo("areSameDayObj - diff year");
test.todo("areSameDayObj - same start midnight");
test.todo("areSameDayObj - same end midnight");
test.todo("areSameDayObj - null start");
test.todo("areSameDayObj - null end");

// isMidnightObj()

// isMidnightDate()

// objToHoursString()

// dateToHoursString()

// objToDateString()

// dateToDateString()

// objToFullDateString()

// dateToFullDateString()

// addZeroes()

// deltaDaysDate()

// deltaDaysObj()

// parseDate()

// removeHoursDate()

// removeHoursObj()

// getWeekDay()