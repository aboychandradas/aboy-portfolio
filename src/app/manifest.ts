import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// Served at /manifest.webmanifest and auto-linked by Next.js.
// Icon files are placeholders until real assets are added to /public —
// see the icon spec in the project notes (near-black rounded square,
// white dashboard card shapes, deep indigo accent, small chart mark).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Business Web Apps`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0e0e15",
    theme_color: "#0e0e15",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
