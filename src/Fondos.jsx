import { useEffect } from 'react';

export const useBackground = (bgClass) => {
  useEffect(() => {
    const className = `body-${bgClass}`;
    document.body.classList.add(className);

    return () => {
      document.body.classList.remove(className);
    };
  }, [bgClass]);
};
