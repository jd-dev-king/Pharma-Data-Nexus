const PRODUCTION_DATA_MOON_API =
  "https://ees-universal-data-moon-api-production.up.railway.app";

const isLocalDevelopment =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

export const EES_DATA_MOON = {
  apiBaseUrl:
    window.EES_DATA_MOON_API ||
    (isLocalDevelopment
      ? localStorage.getItem("eesDataMoonApi")
      : null) ||
    PRODUCTION_DATA_MOON_API,

  preferredSchema:
    window.EES_PHARMA_SCHEMA ||
    (isLocalDevelopment
      ? localStorage.getItem("eesPharmaSchema")
      : null) ||
    "pharma",

  fallbackSchemas: [
    "pharma",
    "pharma_cgmp",
    "pharma_enterprise"
  ]
};