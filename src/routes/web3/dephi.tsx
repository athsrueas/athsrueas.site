import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/web3/dephi")({
  beforeLoad: () => {
    throw redirect({ to: "/projects/dephi" });
  },
});
