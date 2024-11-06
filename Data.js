const monthsInfo = [
  { value: 0, daysinmonth: 31, name: "Jan" },
  { value: 1, daysinmonth: 29, name: "Feb" },
  { value: 2, daysinmonth: 31, name: "Mar" },
  { value: 3, daysinmonth: 30, name: "Apr" },
  { value: 4, daysinmonth: 31, name: "May" },
  { value: 5, daysinmonth: 30, name: "Jun" },
  { value: 6, daysinmonth: 31, name: "Jul" },
  { value: 7, daysinmonth: 31, name: "Aug" },
  { value: 8, daysinmonth: 30, name: "Sep" },
  { value: 9, daysinmonth: 31, name: "Oct" },
  { value: 10, daysinmonth: 30, name: "Nov" },
  { value: 11, daysinmonth: 31, name: "Dec" },
];

const yearsInfo = [
  2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031,
  2032, 2033,
];

const rate1EndDate = new Date(2023, 3, 1); // rate 1 anything up till this
const rate2StartDate = new Date(2023, 3, 1); // rate 2 start date
const rate2EndDate = new Date(2024, 3, 1); // rate 2 end date
const rate3StartDate = new Date(2024, 3, 1); // rate 3 start date

const getDaysRange = (number) => [...Array(number).keys()];

const getDate = (y, m, d) => new Date(Number(y), Number(m), Number(d));
