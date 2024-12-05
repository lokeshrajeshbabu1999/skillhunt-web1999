// src/hooks/useFilteredGuides.js
import { useEffect, useState } from "react";

const useFilteredGuides = (guides, selectedLevel) => {
  const [filteredGuides, setFilteredGuides] = useState(guides);

  useEffect(() => {
    let activeGuides = guides.filter((guide) => guide.active === true);
    if (selectedLevel) {
      activeGuides = activeGuides.filter(
        (guide) => guide.level === selectedLevel
      );
    }
    setFilteredGuides(activeGuides);
  }, [selectedLevel, guides]);

  return filteredGuides;
};

export default useFilteredGuides;
