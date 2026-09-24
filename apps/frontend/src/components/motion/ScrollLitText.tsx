'use client';

import React, { useRef } from 'react';
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion';

interface ScrollLitTextProps {
  text: string;
  className?: string;
  as?: 'p' | 'h2';
}

/**
 * Text that lights up word by word as it scrolls through the viewport, so the
 * reader's own scrolling sets the pace of the sentence.
 */
export function ScrollLitText({ text, className = '', as = 'p' }: ScrollLitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.45'],
  });

  const words = text.split(' ');
  const Tag = as as any;

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          still={!!reduce}
        >
          {word}
        </Word>
      ))}
    </Tag>
  );
}

function Word({
  children,
  progress,
  range,
  still,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  still: boolean;
}) {
  const opacity = useTransform(progress, range, still ? [1, 1] : [0.16, 1]);
  return (
    <motion.span aria-hidden style={{ opacity }} className="inline">
      {children}{' '}
    </motion.span>
  );
}
