import moment from "moment";
import momentjalali from "jalali-moment";
import momenthijri from "moment-hijri";
import { holidays } from "./holidays.js";
import { SpecialEvents } from "./specialEvents.js";
import * as JsSearch from "js-search";

export const Is_Iran_Holiday = (month, day) => {
  const iraniholiday = holidays.jalali[month + "-" + day];
  if (iraniholiday) return iraniholiday;
  return false;
};

export const Is_Hijri_Holiday = (month, day) => {
  const hijriholiday = holidays.hijri[month + "-" + day];
  if (hijriholiday) return hijriholiday;
  return false;
};

const convert_numbers_to_en = (num) => {
  var faid = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  var arabid = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  faid.map((item, index) => {
    num = num.replace(new RegExp(item, "g"), index);
  });

  arabid.map((item, index) => {
    num = num.replace(new RegExp(item, "g"), index);
  });
  return num;
};

export const Special_Events = (date = new Date().toISOString()) => {
  const hijridate = momenthijri(date);
  const momentdate = moment(date).locale("en");
  const jalalidate = momentjalali(date).locale("fa");
  const Gregorian_Month_Number = momentdate.format("M");
  const Gregorian_Day = momentdate.format("D");
  const Jalali_Month_Number = convert_numbers_to_en(jalalidate.format("M"));
  const Jalali_Day = convert_numbers_to_en(jalalidate.format("D"));
  const Hijri_Month_Number = convert_numbers_to_en(hijridate.format("iM"));
  const Hijri_Day = convert_numbers_to_en(hijridate.format("iD"));
  const jalalievents = SpecialEvents.jalali
    .filter(
      (SpecialEvent) =>
        SpecialEvent.day == Jalali_Day &&
        SpecialEvent.month == Jalali_Month_Number
    )
    .map((SpecialEvent) => SpecialEvent.name + " (Jalali)");
  const gregorianevents = SpecialEvents.gregorian
    .filter(
      (SpecialEvent) =>
        SpecialEvent.day == Gregorian_Day &&
        SpecialEvent.month == Gregorian_Month_Number
    )
    .map((SpecialEvent) => SpecialEvent.name + " (Gregorian)");
  const hijrievents = SpecialEvents.hijri
    .filter(
      (SpecialEvent) =>
        SpecialEvent.day == Hijri_Day &&
        SpecialEvent.month == Hijri_Month_Number
    )
    .map((SpecialEvent) => SpecialEvent.name + " (Hijri)");
  return `${jalalievents.join("\n")}\n${gregorianevents.join(
    "\n"
  )}\n${hijrievents.join("\n")}`;
};

export const dateTemplate = (jalalidate, hijridate, gregoriandate, date) => {
  const System_Timestamp = gregoriandate.toISOString();
  const Gregorian_Equivalent_Date = gregoriandate.format("YYYY/MM/DD");
  const Jalali_Full_Date = jalalidate.format("YYYY/MM/DD");
  const Jalali_Date_Numeric = jalalidate.format("YYYYMMDD");
  const Jalali_Year = jalalidate.format("YYYY");
  const Jalali_Month_Number = jalalidate.format("M");
  const Jalali_Month_Name = jalalidate.format("MMMM");
  const Jalali_Day = jalalidate.format("D");
  const Jalali_Weekday_Number = jalalidate.format("e");
  const Jalali_Weekday_Name = jalalidate.format("dddd");
  let season = "";
  if (Jalali_Month_Number >= 1 && Jalali_Month_Number <= 3) season = "بهار";
  else if (Jalali_Month_Number >= 4 && Jalali_Month_Number <= 6)
    season = "تابستان";
  else if (Jalali_Month_Number >= 7 && Jalali_Month_Number <= 9)
    season = "پاییز";
  else season = "زمستان";
  const Day_Of_Year = jalalidate.format("DDD");
  const Is_Leap_Year = jalalidate.isLeapYear();
  const Hijri_Equivalent_Date = hijridate.format("iYYYY/iMM/iDD");
  const hijriMonthNamesArabic = [
    "مُحَرَّم",
    "صَفَر",
    "رَبِيع ٱلْأَوَّل",
    "رَبِيع ٱلثَّانِي",
    "جُمَادَىٰ ٱلْأُولَىٰ",
    "جُمَادَىٰ ٱلثَّانِيَة",
    "رَجَب",
    "شَعْبَان",
    "رَمَضَان",
    "شَوَّال",
    "ذُو ٱلْقَعْدَة",
    "ذُو ٱلْحِجَّة",
  ];
  const Hijri_Month_Number = convert_numbers_to_en(hijridate.format("iM"));
  const Hijri_Month_Name = hijriMonthNamesArabic[Hijri_Month_Number - 1];
  const Hijri_Day = convert_numbers_to_en(hijridate.format("iD"));
  const Gregorian_Month_Number = gregoriandate.format("M");
  const Gregorian_Day = gregoriandate.format("D");
  const Gregorian_Weekday_Name = gregoriandate.format("dddd");
  const Is_Holiday =
    Is_Iran_Holiday(Jalali_Month_Number, Jalali_Day) ||
    Is_Hijri_Holiday(Hijri_Month_Number, Hijri_Day);
  return `
📅 Date Information

🗓️ This calendar information is specifically for:
(If you need information about a different day, use the "jalaliCalendar" tool.)

🗓️ The date ${Jalali_Full_Date} (Jalali) corresponding to ${Gregorian_Equivalent_Date} (Gregorian) is a ${Gregorian_Weekday_Name} (${Jalali_Weekday_Name}).

🕰️ System Timestamp: ${System_Timestamp}
🗓️ Jalali Date (Full): ${Jalali_Full_Date}
🔢 Jalali Date (Numeric): ${Jalali_Date_Numeric}

📆 Jalali Breakdown:
- Year: ${Jalali_Year}
- Month Number: ${Jalali_Month_Number}
- Month Name: ${Jalali_Month_Name}
- Day: ${Jalali_Day}
- Weekday Number: ${Jalali_Weekday_Number}
- Weekday Name: ${Jalali_Weekday_Name}
- Is Weekend: ${Jalali_Weekday_Number == 7 ? "Yes" : "No"}

🌸 Seasonal Info:
- Season: ${season}
- Day of Year: ${Day_Of_Year}
- Leap Year: ${Is_Leap_Year ? "Yes" : "No"}

📅 Gregorian Equivalent:
- Date: ${Gregorian_Equivalent_Date}
- Month Number: ${Gregorian_Month_Number}
- Weekday Name: ${Gregorian_Weekday_Name}
- Day: ${Gregorian_Day}

☪️ Hijri (Islamic) Equivalent:
- Date: ${Hijri_Equivalent_Date}
- Month Number: ${Hijri_Month_Number}
- Month Name: ${Hijri_Month_Name}
- Day: ${Hijri_Day}

🎉 Events & Holidays:
- Is Holiday: ${Is_Holiday ? "Yes" : "No"}
- Holiday Name(s): ${Is_Holiday || "None"}
- Special Events: ${Special_Events(date) || "None"}
`.trim();
};

export const getDateinformation = (date = new Date().toISOString()) => {
  if (date == "today") date = new Date().toISOString();
  const hijridate = momenthijri(date);
  const gregoriandate = moment(date).locale("en");
  const jalalidate = momentjalali(date).locale("fa");
  return dateTemplate(jalalidate, hijridate, gregoriandate, date);
};

export const getJalaliDateinformation = (date) => {
  let jalalidate = momentjalali(date, "jYYYY/jM/jD");
  const JalalitoGregorian = convert_numbers_to_en(
    jalalidate.format("YYYY/MM/DD")
  );
  jalalidate = jalalidate.locale("fa");
  const hijridate = momenthijri(JalalitoGregorian, "YYYY/MM/DD");
  const gregoriandate = moment(JalalitoGregorian).locale("en");
  return dateTemplate(jalalidate, hijridate, gregoriandate, JalalitoGregorian);
};

function extractJalaliYearFromText(text) {
  const regex = /\(([^\)]+)\)/;
  const match = text.match(regex);

  if (match && match[1]) {
    const yearInPersian = convert_numbers_to_en(
      match[1].replace("ه‍.ش", "").trim()
    );

    return yearInPersian;
  }

  return null;
}
export const SearchEvents = (query) => {
  var search = new JsSearch.Search("id");
  search.tokenizer = {
    tokenize(text) {
      return text
        .replace(/[،؟٫٬]/g, " ")
        .split(/\s+/)
        .filter((word) => word.length > 0);
    },
  };
  search.addIndex("name");
  search.addDocuments(SpecialEvents.jalali);

  const searchforText = search.search(query);

  if (searchforText.length === 0) {
    return `هیچ رویدادی با عبارت "${query}" یافت نشد.`;
  }
  const jalaliMonths = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  const resultText = searchforText
    .map((e) => {
      const jalaliYear = extractJalaliYearFromText(e.name);
      if (jalaliYear) {
        return `📅 ${e.name} در ${e.day} ${
          jalaliMonths[e.month - 1]
        } سال ${jalaliYear}\n ${getJalaliDateinformation(
          `${jalaliYear}/${e.month}/${e.day}`
        )}`;
      } else {
        return `📅 ${e.name} در ${e.day} ${jalaliMonths[e.month - 1]}`;
      }
    })
    .join("\n");
  return resultText;
};
