
let inflightRefresh: Promise<string | null> | null = null;

export const getInflightRefresh = () => inflightRefresh;
export const setInflightRefresh = (p: Promise<string | null> | null) => {
  inflightRefresh = p;
};
