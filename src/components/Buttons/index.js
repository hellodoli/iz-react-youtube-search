import React, { useRef } from "react";

import { Button, Ink } from "./styled";

const ButtonRipple = ({ children, ...rest }) => {
  const btn = useRef(null);
  const ink = useRef(null);

  const rippleEffect = e => {
    const inkEle = ink.current;
    const btnEle = btn.current;

    inkEle.classList.remove("animate"); // remove animate first
    const d = Math.max(btnEle.offsetHeight, btnEle.offsetWidth);
    const boxInk = inkEle.getBoundingClientRect();
    const boxBtn = btnEle.getBoundingClientRect();
    if (typeof boxInk === "object" && boxInk.height <= 0 && boxInk.width <= 0) {
      inkEle.style.width = `${d}px`;
      inkEle.style.height = `${d}px`;
    }

    if (typeof boxBtn === "object") {
      const x = e.pageX - (boxBtn.left + window.pageXOffset) - d / 2;
      const y = e.pageY - (boxBtn.top + window.pageYOffset) - d / 2;

      inkEle.style.left = `${x}px`;
      inkEle.style.top = `${y}px`;
      inkEle.classList.add("animate"); // add animate
    }
  };

  return (
    <Button {...rest} ref={btn} onMouseDown={rippleEffect}>
      {children}
      <Ink ref={ink} />
    </Button>
  );
};

const IZButton = props => {
  if (props.isRipple) return <ButtonRipple {...props} />;
  return <Button {...props}>{props.children}</Button>;
};

export default IZButton;
