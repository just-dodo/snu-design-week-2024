import React, { useState, useEffect, useCallback } from "react";

const MouseTrail = () => {
  const [dots, setDots] = useState([]);
  const [lastDot, setLastDot] = useState(null);

  // Calculate distance between two points
  const getDistance = (p1, p2) => {
    if (!p1 || !p2) return 0;
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };

  // Handle mouse movement
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const newDot = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      };

      const interpolatedDots: { x: number; y: number; id: number }[] = [];
      // Only add new dot if distance from last dot is >= 12px
      if (!lastDot || getDistance(newDot, lastDot) >= 12) {
        if (lastDot) {
          const distance = getDistance(newDot, lastDot);
          const steps = Math.floor(distance / 12);
          for (let i = 1; i <= steps; i++) {
            interpolatedDots.push({
              x: lastDot.x + ((newDot.x - lastDot.x) / distance) * 12 * i,
              y: lastDot.y + ((newDot.y - lastDot.y) / distance) * 12 * i,
              id: Date.now() + "_" + i,
            });
          }
        }
        setDots((prevDots) => [...prevDots, ...interpolatedDots]);
        setLastDot(interpolatedDots[interpolatedDots.length - 1]);

        // Remove every dot after 2 seconds
        for (let i = 0; i < interpolatedDots.length; i++) {
          setTimeout(() => {
            setDots((prevDots) =>
              prevDots.filter((dot) => dot.id !== interpolatedDots[i].id)
            );
          }, 2000 + i * 10);
        }
        // setTimeout(() => {
        //   setDots((prevDots) => prevDots.filter((dot) => dot.id !== newDot.id));
        // }, 2000 + interpolatedDots.length * 10);
      }
    },
    [lastDot]
  );

  useEffect(() => {
    // Add event listener to window instead of a specific div
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50"
      style={{ isolation: "isolate" }}
    >
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute w-[14.3px] h-[14.3px] rounded-full bg-[#00BD84]"
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
