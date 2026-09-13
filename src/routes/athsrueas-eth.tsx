import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/athsrueas-eth")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
