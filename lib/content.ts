export const STEPS = [
  {
    title: "Click a country",
    body: "Pick any country on the interactive world map, or search for it by name.",
  },
  {
    title: "Watch the API call",
    body: "See the request headers, the payload and the live response with its HTTP status and timing.",
  },
  {
    title: "Read the details",
    body: "Capital, currency, languages, population, area, timezones, borders and more appear instantly.",
  },
];

export const FAQ = [
  {
    q: "What does Country API Explorer do?",
    a: "It shows an interactive world map. When you click a country, the app calls a public countries API and shows the country's capital, currency, languages, population, area, region, timezones, calling code and neighbouring countries, next to the raw API request and response.",
  },
  {
    q: "Which API provides the country data?",
    a: "Country data comes from the free countries.dev REST API, which needs no API key. Map shapes come from the open-source world-atlas dataset based on Natural Earth.",
  },
  {
    q: "Is Country API Explorer free to use?",
    a: "Yes. It's free, needs no account and sends no personal data. The only request made on a click is a public data lookup for the country you chose.",
  },
  {
    q: "What can I learn from the API windows?",
    a: "The three windows show how a REST call works: the request method, URL and headers, the payload or body (empty for GET requests), and the response with its HTTP status code, timing and JSON data.",
  },
  {
    q: "Does it work on phones and tablets?",
    a: "Yes. On large screens the API windows sit on the left and the map and details on the right. On phones and tablets everything stacks in one column, and there are light and dark themes.",
  },
];
