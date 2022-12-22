export const calcDaysTillBelow75Percent = (
  numerator: number,
  denominator: number
) => {
  const num = numerator;
  let den = denominator;
  let fraction = numerator / denominator;
  let count = 0;

  while (Math.ceil(Math.round(fraction * 10000) / 100) >= 75) {
    den += 1;
    fraction = num / den;
    count += 1;
  }

  return count - 1;
};

export const calcDaysTillAbove75Percent = (
  numerator: number,
  denominator: number
) => {
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

  return count - 1;
};

export const pluralAndSingularClasses = (count: number) => {
  return count === 1 ? "class" : "classes";
};

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};
