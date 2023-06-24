"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";

export const Portal = ({ children }) => {
  const ref = useRef<HTMLElement|null>(null);
  const [mounted, setMounted] = useState(false);

  const wrapper = document.createElement("div");
  const body = document.querySelector("body");

  useEffect(() => {
    if (body) {
      ref.current = body;
      setMounted(true);
      ref.current.append(wrapper);
      return () => wrapper?.remove();
    }
  }, [wrapper, body]);

  return mounted ? createPortal(children, wrapper) : null;
};
