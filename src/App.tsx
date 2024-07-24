import "./App.css";
import { first100 } from "./sentences.ts";
import { animated, useSpring } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

const windowWidth = window.innerWidth;
const velocityCacheKey = "speed";
const fontSizeCacheKey = "fontSize";
const velocityCache: number =
  Number(localStorage.getItem(velocityCacheKey)) || 100000;
const fontSizeCache: number =
  Number(localStorage.getItem(fontSizeCacheKey)) || 16;

function App() {
  const [velocity, setVelocity] = useState(velocityCache);
  const [fontSize, setFontSize] = useState(fontSizeCache);
  const [toX, setToX] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const itemWidth = ref.current?.clientWidth || 0;

    if (itemWidth === 0) return;
    const toX = windowWidth - itemWidth - 40;
    setToX(toX);
  }, []);

  const springs = useSpring({
    delay: 500,
    config: { duration: velocity },
    from: { x: windowWidth - 20 },
    to: { x: toX },
  });

  const increaseVelocity = () => {
    const newVelocity = velocity / 1.1;
    setVelocity(newVelocity);
    localStorage.setItem(velocityCacheKey, newVelocity.toString());
  };

  const decreaseVelocity = () => {
    const newVelocity = velocity * 1.2;
    setVelocity(newVelocity);
    localStorage.setItem(velocityCacheKey, newVelocity.toString());
  };

  const increaseFontSize = () => {
    const newFontSize = fontSize + 1;
    setFontSize(newFontSize);
    localStorage.setItem(fontSizeCacheKey, newFontSize.toString());
  };

  const decreaseFontSize = () => {
    const newFontSize = fontSize - 1;
    setFontSize(newFontSize);
    localStorage.setItem(fontSizeCacheKey, newFontSize.toString());
  };

  const restart = () => {
    location.reload();
  };

  return (
    <div className="wrapper">
      <div className="content">
        <animated.div
          ref={ref}
          style={{
            fontSize,
            display: "flex",
            width: "fit-content",
            ...springs,
          }}
        >
          {first100.map((sentence, index) => (
            <div className="item" key={index}>
              {index + 1}. {sentence}
            </div>
          ))}
        </animated.div>
      </div>
      <div className="actions">
        <div>Font size</div>
        <div>
          <button onClick={increaseFontSize}>+</button>
          <button onClick={decreaseFontSize}>-</button>
        </div>
        <div>Speed</div>
        <div>
          <button onClick={increaseVelocity}>+</button>
          <button onClick={decreaseVelocity}>-</button>
        </div>
        <button className="restartBtn" onClick={restart}>
          Restart
        </button>
      </div>
    </div>
  );
}

export default App;
