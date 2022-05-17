import Web3 from "web3";
import dayjs from "dayjs";

const oneCirclesYearInSeconds = 31557600; // This is 365,25 Days in seconds.
const oneDayInSeconds = 86400;
const circlesGenesisTimestamp = dayjs("2020-10-15T00:00:00.000Z").unix();

const initialDailyCrcPayout = 8;
// let previousCirclesPerDayValue = 8;

const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

function calculatePayoutPerDayForYear(yearsSince: number) {
  let circlesPayoutInCurrentYear = initialDailyCrcPayout;
  let previousCirclesPerDayValue = initialDailyCrcPayout;

  for (let index = 0; index < yearsSince; index++) {
    previousCirclesPerDayValue = circlesPayoutInCurrentYear;
    circlesPayoutInCurrentYear = circlesPayoutInCurrentYear * 1.07;
  }

  return {
    payoutInCurrentYear: circlesPayoutInCurrentYear,
    payoutInPreviousYear: previousCirclesPerDayValue
  };
}

export function convertTimeCirclesToCircles(amount: number, date: string) {
  const transactionDateUnix = date ? dayjs(date).unix() : dayjs().unix();
  const daysSinceCirclesGenesis = (transactionDateUnix - circlesGenesisTimestamp) / oneDayInSeconds;
  const daysInCurrentCirclesYear = Math.ceil(daysSinceCirclesGenesis % 365.25);
  const circlesYearsSince = (transactionDateUnix - circlesGenesisTimestamp) / oneCirclesYearInSeconds;
  const payoutPerDayInYear = calculatePayoutPerDayForYear(circlesYearsSince);

  return parseFloat((
    (amount / 24) *
    lerp(payoutPerDayInYear.payoutInPreviousYear, payoutPerDayInYear.payoutInCurrentYear, daysInCurrentCirclesYear / 365.25)
  ).toFixed(12));
}

export function convertCirclesToTimeCircles(amount: number, date?: string) {
  const transactionDateUnix = date ? dayjs(date).unix() : dayjs().unix();
  const daysSinceDay0Unix = (transactionDateUnix - circlesGenesisTimestamp) / oneDayInSeconds;
  const dayInCurrentCycle = Math.ceil(daysSinceDay0Unix % 365.25);
  const yearsSince = (transactionDateUnix - circlesGenesisTimestamp) / oneCirclesYearInSeconds;
  const payoutPerDayInYear = calculatePayoutPerDayForYear(yearsSince);

  return (
    (amount /
      lerp(
        payoutPerDayInYear.payoutInPreviousYear,
        payoutPerDayInYear.payoutInCurrentYear,
        dayInCurrentCycle / 365.25
      )) *
    24
  );
}

export function displayCirclesAmount(
  amount: string,
  date: string,
  fixed: boolean,
  timeCircles: boolean = true
) {
  const dateTime = date ? dayjs(date) : dayjs();
  let value: number = 0;
  if (timeCircles) {
    value = convertCirclesToTimeCircles(
      Number.parseFloat(Web3.utils.fromWei(amount, "ether")),
      dateTime.toString()
    );
  } else {
    value = Number.parseFloat(Web3.utils.fromWei(amount, "ether"));
  }
  if (fixed) {
    return value.toFixed(2);
  } else {
    return value;
  }
}
