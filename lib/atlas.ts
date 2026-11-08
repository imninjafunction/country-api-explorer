import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import type { FeatureCollection, Geometry } from "geojson";
import atlas from "world-atlas/countries-110m.json";

export type AtlasFeatures = FeatureCollection<Geometry, { name: string }>;

export function loadAtlas(): AtlasFeatures {
  const topo = atlas as unknown as Topology;
  return feature(topo, topo.objects.countries) as unknown as AtlasFeatures;
}

// Countries that can be looked up by name (the map's numeric id is the API key).
export const COUNTRY_NAMES: { id: string; name: string }[] = loadAtlas()
  .features.filter((f) => f.id !== undefined)
  .map((f) => ({ id: String(f.id), name: f.properties.name }))
  .sort((a, b) => a.name.localeCompare(b.name));
