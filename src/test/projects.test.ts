import { describe, it, expect } from "vitest";
import { projects, getAdjacentProjects, sortedProjects } from "@/data/projects";

describe("projects data", () => {
  it("has unique slugs", () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
  });
  it("has at least five featured projects", () => {
    expect(projects.filter((p) => p.featured).length).toBeGreaterThanOrEqual(5);
  });
  it("first project has no previous, last has no next", () => {
    expect(getAdjacentProjects(sortedProjects[0].slug).prev).toBeUndefined();
    expect(getAdjacentProjects(sortedProjects[sortedProjects.length - 1].slug).next).toBeUndefined();
  });
});
