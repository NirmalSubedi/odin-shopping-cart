import { useEffect, useState } from "react";

export const useAnnouncement = (initialMessage) => {
  const [announcement, setAnnouncement] = useState(initialMessage);
  const [message, setMessage] = useState("");

  const updateAnnouncement = (message) => {
    setMessage(message);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnnouncement(message);
    }, 200);

    return () => clearTimeout(timer);
  }, [message]);

  return { announcement, updateAnnouncement };
};
