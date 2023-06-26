"use client"
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";

export const Portal = ({ selector, children }) => {
  const refParent = useRef(null);
  const refChild = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    refChild.current = document.createElement("div");
    const parent = document.querySelector(selector);

    if (parent) {
      refParent.current = parent;
      setMounted(true);
      refParent.current.append(refChild.current);
      return () =>  refChild.current?.remove();
    }
  }, []);

  return mounted ? createPortal(children, refChild.current) : null;
};
