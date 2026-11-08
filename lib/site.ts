export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const SITE_NAME = "Country API Explorer";
export const SITE_TITLE = "Country API Explorer: country info and live API calls";
export const SITE_DESCRIPTION =
  "Click any country on an interactive world map to see its capital, currency, languages, population and more, and watch the live API request and response behind every click. Free, no sign-up.";

export const MAKER = {
  name: "NinjaFunction",
  url: "https://ninjafunction.com",
  tagline: "Free online developer tools and utilities. 82 tools, no sign-up, works on any device.",
};
