import { type NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import {
  calcDaysTillAbove75Percent,
  calcDaysTillBelow75Percent,
  classNames,
  pluralAndSingularClasses,
} from "../lib";
// import * as DarkReader from "darkreader";

const Home: NextPage = () => {
  const [labMode, setLabMode] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [numerator, setNumerator] = useState(1);
  const [denominator, setDenominator] = useState(1);
  const [incrementValue, setIncrementValue] = useState(1);
  const increaseBoth = useCallback(() => {
    setNumerator(numerator + incrementValue);
    setDenominator(denominator + incrementValue);
  }, [numerator, incrementValue, denominator]);

  const decreaseBoth = useCallback(() => {
    setNumerator(numerator - incrementValue);
    setDenominator(denominator - incrementValue);
  }, [numerator, incrementValue, denominator]);

  // useEffect to keep the denominator from being 0
  useEffect(() => {
    if (denominator === 0) {
      setDenominator(incrementValue);
    }
  }, [denominator, incrementValue]);

  // useEffect to keep the numerator from less than 0
  useEffect(() => {
    if (numerator < 0) {
      setNumerator(0);
    }
  }, [numerator]);

  useEffect(() => {
    if (labMode) {
      setIncrementValue(2);
    } else {
      setIncrementValue(1);
    }
  }, [labMode]);

  // useEffect to track dark mode
  useEffect(() => {
    import("darkreader").then((DarkReader) => {
      if (darkMode) {
        DarkReader.enable({
          brightness: 100,
          contrast: 90,
          sepia: 10,
        });
      } else {
        DarkReader.disable();
      }
    });
  }, [darkMode]);

  return (
    <>
      <Head>
        <title>{`A10Dance`}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-full min-h-screen gap-4 py-2">
        <header className="flex h-20 w-full flex-1 flex-col items-center justify-center p-0 text-center md:px-20">
          <h1 className="text-center text-4xl font-bold">{`Attendance Calculator`}</h1>
        </header>
        {/* center */}
        <main className="my-auto flex h-full w-full flex-1 flex-col items-center justify-center p-0 text-center md:px-20">
          {/* grid with 2 x 3 layout */}
          <div className="m-2 grid grid-cols-11 gap-4">
            {/* numerator input */}
            <div className="col-span-3 col-start-2 row-span-1 row-start-1 md:col-start-1">
              <input
                type="number"
                value={numerator}
                onChange={(e) => setNumerator(Number(e.target.value))}
                className="w-full"
              />
            </div>
            {/* denominator input */}
            <div className="col-span-3 col-start-2 row-span-1 row-start-2 md:col-start-1">
              <input
                type="number"
                value={denominator}
                onChange={(e) => setDenominator(Number(e.target.value))}
                min="1"
                className="w-full"
              />
            </div>
            {/* increase numerator */}
            <div className="col-span-1 col-start-5 row-span-1 row-start-1 md:col-start-4">
              <button
                className="w-full"
                onClick={() => setNumerator(numerator + incrementValue)}
              >
                +
              </button>
            </div>
            {/* increase denominator */}
            <div className="col-span-1 col-start-5 row-span-1 row-start-2 md:col-start-4">
              <button
                className="w-full"
                onClick={() => setDenominator(denominator + incrementValue)}
              >
                +
              </button>
            </div>
            {/* decrease numerator */}
            <div className="col-span-1 col-start-6 row-span-1 row-start-1 md:col-start-5">
              <button
                className="w-full"
                onClick={() => setNumerator(numerator - incrementValue)}
              >
                -
              </button>
            </div>
            {/* decrease denominator */}
            <div className="col-span-1 col-start-6 row-span-1 row-start-2 md:col-start-5">
              <button
                className="w-full"
                onClick={() => setDenominator(denominator - incrementValue)}
              >
                -
              </button>
            </div>
            {/* increase both */}
            <div className="col-span-4 row-span-1 row-start-1 md:col-span-2">
              <button
                className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                onClick={increaseBoth}
              >
                {`Increase both`}
              </button>
            </div>
            {/* decrease both */}
            <div className="col-span-4 row-span-1 row-start-2 md:col-span-2">
              <button
                className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                onClick={decreaseBoth}
              >
                {`Decrease both`}
              </button>
            </div>
            {/* fraction */}
            <div className="col-span-3 row-span-1 row-start-3 row-end-5 md:col-span-2 md:row-span-1 md:row-start-1 md:row-end-3">
              <div className="text-xl md:text-6xl">
                {numerator}/{denominator}
              </div>
            </div>
            {/* percentage */}
            <div className="col-span-5 row-span-1 row-start-3 row-end-5 md:col-span-2 md:row-span-1 md:row-start-1 md:row-end-3">
              <div className="text-xl md:text-6xl">
                {`${Math.round((numerator / denominator) * 10000) / 100}%`}
              </div>
            </div>
            {/* percentage with ceil */}
            <div className="col-span-3 row-span-1 row-start-3 row-end-5 md:col-span-2 md:row-span-1 md:row-start-1 md:row-end-3">
              <div className="text-xl md:text-6xl">
                {`${Math.ceil(
                  Math.round((numerator / denominator) * 10000) / 100
                )}%`}
              </div>
            </div>
            {/* div takes entire row */}
            <div className="col-span-11 row-span-1 flex items-center justify-around md:row-span-1">
              {/* toggle for lab mode */}
              <div className="flex flex-row justify-center">
                <label className="flex cursor-pointer items-center">
                  <div className="relative">
                    {/* input */}
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={labMode}
                      onChange={() => setLabMode(!labMode)}
                    />
                    {/* line */}
                    <div className="block h-8 w-14 rounded-full bg-gray-600" />
                    {/* dot */}
                    <div
                      className={classNames(
                        labMode ? "translate-x-6" : "translate-x-1",
                        "absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition"
                      )}
                    />
                  </div>
                  <div className="ml-3 font-medium text-gray-700">
                    {`Lab Mode`}
                  </div>
                </label>
              </div>
              {/* toggle for dark mode */}
              <div className="flex flex-row justify-center">
                <label className="flex cursor-pointer items-center">
                  <div className="relative">
                    {/* input */}
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={darkMode}
                      onChange={() => setDarkMode(!darkMode)}
                    />
                    {/* line */}
                    <div className="block h-8 w-14 rounded-full bg-gray-600" />
                    {/* dot */}
                    <div
                      className={classNames(
                        darkMode ? "translate-x-6" : "translate-x-1",
                        "absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition"
                      )}
                    />
                  </div>
                  <div className="ml-3 font-medium text-gray-700">
                    {`Dark Mode`}
                  </div>
                </label>
              </div>
            </div>

            {/* div takes entire row */}
            <div className="col-span-11 row-span-1 md:row-span-1">
              {numerator > denominator ? (
                <div
                  className={classNames(
                    "text-orange-300",
                    "text-xl md:text-6xl"
                  )}
                >
                  {`Oops Error!`}
                </div>
              ) : (
                <div
                  className={classNames(
                    numerator / denominator >= 0.75
                      ? "text-green-400"
                      : "text-red-400",
                    "text-xl md:text-6xl"
                  )}
                >
                  {`${
                    numerator / denominator >= 0.75
                      ? `You can miss ${calcDaysTillBelow75Percent({
                          numerator,
                          denominator,
                          incrementValue,
                        })} ${pluralAndSingularClasses(
                          calcDaysTillBelow75Percent({
                            numerator,
                            denominator,
                            incrementValue,
                          })
                        )}!`
                      : `You need to attend ${calcDaysTillAbove75Percent({
                          numerator,
                          denominator,
                          incrementValue,
                        })} ${pluralAndSingularClasses(
                          calcDaysTillAbove75Percent({
                            numerator,
                            denominator,
                            incrementValue,
                          })
                        )}!`
                  }`}
                </div>
              )}
            </div>
            {/* div takes entire row */}
            <div className="col-span-11 row-span-1 md:row-span-1">
              {numerator > denominator ? (
                <div
                  className={classNames(
                    "text-orange-300",
                    "text-xl md:text-4xl"
                  )}
                >
                  {`Please make sure the numerator is less than the denominator!`}
                </div>
              ) : (
                <div
                  className={classNames(
                    numerator / denominator >= 0.75
                      ? "text-green-400"
                      : "text-red-400",
                    "text-xl md:text-4xl"
                  )}
                >
                  {`${
                    numerator / denominator >= 0.75
                      ? `You are good to go!`
                      : `You need to attend more classes!`
                  }`}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
