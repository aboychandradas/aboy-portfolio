"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The resting state, and what the server renders. Prerendered HTML therefore
 * ships visible: the page reads without JavaScript, and reduced-motion
 * visitors never receive content that starts hidden.
 */
const revealed = { opacity: 1, y: 0 };

/**
 * The pre-reveal state. Applied after mount and only while a block is still
 * off-screen — the server HTML has already painted by then, so hiding
 * anything on screen would blink it away. Instant, for the same reason.
 */
const unrevealed = { opacity: 0, y: 20, transition: { duration: 0 } };

/**
 * The resting state again, reached instantly. Its own `transition` replaces the
 * component's, so neither `delay` nor the fade applies — this is accessibility
 * recovery, not animation.
 */
const revealedNow = { opacity: 1, y: 0, transition: { duration: 0 } };

export function Reveal({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [focusEntered, setFocusEntered] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    const node = ref.current;
    if (!node) return;

    // Arm only what the visitor has not seen. An animation is an enhancement
    // for content still to come, never a precondition for reading it.
    const { top, bottom } = node.getBoundingClientRect();
    if (top < window.innerHeight && bottom > 0) return;

    setArmed(true);
  }, [reduceMotion]);

  /**
   * Opacity does not remove a link from the tab order, so keyboard focus can
   * land inside a block that is still hidden — before the observer activates
   * it, or inside the bottom strip the observer is told to ignore, where it
   * would never activate at all. Recovery therefore cannot go through the
   * viewport observer, and it is one-way: re-hiding a block with focus inside
   * it is the same defect over again.
   */
  const recovered = armed && focusEntered;

  return (
    <motion.div
      ref={ref}
      className={className}
      // `false` renders the `animate` target as-is, with no entry animation,
      // which is what keeps `opacity:0` out of the server output.
      initial={false}
      animate={recovered ? revealedNow : armed ? unrevealed : revealed}
      // `whileInView` outranks `animate`, so dropping it is what lets the
      // recovery above take over a reveal that is mid-delay or mid-fade.
      whileInView={reduceMotion || recovered ? undefined : revealed}
      viewport={{ once: true, margin: "0px 0px -64px 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 0.61, 0.36, 1] }}
      // `focusin` semantics: descendants included.
      onFocus={() => setFocusEntered(true)}
    >
      {children}
    </motion.div>
  );
}
