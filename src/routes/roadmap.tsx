import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/roadmap")({
  beforeLoad: () => {
    // public roadmap re-routes to in-app roadmap
  },
  component: () => (
    <div className="min-h-screen grid place-items-center">
      <Link to="/app/roadmap" className="text-gold underline">Go to roadmap →</Link>
    </div>
  ),
});
