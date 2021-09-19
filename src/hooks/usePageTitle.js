import { useEffect } from "react";

function usePageTitle(title) {
  useEffect(() => {
    document.title = `${title ? title + " | " : ""}My app`;
  }, [title]);
}

export default usePageTitle;
