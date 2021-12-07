export default function listenForOutsideClicks(listening, setListening, menuRef, setisActive) {
  return () => {
    if (listening) return;
    if (!menuRef.current) return;
    setListening(true);
    [`click`].forEach((type) => {
      document.addEventListener(`click`, (evt) => {
        if (menuRef.current && menuRef.current.contains(evt.target)) return;
        setisActive(false);
      });
    });
  }
}