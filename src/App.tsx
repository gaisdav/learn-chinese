import "./App.css";
import { first100 } from "./sentences.ts";
import { animated, useSpring } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

const windowWidth = window.innerWidth;
const velocityCacheKey = "speed";
const velocityCache: number =
  Number(localStorage.getItem(velocityCacheKey)) || 100000;

function App() {
  const [velocity, setVelocity] = useState(velocityCache);
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

  const restart = () => {};

  return (
    <>
      <div className="actions">
        <button onClick={increaseVelocity}>+</button>
        <button onClick={decreaseVelocity}>-</button>
        <div>
          <button disabled className="restartBtn" onClick={restart}>
            Restart
          </button>
        </div>
      </div>
      <animated.div
        ref={ref}
        style={{
          margin: 0,
          padding: 0,
          display: "flex",
          width: "fit-content",
          borderRadius: 8,
          ...springs,
        }}
      >
        {first100.map((sentence, index) => (
          <div className="item" key={index}>
            {index + 1}. {sentence}
          </div>
        ))}
      </animated.div>
    </>
  );
}

export default App;
