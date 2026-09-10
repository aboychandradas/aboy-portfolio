import test from "node:test";
import assert from "node:assert/strict";

import { projects } from "../src/data/projects.ts";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const VALID_STATUSES = new Set(["proof", "roadmap"]);

/** Walk every string reachable in a record, yielding [fieldPath, value]. */
function* strings(value, path) {
  if (typeof value === "string") {
    yield [path, value];
  } else if (Array.isArray(value)) {
    for (const [index, item] of value.entries()) yield* strings(item, `${path}[${index}]`);
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) yield* strings(item, `${path}.${key}`);
  }
}

test("project slugs are unique and URL-safe", () => {
  const seen = new Set();
  for (const { slug } of projects) {
    assert.match(slug, SLUG_PATTERN, `slug "${slug}" is not URL-safe (expected lowercase kebab-case)`);
    assert.ok(!seen.has(slug), `duplicate project slug: "${slug}"`);
    seen.add(slug);
  }
});

test("every project claims only what its links and notes support", () => {
  for (const project of projects) {
    const at = project.slug;
    assert.ok(
      VALID_STATUSES.has(project.status),
      `${at}: invalid status "${project.status}" (expected "proof" or "roadmap")`,
    );
    if (project.status === "proof") {
      assert.ok(project.liveUrl, `${at}: proof project missing liveUrl - a proof project must link its deployed build`);
      assert.ok(project.githubUrl, `${at}: proof project missing githubUrl - a proof project must link its source`);
    }
    if (project.statusLabel.includes("Deployed")) {
      assert.ok(project.liveUrl, `${at}: statusLabel claims "Deployed" but liveUrl is null`);
    }
    assert.ok(project.techStack.length > 0, `${at}: techStack is empty - every project must name its stack`);
    if (project.metrics.length > 0) {
      assert.ok(
        project.metricsNote.trim().length > 0,
        `${at}: metrics present without metricsNote - figures must state what they measure`,
      );
    }
  }
});

test("no TODO marker reaches published project data", () => {
  for (const project of projects) {
    for (const [field, value] of strings(project, project.slug)) {
      assert.ok(!value.includes("TODO"), `TODO found in project data at ${field}`);
    }
  }
});

// Enable this in P2-003, which re-ranks featured work so the proof build leads.
// Featured order today intentionally still leads with roadmap projects; enforcing
// the assertion here would mean reordering production data outside P1-002's scope.
test("featured proof projects sort ahead of roadmap ones", { skip: "awaits P2-003 featured re-ranking" }, () => {
  const featured = projects.filter((project) => project.featured);
  const firstRoadmap = featured.findIndex((project) => project.status === "roadmap");
  const lastProof = featured.findLastIndex((project) => project.status === "proof");
  assert.ok(
    firstRoadmap === -1 || lastProof === -1 || lastProof < firstRoadmap,
    `featured order puts roadmap project "${featured[firstRoadmap]?.slug}" ahead of proof project "${featured[lastProof]?.slug}"`,
  );
});
