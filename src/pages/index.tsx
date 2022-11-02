import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [numerator, setNumerator] = useState(1);
  const [denominator, setDenominator] = useState(1);
  const increaseBoth = () => {
    setNumerator(numerator + 1);
    setDenominator(denominator + 1);
  };

  const decreaseBoth = () => {
    setNumerator(numerator - 1);
    setDenominator(denominator - 1);
  };

  // useEffect to keep the denominator from being 0
  useEffect(() => {
    if (denominator === 0) {
      setDenominator(1);
    }
  }, [denominator]);

  // useEffect to keep the numerator from less than 0
  useEffect(() => {
    if (numerator < 0) {
      setNumerator(0);
    }
  }, [numerator]);

  // useEffect to keep the numerator less than the denominator
  useEffect(() => {
    if (numerator > denominator) {
      setNumerator(denominator);
    }
  }, [numerator, denominator]);

  return (
    <>
      <Head>
        <title>{`Atitix`}</title>
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
          <div className="m-2 grid grid-cols-11 grid-rows-3 gap-4 md:grid-rows-2">
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
                onClick={() => setNumerator(numerator + 1)}
              >
                +
              </button>
            </div>
            {/* increase denominator */}
            <div className="col-span-1 col-start-5 row-span-1 row-start-2 md:col-start-4">
              <button
                className="w-full"
                onClick={() => setDenominator(denominator + 1)}
              >
                +
              </button>
            </div>
            {/* decrease numerator */}
            <div className="col-span-1 col-start-6 row-span-1 row-start-1 md:col-start-5">
              <button
                className="w-full"
                onClick={() => setNumerator(numerator - 1)}
              >
                -
              </button>
            </div>
            {/* decrease denominator */}
            <div className="col-span-1 col-start-6 row-span-1 row-start-2 md:col-start-5">
              <button
                className="w-full"
                onClick={() => setDenominator(denominator - 1)}
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
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
