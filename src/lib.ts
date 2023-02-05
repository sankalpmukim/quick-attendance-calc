interface CalcInputType {
  numerator: number;
  denominator: number;
  incrementValue: number;
}

export const calcDaysTillBelow75Percent = ({
  numerator,
  denominator,
  incrementValue,
}: CalcInputType) => {
  const num = numerator;
  let den = denominator;
  let fraction = numerator / denominator;
  let count = 0;

  while (Math.ceil(Math.round(fraction * 10000) / 100) >= 75) {
    den += 1;
    fraction = num / den;
    count += 1;
  }

  return Math.floor((count - 1) / incrementValue);
};

export const calcDaysTillAbove75Percent = ({
  numerator,
  denominator,
  incrementValue,
}: CalcInputType) => {
  let num = numerator;
  let den = denominator;
  let fraction = numerator / denominator;
  let count = 0;

  while (Math.ceil(Math.round(fraction * 10000) / 100) <= 75) {
    den += 1;
    num += 1;
    fraction = num / den;
    count += 1;
  }

  return Math.floor((count - 1) / incrementValue);
};

export const pluralAndSingularClasses = (count: number) => {
  return count === 1 ? "class" : "classes";
};

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};
