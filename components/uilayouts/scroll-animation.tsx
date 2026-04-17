'use client';

import { cn } from '@/lib/utils';
import {
  motion,
  HTMLMotionProps,
  SVGMotionProps,
  useInView,
} from 'motion/react';
import React, { useRef } from 'react';
type Direction = 'up' | 'down' | 'left' | 'right';

const generateVariants = (
  direction: Direction
): { hidden: any; visible: any } => {
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const isHorizontal = axis === 'x';
  const value = direction === 'right' 
    ? (isHorizontal ? '100vw' : 100) 
    : direction === 'down' 
      ? 100 
      : (isHorizontal ? '-100vw' : -100);

  return {
    hidden: { filter: 'blur(10px)', opacity: 0, [axis]: value },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      [axis]: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };
};

const defaultViewport = { amount: 0.3, margin: '0px 0px -200px 0px' };
type MotionComponentProps = HTMLMotionProps<any> & SVGMotionProps<any>;

interface ScrollElementProps extends Omit<MotionComponentProps, 'children'> {
  children: React.ReactNode;
  className?: string;
  variants?: {
    hidden?: any;
    visible?: any;
  };
  viewport?: {
    amount?: number;
    margin?: string;
    once?: boolean;
  };
  delay?: number;
  direction?: Direction;
}

function ScrollElement({
  children,
  className,
  variants,
  viewport = defaultViewport,
  delay = 0, 
  direction = 'down',
  ...rest
}: ScrollElementProps) {
  const baseVariants = variants || generateVariants(direction);
  const modifiedVariants = {
    hidden: baseVariants.hidden,
    visible: {
      ...baseVariants.visible,
      transition: {
        ...baseVariants.visible.transition,
        delay, 
      },
    },
  };

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: viewport.once,
    amount: viewport.amount,
    margin: viewport.margin as any,
  });

  return (
    <motion.div ref={ref} className={cn(className)} {...rest}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={modifiedVariants}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
export default ScrollElement;
