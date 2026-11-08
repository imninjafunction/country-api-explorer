"use client";

import { useMemo, useRef, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import type { Feature, Geometry } from "geojson";
import { loadAtlas } from "@/lib/atlas";

type Props = {
  selectedId: string | null;
  selectedName?: string | null;
  onSelect: (id: string, name: string) => void;
};

type CountryFeature = Feature<Geometry, { name: string }>;

const W = 960;
const H = 500;

export default function WorldMap({ selectedId, selectedName, onSelect }: Props) {
  const [hover, setHover] = useState<string | null>(null);
  const [zoom, setZoom] = useState({ k: 1, x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; moved: boolean } | null>(null);

  const paths = useMemo(() => {
    const fc = loadAtlas();
    const path = geoPath(geoNaturalEarth1().fitSize([W, H], fc));
    return (fc.features as CountryFeature[]).map((f) => ({
      id: f.id !== undefined ? String(f.id) : null,
      name: f.properties.name,
      d: path(f) ?? "",
    }));
  }, []);

  const zoomBy = (f: number) =>
    setZoom((z) => {
      const k = Math.min(8, Math.max(1, z.k * f));
      const r = k / z.k;
      return { k, x: W / 2 - (W / 2 - z.x) * r, y: H / 2 - (H / 2 - z.y) * r };
    });

  return (
    <div className="relative h-full overflow-hidden rounded-xl border border-black/10 bg-sky-50 dark:border-white/10 dark:bg-slate-900">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        className="block h-full w-full touch-none select-none"
        role="img"
        aria-label="World map. Click a country to load its data."
        onPointerDown={(e) => {
          drag.current = { x: e.clientX, y: e.clientY, moved: false };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d || zoom.k === 1) return;
          const dx = e.clientX - d.x;
          const dy = e.clientY - d.y;
          if (Math.abs(dx) + Math.abs(dy) > 3) d.moved = true;
          const box = e.currentTarget.getBoundingClientRect();
          const scale = Math.max(W / box.width, H / box.height);
          d.x = e.clientX;
          d.y = e.clientY;
          setZoom((z) => ({ ...z, x: z.x + dx * scale, y: z.y + dy * scale }));
        }}
        onPointerUp={() => setTimeout(() => (drag.current = null), 0)}
        onPointerLeave={() => (drag.current = null)}
      >
        <g transform={`translate(${zoom.x} ${zoom.y}) scale(${zoom.k})`}>
          {paths.map((p, i) => {
            const active = p.id !== null && p.id === selectedId;
            const hovered = hover === p.name;
            return (
              <path
                key={p.id ?? `${p.name}-${i}`}
                d={p.d}
                vectorEffect="non-scaling-stroke"
                strokeWidth={0.6}
                className={`cursor-pointer stroke-white transition-colors dark:stroke-slate-900 ${
                  active
                    ? "fill-blue-600"
                    : hovered
                      ? "fill-blue-400"
                      : "fill-slate-300 dark:fill-slate-600"
                }`}
                onMouseEnter={() => setHover(p.name)}
                onMouseLeave={() => setHover(null)}
                onClick={() => {
                  if (drag.current?.moved) return;
                  onSelect(p.id ?? p.name, p.name);
                }}
              >
                <title>{p.name}</title>
              </path>
            );
          })}
        </g>
      </svg>

      <div className="absolute left-3 top-3 rounded-md bg-white/90 px-2.5 py-1 text-xs font-medium dark:bg-black/60">
        {hover ?? (selectedName ? `Selected: ${selectedName}` : "Hover over a country")}
      </div>
      <div className="absolute right-3 top-3 flex flex-col overflow-hidden rounded-md border border-black/10 bg-white text-sm dark:border-white/10 dark:bg-slate-800">
        <button
          aria-label="Zoom in"
          className="px-2.5 py-1 hover:bg-black/5 dark:hover:bg-white/10"
          onClick={() => zoomBy(1.5)}
        >
          +
        </button>
        <button
          aria-label="Zoom out"
          className="border-t border-black/10 px-2.5 py-1 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
          onClick={() => zoomBy(1 / 1.5)}
        >
          −
        </button>
        <button
          aria-label="Reset zoom"
          className="border-t border-black/10 px-2.5 py-1 text-xs hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
          onClick={() => setZoom({ k: 1, x: 0, y: 0 })}
        >
          ⟲
        </button>
      </div>
    </div>
  );
}
