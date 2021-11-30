import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToBottom = ({ children }, props) => {
  const { pathname } = useLocation();

  useEffect(() => {
		document.getElementById('chat-box').scrollIntoView({block: "end", inline: "nearest"})
  }, [pathname]);

  return children || null;
};

export default ScrollToBottom;