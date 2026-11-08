export type Country = {
  name: string;
  nativeName?: string;
  capital?: string;
  currencies?: { code: string; name: string; symbol?: string }[];
  languages?: { name: string; nativeName?: string }[];
  population?: number;
  area?: number;
  populationDensity?: number;
  region?: string;
  subregion?: string;
  timezones?: string[];
  callingCodes?: string[];
  topLevelDomain?: string[];
  borders?: string[];
  demonym?: string;
  alpha2Code: string;
  alpha3Code: string;
  numericCode?: string;
  flags?: { png?: string; svg?: string };
  latlng?: number[];
};

export type ApiCall = {
  request: {
    method: string;
    url: string;
    headers: Record<string, string>;
    body: string | null;
  };
  response: {
    status: number;
    statusText: string;
    timeMs: number;
    headers: Record<string, string>;
    body: unknown;
  };
};
