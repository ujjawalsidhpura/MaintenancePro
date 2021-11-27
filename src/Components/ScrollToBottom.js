import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToBottom = ({ children }, props) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(100, 10000);
  }, [pathname]);

  return children || null;
};

export default ScrollToBottom;