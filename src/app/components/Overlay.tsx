import { FC } from "react";
import { RiDragMoveLine } from "react-icons/ri";
import { FaRightFromBracket } from "react-icons/fa6";
import { animated, useSpring, useTrail, useTransition } from "@react-spring/web";

interface OverlayProps {}

const Overlay: FC<OverlayProps> = ({}) => {
  const springInfo = useSpring({
    from: { z: -500, opacity: 0 },
    to: { z: 0, opacity: 1 },
    delay: 1500,
    duration: 1500,
  });
  const springExplore = useSpring({
    from: { z: -500, opacity: 0 },
    to: { z: 0, opacity: 1 },
    delay: 1500,
    duration: 1500,
  });

  const springTransition = useSpring({
    from: { z: -500, opacity: 0 },
    to: { z: 0, opacity: 1 },
    delay: 1500,
    duration: 1500,
  });
    

  const [trails, api] = useTrail(
    1,
    () => ({
      from: { opacity: 0, x: 20, height: 0 },
      to: { opacity: 1, x: 0, height: 110 },
      duration: 2000,
      delay: 1000,
      config: { mass: 5, tension: 2000, friction: 200 },
    }),
    []
  );

  return (
    <div className="">
      <h1 className="font-bold italic text-black text-[150px] leading-none absolute top-20 left-16 w-72">
        {trails.map((props) => (
          <animated.div style={props}>Let's Take Off!</animated.div>
        ))}
      </h1>
      <animated.button style={{...springTransition}} className="absolute bottom-32 rounded bg-gradient-to-r from-amber-400 to-[#FFA500] font-bold flex items-center justify-center gap-4 text-xl py-3 left-16 w-72">
        Explore <FaRightFromBracket />
      </animated.button>
      <animated.div
        style={{ ...springInfo }}
        className="absolute bottom-20 right-16 w-2/4 text-right"
      >
        <h3 className="font-bold text-xl">Boeing-Stearman Model 75</h3>
        <p>
          7 cylinder 220 HP Continental R-670-5 radial engine pulled by a
          Sensenich wooden propeller. Most still-airworthy Boeing-Stearman's now
          have higher-performance metal propellers, like Capt. Walker's, which
          has a 102-inch diameter ground-adjustable McCauley propeller.
        </p>
      </animated.div>
      <span className="absolute bottom-0 inset-x-0 grid place-items-center">
        <RiDragMoveLine className="text-2xl" />
        <p className="font-semibold text-xl">Drag to Rotate</p>
      </span>
    </div>
  );
};

export default Overlay;
