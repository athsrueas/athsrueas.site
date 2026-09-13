import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects/dephi")({
  component: DephiPage,
  head: () => ({
    meta: [
      { title: "deφ · ATHSRUEAS" },
      {
        name: "description",
        content:
          "deφ (Dephi) is a decentralized application for transparency and accountability in the nonprofit sector.",
      },
    ],
  }),
});

function DephiPage() {
  return (
    <main className="mx-auto max-w-[42rem] px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-sm tracking-[0.16em] uppercase text-muted">Project</p>
      <h1 className="mt-3 font-display text-5xl">deφ</h1>
      <p className="mt-8 text-[1.0625rem] leading-8">
        Dephi is a decentralized application (DApp) designed to bring transparency and
        accountability to the nonprofit sector. Built on the Ethereum blockchain and powered by
        Arbitrum One, dephi collects public accountability data to provide verifiable financial
        reports. Donors can easily evaluate how charities manage their funds and ensure that their
        contributions are being used effectively.
      </p>
      <p className="mt-6 text-[1.0625rem] leading-8">
        By leveraging blockchain technology, dephi eliminates intermediaries and provides an
        immutable record of each charity's financial performance, empowering organizations to
        demonstrate their commitment to financial honesty. I plan to implement a bounty system,
        incentivising charities and citizens to upload financial records to improve the quality of
        the reports available. The hope is that users will want to support the improvement of the
        reports in order to be more confident in their charitable giving. The finances of dephi
        itself will be entirely on chain as an example to other not-for-profit organizations.
      </p>
    </main>
  );
}
