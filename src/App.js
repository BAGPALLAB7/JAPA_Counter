import { useEffect, useState } from "react";
import myAudio from "./Audio/new-notification-on-your-device-138695.mp3";

function App() {
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const [count, setCount] = useState(0);
  const [malaCount, setMalaCount] = useState(0);

  useEffect(() => {
    const localCount = JSON.parse(localStorage.getItem("japaCount"));
    if (localCount) {
      console.log("storedCount : ", localCount);
      setCount(localCount);
    } else {
      console.log("localCount not found");
      localStorage.setItem("japaCount", JSON.stringify(count));
    }

    const localMalaCount = JSON.parse(localStorage.getItem("malaCount"));
    if (localMalaCount) {
      console.log("local malaCount",localMalaCount);
      setMalaCount(localMalaCount);
    } else {
      console.log("local mala count not found");
      localStorage.setItem("malaCount", JSON.stringify(malaCount));
    }
    const isDark = JSON.parse(localStorage.getItem("dark"));
    if (isDark) {
      console.log("isdark", isDark);
      setDark(isDark);
    } else {
      console.log("dark not found");
      localStorage.setItem("dark", JSON.stringify(dark));
    }
  }, []);

  useEffect(() => {
    if (count !== 0 && count % 108 === 0) {
      audio.play();
      vibrate(1000);
      localStorage.setItem("malaCount", JSON.stringify(malaCount + 1));
      setMalaCount((prev) => prev + 1);
      setCount(0);
    } else if (count !== 0 && count % 10 === 0) {
      vibrate(100);
    }
  }, [count]);

  const audio = new Audio(myAudio);

  //console.log("dark :",dark);
  const vibrate = (duration) => {
    if ("vibrate" in navigator) {
      window.navigator.vibrate([duration]);
    } else {
      console.log("vibrate not found");
      return;
    }
  };
  const increase = () => {
    vibrate(10)
    localStorage.setItem("japaCount", JSON.stringify(count + 1));
    setCount((prev) => prev + 1);
  };
  const decrease = () => {
    vibrate(10)
    localStorage.setItem("japaCount", JSON.stringify(count - 1));
    setCount((prev) => prev - 1);
  };
  const resetCounter = () => {
    setMenu(false);
    setCount(0);
    localStorage.setItem("japaCount", JSON.stringify(0));
  };
  const resetAllCounter = () => {
    setMenu(false);
    setCount(0);
    setMalaCount(0);
    localStorage.setItem("japaCount", JSON.stringify(0));
    localStorage.setItem("malaCount", JSON.stringify(0));
  };
  return (
    <div
      className={
        dark
          ? "bg-gray-700 w-screen h-screen flex flex-col justify-center items-center"
          : "w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-b from-yellow-50 to-yellow-300"
      }
    >
      <header className="w-screen h-24 items-center flex justify-between px-2  bg-gradient-to-b from-gray-400 to-transparent">
        <span
          className={
            dark
              ? "font-bold text-slate-300 text-xl"
              : "font-bold text-slate-600 text-xl"
          }
        >
          JAPA Counter
        </span>
        <span>
          {dark ? (
            <img
              onClick={() => setMenu(!menu)}
              width="20"
              height="20"
              src="https://img.icons8.com/color-glass/48/menu-2.png"
              alt="menu-2"
            />
          ) : (
            <img
              onClick={() => setMenu(!menu)}
              width="20"
              height="20"
              src="https://img.icons8.com/ios-glyphs/30/menu-2.png"
              alt="menu-2"
            />
          )}
        </span>
      </header>
      {menu ? (
        <div className="absolute top-0 right-0 bg-gray-700 w-52 p-4 rounded-lg text-gray-400 border-gray-400 border">
          <div
            className="absolute top-2 right-3 "
            onClick={() => setMenu(false)}
          >
            X
          </div>
          <ul className="">
            <li
              className="flex p-2 my-2  cursor-pointer"
              onClick={resetCounter}
            >
              Reset Counter
              <img
                width="25"
                height="25"
                className="mx-1"
                src="https://img.icons8.com/arcade/64/counter.png"
                alt="counter"
              />
            </li>
            <li
              className="flex p-2 my-2 cursor-pointer"
              onClick={() => {
                localStorage.setItem("dark", JSON.stringify(!dark));
                setDark(!dark);
                setMenu(!menu);
              }}
            >
              {dark ? (
                <>
                  Light
                  <svg
                    className="mx-1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20"
                    height="20"
                    viewBox="0 0 128 128"
                  >
                    <path
                      fill="#fff0b3"
                      d="M67.4,13.9l9.3-5.5c3.5-2,8-0.6,9.6,3.1l4.3,9.9c1,2.2,3.1,3.8,5.5,4l10.8,1c4,0.4,6.8,4.2,5.9,8.2 l-2.3,10.6c-0.5,2.4,0.3,4.9,2.1,6.5l8.1,7.2c3,2.7,3,7.4,0,10.1l-8.1,7.2c-1.8,1.6-2.6,4.1-2.1,6.5l2.3,10.6 c0.9,3.9-1.9,7.8-5.9,8.2l-10.8,1c-2.4,0.2-4.5,1.8-5.5,4l-4.3,9.9c-1.6,3.7-6.1,5.2-9.6,3.1l-9.3-5.5c-2.1-1.2-4.7-1.2-6.8,0 l-9.3,5.5c-3.5,2-8,0.6-9.6-3.1l-4.3-9.9c-1-2.2-3.1-3.8-5.5-4l-10.8-1c-4-0.4-6.8-4.2-5.9-8.2l2.3-10.6c0.5-2.4-0.3-4.9-2.1-6.5 L7.2,69c-3-2.7-3-7.4,0-10.1l8.1-7.2c1.8-1.6,2.6-4.1,2.1-6.5l-2.3-10.6c-0.9-3.9,1.9-7.8,5.9-8.2l10.8-1c2.4-0.2,4.5-1.8,5.5-4 l4.3-9.9c1.6-3.7,6.1-5.2,9.6-3.1l9.3,5.5C62.7,15.2,65.3,15.2,67.4,13.9z"
                    ></path>
                    <path
                      fill="#f2b630"
                      d="M15.1,37.7c-1.4,0-2.6-1-2.9-2.4c-0.6-2.7,0-5.6,1.6-7.8c1.6-2.3,4.2-3.7,6.9-4l5-0.5c1.6-0.2,3.1,1,3.3,2.7 c0.2,1.6-1,3.1-2.7,3.3l-5,0.5c-1.1,0.1-2,0.6-2.7,1.5C18,31.9,17.8,33,18,34c0.4,1.6-0.7,3.2-2.3,3.6 C15.5,37.7,15.3,37.7,15.1,37.7z"
                    ></path>
                    <path
                      fill="#f2b630"
                      d="M80.2,117.5c-0.7,0-1.3-0.2-1.9-0.5l-9.4-5.5c-3-1.8-6.9-1.8-9.9,0c-1.4,0.8-3.3,0.4-4.1-1.1 c-0.8-1.4-0.4-3.3,1.1-4.1c4.8-2.8,11.1-2.8,16,0l7.1,4.2l3.3-7.6c2.3-5.2,7.2-8.8,12.9-9.4l10.8-1c1.6-0.2,3.1,1,3.3,2.7 c0.2,1.6-1,3.1-2.7,3.3l-10.8,1c-3.5,0.3-6.6,2.6-8,5.8l-4.3,9.9C83,116.6,81.6,117.5,80.2,117.5z"
                    ></path>
                    <path
                      fill="#f2b630"
                      d="M108.7,74.7c-0.8,0-1.7-0.3-2.2-1c-1.1-1.2-1-3.1,0.3-4.2l6.2-5.5l-6.2-5.5c-4.3-3.8-6.2-9.6-4.9-15.2 l2.1-9.3c-0.3-0.5-0.5-1.2-0.4-1.8c0.2-1.6,1.6-2.9,3.3-2.7c1.1,0.1,2,0.6,2.7,1.5c0.6,0.9,0.9,1.9,0.6,3l-2.3,10.6 c-0.8,3.4,0.4,7,3,9.4l8.1,7.2c0.8,0.7,1.3,1.7,1.3,2.8c0,1.1-0.4,2.1-1.3,2.8l-8.1,7.2C110.1,74.5,109.4,74.7,108.7,74.7z M114.8,62.3C114.8,62.3,114.8,62.3,114.8,62.3L114.8,62.3z M106.1,35.5L106.1,35.5L106.1,35.5z"
                    ></path>
                    <circle cx="64" cy="64" r="34" fill="#fff"></circle>
                    <path
                      fill="#f2b630"
                      d="M59.4,43.4c-1.4,0-2.7-1-2.9-2.4c-0.3-1.6,0.7-3.2,2.4-3.5c1.7-0.3,3.4-0.5,5.2-0.5c1.7,0,3,1.3,3,3 s-1.3,3-3,3c-1.3,0-2.7,0.1-4,0.4C59.8,43.4,59.6,43.4,59.4,43.4z"
                    ></path>
                    <path
                      fill="#f2b630"
                      d="M47,84c-0.8,0-1.5-0.3-2.1-0.9C39.8,78,37,71.2,37,64c0-5.3,1.5-10.5,4.5-14.9c0.9-1.4,2.8-1.8,4.2-0.8 c1.4,0.9,1.8,2.8,0.8,4.2C44.2,55.9,43,59.9,43,64c0,5.6,2.2,10.9,6.2,14.8c1.2,1.2,1.2,3.1,0,4.2C48.6,83.7,47.8,84,47,84z"
                    ></path>
                    <path
                      fill="#444b54"
                      d="M41.7,119.5c-1.2,0-2.3-0.7-2.8-1.8l-4.3-9.9c-0.5-1.2-1.7-2.1-3.1-2.2l-10.8-1c-2.8-0.3-5.3-1.7-6.9-4 c-1.6-2.3-2.2-5.1-1.6-7.8l2.3-10.6c0.3-1.3-0.2-2.7-1.2-3.6l-8.1-7.2c-2.1-1.8-3.3-4.5-3.3-7.3s1.2-5.4,3.3-7.3l8.1-7.2 c1-0.9,1.5-2.3,1.2-3.6c-0.4-1.6,0.7-3.2,2.3-3.6c1.6-0.4,3.2,0.7,3.6,2.3c0.8,3.4-0.4,7-3,9.4l-8.1,7.2 c-0.8,0.7-1.3,1.7-1.3,2.8s0.4,2.1,1.3,2.8l8.1,7.2c2.6,2.3,3.8,5.9,3,9.4L18,94c-0.2,1.1,0,2.1,0.6,3c0.6,0.9,1.6,1.4,2.7,1.5 l10.8,1c3.5,0.3,6.6,2.6,8,5.8l4.3,9.9c0.7,1.5,0,3.3-1.6,3.9C42.5,119.4,42.1,119.5,41.7,119.5z"
                    ></path>
                    <path
                      fill="#444b54"
                      d="M80.2,123.5c-1.7,0-3.4-0.5-4.9-1.3l-9.3-5.5c-1.2-0.7-2.6-0.7-3.8,0l-9.3,5.5c-1.4,0.8-3.3,0.4-4.1-1.1 c-0.8-1.4-0.4-3.3,1.1-4.1l9.3-5.5c3-1.8,6.8-1.8,9.9,0l9.3,5.5c0.9,0.5,2,0.7,3,0.3c1-0.3,1.8-1.1,2.3-2.1l4.3-9.9 c0.7-1.5,2.4-2.2,3.9-1.6c1.5,0.7,2.2,2.4,1.6,3.9l-4.3,9.9c-1.1,2.6-3.3,4.5-5.9,5.4C82.2,123.3,81.2,123.5,80.2,123.5z"
                    ></path>
                    <path
                      fill="#444b54"
                      d="M107,104.5c-1.5,0-2.8-1.2-3-2.7c-0.2-1.6,1-3.1,2.7-3.3c1.1-0.1,2-0.6,2.7-1.5c0.6-0.9,0.9-1.9,0.6-3 l-2.3-10.6c-0.8-3.4,0.4-7,3-9.4l8.1-7.2c0.8-0.7,1.3-1.7,1.3-2.8s-0.4-2.1-1.3-2.8l-8.1-7.2c-2.6-2.3-3.8-5.9-3-9.4L110,34 c0.2-1.1,0-2.1-0.6-3c-0.6-0.9-1.6-1.4-2.7-1.5c-1.6-0.2-2.9-1.6-2.7-3.3c0.2-1.6,1.6-2.9,3.3-2.7c2.8,0.3,5.3,1.7,6.9,4 c1.6,2.3,2.2,5.1,1.6,7.8l-2.3,10.6c-0.3,1.3,0.2,2.7,1.2,3.6l8.1,7.2c2.1,1.8,3.3,4.5,3.3,7.3s-1.2,5.4-3.3,7.3l-8.1,7.2 c-1,0.9-1.5,2.3-1.2,3.6l2.3,10.6c0.6,2.7,0,5.6-1.6,7.8c-1.6,2.3-4.2,3.7-6.9,4C107.2,104.5,107.1,104.5,107,104.5z"
                    ></path>
                    <path
                      fill="#444b54"
                      d="M90.7,24.5c-1.2,0-2.3-0.7-2.8-1.8l-4.3-9.9c-0.4-1-1.2-1.7-2.3-2.1c-1-0.3-2.1-0.2-3,0.3l-9.3,5.5 c-3,1.8-6.8,1.8-9.9,0L49.7,11c-0.9-0.5-2-0.7-3-0.3c-1,0.3-1.8,1.1-2.3,2.1c-0.7,1.5-2.4,2.2-3.9,1.6c-1.5-0.7-2.2-2.4-1.6-3.9 C40,7.8,42.2,5.8,44.8,5c2.6-0.9,5.5-0.5,7.9,0.9l9.3,5.5c1.2,0.7,2.6,0.7,3.8,0l9.3-5.5c2.4-1.4,5.3-1.7,7.9-0.9 s4.8,2.8,5.9,5.4l4.3,9.9c0.7,1.5,0,3.3-1.6,3.9C91.5,24.4,91.1,24.5,90.7,24.5z"
                    ></path>
                    <path
                      fill="#444b54"
                      d="M124,127c-0.8,0-1.5-0.3-2.1-0.9l-10.6-10.5c-1.2-1.2-1.2-3.1,0-4.2s3.1-1.2,4.2,0l10.6,10.5 c1.2,1.2,1.2,3.1,0,4.2C125.5,126.7,124.8,127,124,127z"
                    ></path>
                    <path
                      fill="#444b54"
                      d="M116,15c-0.8,0-1.5-0.3-2.1-0.9c-1.2-1.2-1.2-3.1,0-4.2l8-8c1.2-1.2,3.1-1.2,4.2,0c1.2,1.2,1.2,3.1,0,4.2 l-8,8C117.5,14.7,116.8,15,116,15z"
                    ></path>
                    <path
                      fill="#f2b630"
                      d="M13.3,16.3c-0.8,0-1.5-0.3-2.1-0.9L1.9,6.1c-1.2-1.2-1.2-3.1,0-4.2C3,0.7,5,0.7,6.1,1.9l9.3,9.3 c1.2,1.2,1.2,3.1,0,4.2C14.9,16,14.1,16.3,13.3,16.3z"
                    ></path>
                    <circle cx="24" cy="4" r="3" fill="#f2b630"></circle>
                  </svg>
                </>
              ) : (
                <>
                  Dark
                  <img
                    className="mx-1"
                    width="25"
                    height="25"
                    src="https://img.icons8.com/emoji/48/crescent-moon-emoji.png"
                    alt="crescent-moon-emoji"
                  />
                </>
              )}
            </li>
            <li
              className="flex p-2 my-2 cursor-pointer"
              onClick={() => alert("Creator of this JAPA Counter is : bagpallab7")}
            >
              About{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-1"
                width="25"
                height="25"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#8ce7f2"
                  d="M28,9.5C17.8,9.5,9.5,17.8,9.5,28c0,3.3,0.9,6.3,2.3,9l-2.3,8.2c-0.2,0.8,0.5,1.4,1.2,1.2l8.2-2.3	c2.7,1.5,5.7,2.3,9,2.3c10.2,0,18.5-8.3,18.5-18.5S38.2,9.5,28,9.5z"
                ></path>
                <line
                  x1="24"
                  x2="24"
                  y1="14.5"
                  y2="26.5"
                  fill="none"
                  stroke="#18193f"
                  strokeLinecap="round"
                  strokeWidth="3"
                ></line>
                <path
                  fill="none"
                  stroke="#18193f"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M41.1,31c0.9-2.2,1.4-4.5,1.4-7c0-10.2-8.3-18.5-18.5-18.5c-2.9,0-5.6,0.6-8,1.8"
                ></path>
                <path
                  fill="none"
                  stroke="#18193f"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M9.8,12.2C7.1,15.4,5.5,19.5,5.5,24c0,3.3,0.9,6.3,2.3,9l-2.3,8.2C5.3,42,6,42.7,6.8,42.5l8.2-2.3	c2.7,1.5,5.7,2.3,9,2.3c4.7,0,9.1-1.8,12.3-4.7"
                ></path>
                <circle cx="24" cy="33" r="2" fill="#18193f"></circle>
              </svg>
            </li>
            <li
              className="flex p-2 my-2 cursor-pointer"
              onClick={resetAllCounter}
            >
              Reset All{" "}
              <img
                className="mx-1"
                width="25"
                height="25"
                src="https://img.icons8.com/fluency/48/update-left-rotation--v1.png"
                alt="update-left-rotation--v1"
              />
            </li>
          </ul>
        </div>
      ) : (
        <></>
      )}
      <div className="flex flex-col items-center w-screen justify-center py-4">
        <h1 className="py-2 text-6xl text-gray-400"> {count}</h1>
        <h1 className="">
          <span className="text-slate-500"> 108 x {malaCount}</span>
        </h1>
      </div>
      <div className="flex flex-col h-full items-center py-5">
        <div
          className={
            dark
              ? " flex justify-center w-20 h-20 rounded-full bg-gray-500 mb-8 items-center text-red-400"
              : " flex justify-center w-20 h-20 rounded-full bg-red-200 mb-8 items-center text-red-400"
          }
          onClick={decrease}
        >
          -
        </div>
        <div
          className={
            dark
              ? "flex justify-center items-center w-[300px] h-[300px] rounded-full bg-gray-500 text-green-400 "
              : "flex justify-center items-center w-[300px] h-[300px] rounded-full bg-green-200 text-green-400 "
          }
          onClick={increase}
        >
          +
        </div>
      </div>
    </div>
  );
}

export default App;
