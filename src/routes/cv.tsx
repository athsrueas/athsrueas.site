import { createFileRoute } from "@tanstack/react-router";
import { links } from "@/content/site";

export const Route = createFileRoute("/cv")({
  component: CvPage,
  head: () => ({
    meta: [
      { title: "CV · Thomas C Freestone" },
      {
        name: "description",
        content:
          "CV of Thomas C Freestone: IT project manager, mathematics teacher, Graph Advocate.",
      },
    ],
  }),
});

const jobs = [
  {
    org: "Performance Services",
    role: "IT Project Manager",
    dates: "2024–Present",
    points: [
      "Lead Strategic IT Initiatives: Spearhead critical IT projects that align with organizational goals, ensuring seamless integration and optimal performance.",
      "Stakeholder Collaboration: Engage with key stakeholders, including senior management and cross-functional teams, to drive project success and foster a collaborative environment.",
      "Risk Management: Identify potential risks and develop mitigation strategies to ensure project timelines and budgets are adhered to, minimizing disruptions.",
      "Resource Allocation: Efficiently allocate resources, including personnel and technology, to maximize productivity and achieve project milestones.",
      "Quality Assurance: Implement rigorous quality assurance processes to ensure deliverables meet the highest standards and exceed client expectations.",
      "Continuous Improvement: Promote a culture of continuous improvement by analyzing project outcomes and implementing best practices for future initiatives.",
      "E-Learning Content Manager: Oversee the development, organization, and maintenance of high-quality e-learning materials within the ODOO platform, ensuring they meet educational standards and enhance learner engagement.",
    ],
  },
  {
    org: "Independent",
    role: "Graph Advocate",
    dates: "2022–2024",
    points: [
      "Produce content covering technical cryptographic and data science topics.",
      "Understand and make information accessible to a less technical audience.",
      "Community building for The Graph Advocates DAO and The Graph Foundation.",
      "Participate in the network and provide technical support for less knowledgeable users.",
      "Plan and deliver educational content on our online platforms.",
      "Thought leader for protocol changes and improvements.",
    ],
  },
  {
    org: "Christel House Academy",
    role: "Mathematics Teacher, 7th and 8th grade, Christel House Academy South",
    dates: "2020–2024",
    points: [
      "Active social-emotional learning and life skills advisor for a cohort of students.",
      "Develop material and lessons aligned with or derived from Indiana State Academic standards.",
      "Track student learning growth indicators through assessment and direct intervention strategies when necessary.",
      "Engage in restorative, relationship-based disciplinary practices and building school community culture.",
      "Exceptional and frequent professional development leading to growth in all aspects of the practice.",
      "Leadership in mentoring new math staff.",
    ],
  },
  {
    org: "Christel House Academy",
    role: "IndyTeach Apprentice Teacher in upper secondary mathematics at Watanabe High School",
    dates: "2019–2020",
    points: [
      "Collaborate with a variety of Christel House professionals to earn a Secondary Teaching License.",
      "Teaching Geometry, Precalculus, and Advisory — social-emotional and career preparation — classes.",
      "Hands-on experience in data collection and processing, collaboration with other educators, managing classrooms, research, content development, implementation, and assessment.",
      "Leadership roles in taking over classes from a mentor teacher to gain more hands-on experience.",
    ],
  },
  {
    org: "Christel House Academy",
    role: "Math Interventionist for Watanabe High School, RTI framework, Lower House 9th and 10th grade mathematics",
    dates: "2018–2019",
    points: [
      "Worked with the Math department, the Principal, and other administrators to develop and track intervention strategies primarily for the 9th and 10th grade classes.",
      "Assisted in accommodating IEPs and ESL needs.",
      "Offered after-school tutoring for the high school as a whole in all offered levels of mathematics.",
      "Leadership roles in enrichment activities for students including clubs and field experiences.",
    ],
  },
  {
    org: "IUPUI Mathematics Department",
    role: "Math Tutor at the Math Assistance Center, serving students of IUPUI and Ivy Tech",
    dates: "2014–2018",
    points: [
      "Early algebra to advanced courses such as Differential Equations, Multidimensional Math, and Linear Algebra.",
      "Working one-on-one and in groups with students and faculty.",
    ],
  },
];

function CvPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-sm tracking-[0.18em] uppercase text-muted">Curriculum Vitae</p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">Thomas C Freestone</h1>
      <p className="mt-4">
        <a href={links.linkedin} className="underline decoration-rule">
          LinkedIn
        </a>
      </p>

      <section className="mt-12">
        <h2 className="border-b border-rule pb-2 font-display text-sm tracking-[0.16em] uppercase">
          Summary
        </h2>
        <p className="mt-5 leading-7">
          Applied Mathematics graduate from Indiana University Purdue University Indianapolis,
          licensed teacher in Indiana, USA. Working in a leading charter school reaching the
          underserved minority population of Indianapolis. Known as a strong collaborator and
          reflective life-long learner. Graph Advocate.
        </p>
        <p className="mt-4 text-sm text-muted">
          The summary still describes classroom work; current employment is listed first below.
          Source wording is preserved for review.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="border-b border-rule pb-2 font-display text-sm tracking-[0.16em] uppercase">
          Professional experience
        </h2>
        <ol className="mt-8 space-y-12">
          {jobs.map((job) => (
            <li key={`${job.org}-${job.dates}`}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-display text-xl">{job.org}</h3>
                <p className="text-sm text-muted">{job.dates}</p>
              </div>
              <p className="mt-1 text-ink-soft">{job.role}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[1.02rem] leading-7">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="border-b border-rule pb-2 font-display text-sm tracking-[0.16em] uppercase">
          Education
        </h2>
        <div className="mt-8 space-y-8">
          <div>
            <h3 className="font-display text-xl">IUPUI (Purdue University)</h3>
            <p className="mt-1 text-ink-soft">B.S. in Applied Math, minor in Physics · Graduated May 2018</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 leading-7">
              <li>Undergraduate research in medical applications of mathematics</li>
              <li>Extensive studies in Chemistry (20 hrs) and Biology (10 hrs)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xl">Danville Community High School</h3>
            <p className="mt-1 text-ink-soft">Class of 2013</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 leading-7">
              <li>Honors Core 40 Diploma</li>
              <li>1 year studying abroad at the American School of Barcelona</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="border-b border-rule pb-2 font-display text-sm tracking-[0.16em] uppercase">
          Affiliations and awards
        </h2>
        <ul className="mt-8 space-y-6">
          <li>
            <h3 className="font-display text-xl">Performance Based Bonus, Christel House Supervisor</h3>
            <p className="mt-1 text-sm text-muted">2019–2023</p>
            <p className="mt-2 leading-7">Based on going above and beyond, taking on extra responsibilities.</p>
          </li>
          <li>
            <h3 className="font-display text-xl">IUPUI Startup Elevator Pitch Award</h3>
            <p className="mt-2 leading-7">
              Cash award by audience vote for investment in our project Aggrobyte. Aggrobyte sought
              to develop an alternative to herbicide for farming using AI-assisted robots that would
              remove weeds from cornfields.
            </p>
          </li>
        </ul>
      </section>
    </main>
  );
}
