import { useState } from "react";

export default function useOnline() {
  const [isOnline, setIsOnline] = useState(true);

  window.addEventListener("offline", function () {
    setIsOnline(false);
  });
  window.addEventListener("online", function () {
    setIsOnline(true);
  });
  return isOnline;
}
