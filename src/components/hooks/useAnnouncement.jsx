import { useEffect, useState } from "react";
import { ANNOUNCEMENT_UPDATE_DELAY } from "../../config";

export const useAnnouncement = (initialMessage) => {
  const [announcement, setAnnouncement] = useState(initialMessage);
  const [message, setMessage] = useState("");

  const updateAnnouncement = (message) => {
    setMessage(message);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnnouncement(message);
    }, ANNOUNCEMENT_UPDATE_DELAY);

    return () => clearTimeout(timer);
  }, [message]);

  return { announcement, updateAnnouncement };
};
