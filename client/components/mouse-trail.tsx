import React, { useState, useEffect, useCallback } from "react";

type Dot = {
  x: number;
  y: number;
  id: string;
  timestamp: number;
};

const TRAIL_DURATION_MAX = 600;
const TRAIL_DURATION_MIN = 500;
const TRAIL_STEP_SIZE = 9;
const TRAIL_MAX_DOTS = 90;
const MouseTrail = () => {
  const [dots, setDots] = useState<Dot[]>([]);
  const [lastDot, setLastDot] = useState<Dot | null>(null);

  // Calculate distance between two points
  const getDistance = (p1: Dot, p2: Dot) => {
    if (!p1 || !p2) return 0;
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };

  // Handle mouse movement
  const handleMouseMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const isMouseEvent = e instanceof MouseEvent;
      const newDot = {
        x: isMouseEvent ? e.clientX : (e as TouchEvent).touches[0].clientX,
        y: isMouseEvent ? e.clientY : (e as TouchEvent).touches[0].clientY,
        id: `${Date.now()}`,
        timestamp: Date.now(),
      };

      // Only add new dot if distance from last dot is >= 12px
      if (!!lastDot) {
        const interpolatedDots: Dot[] = [];
        const distance = getDistance(newDot, lastDot);
        const steps = Math.floor(distance / TRAIL_STEP_SIZE);
        for (let i = 1; i <= steps; i++) {
          interpolatedDots.push({
            x:
              lastDot.x +
              ((newDot.x - lastDot.x) / distance) * TRAIL_STEP_SIZE * i,
            y:
              lastDot.y +
              ((newDot.y - lastDot.y) / distance) * TRAIL_STEP_SIZE * i,
            id: `${Date.now()}_${i}`,
            timestamp: Date.now(),
          });
        }
        setDots((prevDots) => [...prevDots, ...interpolatedDots].reverse().slice(0, TRAIL_MAX_DOTS).reverse());
        if (steps > 0) {
          setLastDot(interpolatedDots[steps - 1]);
        }

        // Remove every dot after 2 seconds
        for (let i = 0; i < interpolatedDots.length; i++) {
          setTimeout(() => {
            setDots((prevDots) =>
              prevDots.filter(
                (dot) =>
                  dot.id !== interpolatedDots[i].id &&
                  Date.now() - dot.timestamp < TRAIL_DURATION_MAX
              ).reverse().slice(0, TRAIL_MAX_DOTS).reverse()
            );
          }, TRAIL_DURATION_MIN + i * 1);
        }
      } else {
        setDots((prevDots) => [...prevDots, newDot].reverse().slice(0, TRAIL_MAX_DOTS).reverse());
        setLastDot(newDot);
        setTimeout(() => {
          setDots((prevDots) =>
            prevDots.filter(
              (dot) =>
                dot.id !== newDot.id &&
                Date.now() - dot.timestamp < TRAIL_DURATION_MAX
            ).reverse().slice(0, TRAIL_MAX_DOTS).reverse()
          );
        }, TRAIL_DURATION_MIN);
      }
    },
    [lastDot]
  );

  useEffect(() => {
    // Add event listener to window instead of a specific div
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <div
      className="trailContainer fixed inset-0 pointer-events-none z-[1000]"
      style={{ isolation: "isolate" }}
    >
      {dots.map((dot) => (
        <div
          key={dot.id}
          className={`absolute w-[14.3px] h-[14.3px] rounded-full bg-[#00BD84]`}
          style={{
            left: dot.x,
            top: dot.y,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
};

export default MouseTrail;
