import React from "react";
import useOnline from "../../hooks/useOnline";

export default function Online({ children }) {
  const isOnline = useOnline();
  if (isOnline) {
    return children;
  }
}
