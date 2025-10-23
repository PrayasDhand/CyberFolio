'use client';
import { cn } from '@/lib/utils';
import { motion, type MotionProps } from 'framer-motion';

interface MotionDivProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const MotionDiv = ({ children, className, delay = 0, ...props }: MotionDivProps) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};
