import React from 'react';
import { motion } from 'framer-motion';
import GuideCard from './GuideCard';

/**
 * Grid layout wrapper that displays filtered guide results.
 * Animates guides appearing with smooth stagger/fade effects.
 */
export default function GuideGrid({
  guides = [],
  isCompared,
  onCompareToggle
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6"
    >
      {guides.map(guide => (
        <motion.div key={guide.id} variants={itemVariants}>
          <GuideCard
            guide={guide}
            isCompared={isCompared(guide.id)}
            onCompareToggle={onCompareToggle}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
