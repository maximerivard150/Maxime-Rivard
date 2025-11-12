
import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onFinished?: () => void;
  className?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, speed = 30, onFinished, className }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText(''); // Reset on text change
    let i = 0;
    const intervalId = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(intervalId);
        if (onFinished) {
          onFinished();
        }
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed, onFinished]);

  return <span className={className}>{displayedText}</span>;
};

export default TypewriterText;
