import { cn } from "@/lib/utils";
import { motion, type MotionValue, useMotionValue, useSpring, useTransform } from "motion/react";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

interface DockProps {
  className?: string;
  children: ReactNode;
  magnification?: number;
  distance?: number;
}

interface DockIconProps {
  className?: string;
  children?: ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 100;
const BASE_SIZE = 40;
const BASE_ICON_SIZE = 20;
const ICON_SIZE_RATIO = 0.5;
const SPRING = { mass: 0.1, stiffness: 150, damping: 12 };

// The zoom effect follows the mouse, so it only makes sense on wide screens
// with a precise pointer. On phones and touch tablets the icons keep a fixed,
// compact size defined by CSS classes.
const MAGNIFY_QUERY = "(min-width: 640px) and (hover: hover) and (pointer: fine)";

function useMagnify() {
  // Starts as false so the server render and the first client render use the
  // CSS sizes. The zoom is only switched on after mount.
  const [magnify, setMagnify] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(MAGNIFY_QUERY);
    const update = () => setMagnify(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return magnify;
}

interface DockContextValue {
  mouseX: MotionValue<number>;
  magnification: number;
  distance: number;
  magnify: boolean;
}

const DockContext = createContext<DockContextValue | null>(null);

const Dock = ({ className, children, magnification = DEFAULT_MAGNIFICATION, distance = DEFAULT_DISTANCE }: DockProps) => {
  const mouseX = useMotionValue(Infinity);
  const magnify = useMagnify();

  return (
    <DockContext.Provider value={{ mouseX, magnification, distance, magnify }}>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn("mx-auto w-max h-full flex items-end justify-center overflow-visible rounded-full border", className)}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
};

const DockIcon = ({ className, children }: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const context = useContext(DockContext);

  if (!context) {
    throw new Error("DockIcon must be used within a Dock component");
  }

  const { mouseX, magnification, distance, magnify } = context;

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const containerSize = useSpring(
    useTransform(distanceCalc, [-distance, 0, distance], [BASE_SIZE, magnification, BASE_SIZE]),
    SPRING
  );
  const iconSize = useSpring(
    useTransform(distanceCalc, [-distance, 0, distance], [BASE_ICON_SIZE, magnification * ICON_SIZE_RATIO, BASE_ICON_SIZE]),
    SPRING
  );

  return (
    <motion.div
      ref={ref}
      style={magnify ? { width: containerSize, height: containerSize } : undefined}
      // The size classes come last so they win over `size-full` from callers.
      // 40px on every screen. Exact px value on purpose: the site raises the
      // root font size (baseFontSize in config.ts), which would scale any
      // rem-based size.
      className={cn(
        "relative flex aspect-square items-center justify-center rounded-full shrink-0",
        className,
        "size-[40px]"
      )}
    >
      <motion.div
        style={magnify ? { width: iconSize, height: iconSize } : undefined}
        className="flex size-[20px] items-center justify-center"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export { Dock, DockIcon };
export type { DockProps, DockIconProps };
