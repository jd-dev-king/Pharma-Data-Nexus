export const EES_DATA_MOON = {
  apiBaseUrl:
    window.EES_DATA_MOON_API ||
    localStorage.getItem("eesDataMoonApi") ||
    "http://127.0.0.1:8000",
  preferredSchema:
    window.EES_PHARMA_SCHEMA ||
    localStorage.getItem("eesPharmaSchema") ||
    "pharma_cgmp",
  fallbackSchemas: ["pharma_cgmp", "pharma_enterprise", "pharma"]
};
