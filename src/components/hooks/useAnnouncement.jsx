import { useState } from "react";

export const useAnnouncement = (initialMessage) => {
  const [announcement, setAnnouncement] = useState(initialMessage);
  return { announcement, updateAnnouncement: setAnnouncement };
};
