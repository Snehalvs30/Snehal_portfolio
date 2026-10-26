// /* =====================================================================
//    ALL SITE CONTENT LIVES HERE.
//    Edit this file to update your portfolio. You never need to touch the
//    components to change text, links, projects, or skills.

//    Search for "TODO" to find every placeholder you still need to fill in.
//    ===================================================================== */

// // ---------- Types (describe the shape of the data below) ----------

// export type Metric = {
//   from: number; // the number the count starts at
//   to: number; // the number it ends on
//   decimals?: number;
//   prefix?: string;
//   suffix?: string;
//   label: string; // short line under the number
// };

// export type WhatIDoItem = {
//   description: string;
//   tags: string[];
//   metric: Metric;
// };

// export type TimelineEntry = {
//   kind: "work" | "education";
//   name: string; // company or university
//   role: string;
//   dates: string;
//   location: string;
//   yearLabel: string; // shown on the timeline line
//   points: string[]; // shown when the entry is opened
// };

// export type ExpertiseArea = {
//   name: string;
//   description: string;
//   tools: string[];
//   visual: "terminal" | "pipeline" | "cluster" | "browser" | "editor"; // the small live picture in the card
// };

// export type Project = {
//   title: string;
//   stack: string[];
//   description: string;
//   codeUrl: string; // GitHub repo URL, or "" until you have it
//   // Put a screenshot in public/projects/ and point to it here, e.g. "/projects/ai-document-qa.png".
//   // Files starting with "sample-" are placeholders and show a "Sample image" tag.
//   image: { src: string; alt: string };
// };

// // ---------- Basic info ----------

// export const site = {
//   name: "Snehal Shinde",
//   fullName: "Snehal Vishnu Shinde",
//   role: "Software engineer, full-stack and cloud/DevOps",
//   headerLabel: "Full-stack & Cloud/DevOps Engineer", // small text at top-left of the page
//   // Big text at the bottom-right of the hero. Set to null to hide it.
//   status: { label: "Graduating from Northeastern", value: "Dec '26" } as {
//     label: string;
//     value: string;
//   } | null,
//   location: "Boston, MA",
//   summary:
//     "I build full-stack applications and cloud/DevOps infrastructure with Java Spring Boot, Angular/TypeScript, Kubernetes, and AWS/GCP.",
//   // Your email is NOT written on the page. It is assembled only when a visitor clicks
//   // "Send me an email", which keeps it away from simple spam bots.
//   emailParts: { name: "snehalshinde3028", domain: "gmail.com" },
//   linkedin: "https://www.linkedin.com/in/snehal-s-578705172/",
//   medium: "https://shindesnehal277.medium.com/", 
//   github: "https://github.com/Snehalvs30", // TODO: add your GitHub profile URL, e.g. "https://github.com/your-username"
//   resume: "https://drive.google.com/file/d/1P5hBZJUE_q-vd9UdO8ByRMnMHe0GjJry/view?usp=sharing", 
//   siteUrl: "https://snehal-portfolio.vercel.app", // TODO: replace with your real Vercel URL after deploying
//   // Note: your phone number is intentionally NOT included anywhere on the site.
// };

// // ---------- Hero ----------

// export const hero = {
//   availability: "Available for work — Dec 2026",
//   greeting: "Hi, I'm",
//   // The word after "I'm a" at the bottom of the hero cycles through these.
//   roles: [
//     "Full-stack developer",
//     "Cloud engineer",
//     "Backend engineer",
//     "Web developer",
//     "Software designer",
//   ],
//   // The quote at the bottom right: the first line stays, the second line types out each phrase.
//   quote: {
//     fixed: "I build with intention.",
//     phrases: [
//       "Reliable systems.",
//       "Thoughtful applications.",
//       "Scalable cloud infrastructure.",
//       "Backend built to last.",
//       "Results that speak for themselves.",
//     ],
//   },
// };

// // ---------- What I do (section 2) ----------

// export const whatIDo = {
//   label: "What I do",
//   // Words in [brackets] turn bold black one by one as you scroll. They match the items below, in order.
//   statement: "I [build] software, [ship] it fast and keep it [running].",
//   items: [
//     {
//       description:
//         "Java Spring Boot microservices behind Angular and React/TypeScript frontends, connected through clean REST APIs.",
//       tags: ["Spring Boot", "Angular", "REST APIs"],
//       metric: { from: 0, to: 40, suffix: "%", label: "lower API latency on a core banking platform" },
//     },
//     {
//       description:
//         "Pipelines with Jenkins and GitHub Actions, Docker containers and Terraform infrastructure, deployed to Kubernetes on AWS and GCP.",
//       tags: ["CI/CD", "Kubernetes", "Terraform"],
//       metric: { from: 45, to: 6, suffix: " min", label: "per release, down from 45 minutes" },
//     },
//     {
//       description:
//         "Monitoring with Prometheus and Grafana, security gates with Trivy, SonarQube and OPA, and fast root-cause analysis in production.",
//       tags: ["Observability", "DevSecOps", "SLAs"],
//       metric: { from: 90, to: 99.9, decimals: 1, suffix: "%", label: "uptime across 2M+ daily transactions" },
//     },
//   ] as WhatIDoItem[],
// };

// // ---------- About (not shown on the page right now; add <About /> back in app/page.tsx to use it) ----------

// export const about = {
//   title: "About",
//   paragraphs: [
//     "I'm a software engineer with 4+ years of experience across full-stack development and cloud/DevOps infrastructure, working mainly with Java Spring Boot, Angular/TypeScript, Kubernetes, and AWS/GCP.",
//     "At Tata Consultancy Services I designed and operated Java/Spring Boot microservices on GKE for a core banking platform, sustaining 99.9% uptime across 2M+ daily transactions, and built the Jenkins and Docker CI/CD pipelines that cut its release cycle from 45 minutes to under 6.",
//     "I'm now completing a Master of Science in Information Systems at Northeastern University in Boston. Most recently I was a software developer intern at Superstars Inc, building Angular/TypeScript components for video streaming.",
//     // TODO (optional): add a sentence about what kind of role you're looking for.
//   ],
//   facts: [
//     { label: "Based in", value: "Boston, MA" },
//     { label: "Experience", value: "4+ years" },
//     { label: "Studying", value: "MS Information Systems, Northeastern University (Dec 2026)" },
//     { label: "Certified", value: "Google Cloud ACE, Microsoft Azure AZ-104 and AZ-900" },
//   ],
// };

// // ---------- Experience & education timeline (newest first) ----------

// export const timeline = {
//   label: "Experience & education",
//   entries: [
//     {
//       kind: "work",
//       name: "Superstars Inc",
//       role: "Software Developer Intern",
//       dates: "Jan 2026 – May 2026",
//       location: "Boston, MA",
//       yearLabel: "2026",
//       points: [
//         "Built 25+ reusable Angular/TypeScript components and a predictive video preloading feature.",
//         "Integrated 10+ REST API endpoints with RxJS, including request caching and error handling.",
//         "Sped up the frontend with route-level lazy loading and progressive image rendering.",
//       ],
//     },
//     {
//       kind: "education",
//       name: "Northeastern University",
//       role: "MS in Information Systems",
//       dates: "Sep 2024 – Dec 2026",
//       location: "Boston, MA",
//       yearLabel: "2024 – 2026",
//       points: [
//         "Master of Science in Information Systems, College of Engineering.",
//         "Coursework: Programming Structures & Algorithms, Database Design, Application Engineering, and Generative AI.",
//       ],
//     },
//     {
//       kind: "work",
//       name: "Tata Consultancy Services",
//       role: "Systems Engineer",
//       dates: "Apr 2021 – Jul 2024",
//       location: "Mumbai, India",
//       yearLabel: "2021 – 2024",
//       points: [
//         "Built CI/CD pipelines with Jenkins and Docker on GCP for zero-downtime deployments.",
//         "Designed and ran 10+ Spring Boot microservices on GKE for a core banking platform.",
//         "Tuned PostgreSQL/Oracle queries and indexes, and resolved production incidents within SLA.",
//         "Automated a manual encryption/decryption process in Java/Spring Boot.",
//       ],
//     },
//     {
//       kind: "work",
//       name: "LinuxWorld Informatics",
//       role: "Associate Cloud Intern",
//       dates: "May 2020 – Aug 2020",
//       location: "Remote",
//       yearLabel: "2020",
//       points: [
//         "Turned manual AWS provisioning (EC2, VPC, S3, IAM) into reusable Terraform modules.",
//         "Automated configuration and deployments with Ansible playbooks.",
//         "Set up Kubernetes for 15+ containerized apps, with Jenkins and GitHub Actions pipelines that roll back on failure.",
//       ],
//     },
//         {
//       kind: "education",
//       name: "University of Mumbai",
//       role: "Bachelor of Engineering",
//       dates: "Aug 2016 – Sep 2020",
//       location: "Mumbai, India",
//       yearLabel: "2016 – 2020",
//       points: [
//         "Bachelor of Engineering, University of Mumbai.",
//         // TODO (optional): add your branch or a highlight, e.g. a project or achievement.
//       ],
//     },
//   ] as TimelineEntry[],
// };

// // ---------- Expertise ----------

// export const expertise = {
//   label: "Expertise",
//   headline: ["Where I do", "my best work"],
//   intro: "Backend first, with the cloud and delivery skills to take it all the way to production.",
//   // The first area gets the tall card on the left.
//   areas: [
//     {
//       name: "Backend",
//       description: "APIs and services that hold up under real traffic: Java/Spring Boot microservices, event streaming and tuned databases.",
//       tools: ["Java", "Spring Boot", "Node.js", "Kafka", "PostgreSQL", "Redis"],
//       visual: "terminal",
//     },
//     {
//       name: "DevOps",
//       description: "Automated delivery: CI/CD pipelines, containers and infrastructure as code.",
//       tools: ["Docker", "Jenkins", "Terraform", "ArgoCD"],
//       visual: "pipeline",
//     },
//     {
//       name: "Cloud",
//       description: "Workloads on AWS and GCP, run on Kubernetes.",
//       tools: ["AWS", "GCP", "EKS", "GKE", "Lambda"],
//       visual: "cluster",
//     },
//     {
//       name: "Full-stack",
//       description: "End-to-end features, from the interface down to the service and database.",
//       tools: ["Angular", "React", "TypeScript", "FastAPI"],
//       visual: "browser",
//     },
//     {
//       name: "Web development",
//       description: "Fast, reusable interfaces built from clean components.",
//       tools: ["Angular", "TypeScript", "HTML", "CSS", "RxJS"],
//       visual: "editor",
//     },
//   ] as ExpertiseArea[],
//   certifications: [
//     "Google Cloud Associate Cloud Engineer",
//     "Microsoft Azure AZ-104",
//     "Azure AZ-900",
//   ],
// };

// // ---------- Projects ----------

// export const projects = {
//   label: "Selected projects",
//   items: [
//     {
//       title: "AI Document Q&A",
//       stack: ["React", "Spring Boot", "FastAPI", "pgvector", "AWS ECS"],
//       description:
//         "A full-stack RAG platform with a React/TypeScript interface and a Java Spring Boot and FastAPI backend. Embeddings live in PostgreSQL with pgvector, deployed to AWS ECS through GitHub Actions.",
//       codeUrl: "", // TODO: GitHub repo URL
//       image: { src: "/projects/sample-ai-document-qa.svg", alt: "Sample illustration of a document chat app" },
//     },
//     {
//       title: "DevSecOps Pipeline",
//       stack: ["GitHub Actions", "Trivy", "SonarQube", "OPA", "Kubernetes"],
//       description:
//         "A GitHub Actions pipeline with Trivy, SonarQube and Snyk as required gates, and OPA Gatekeeper policies that block Kubernetes deployments failing security baselines.",
//       codeUrl: "", // TODO: GitHub repo URL
//       image: { src: "/projects/sample-devsecops-pipeline.svg", alt: "Sample illustration of a pipeline with passing checks" },
//     },
//     {
//       title: "Event-Driven Platform",
//       stack: ["Angular", "Spring Boot", "Kafka", "AWS EKS", "Grafana"],
//       description:
//         "An Angular dashboard backed by three Kafka-connected Spring Boot microservices on AWS EKS, with consumer lag and throughput tracked in Prometheus and Grafana.",
//       codeUrl: "", // TODO: GitHub repo URL
//       image: { src: "/projects/sample-event-driven-platform.svg", alt: "Sample illustration of a monitoring dashboard" },
//     },
//     {
//       title: "This Portfolio",
//       stack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion", "Lenis"],
//       description:
//         "This website: a Next.js App Router site with scroll-driven animations, deployed on Vercel.",
//       codeUrl: "", // TODO: GitHub repo URL for this portfolio
//       image: { src: "/projects/sample-portfolio.svg", alt: "Sample illustration of this portfolio's hero" },
//     },
//   ] as Project[],
// };

// // ---------- "This is me." (shown just before Contact) ----------

// export const intro = {
//   zoomText: "THIS IS ME", // the full stop is added automatically; you fly through it
//   photo: { src: "/about/snehal.jpg", alt: "Snehal Shinde standing against a sunlit wall, her shadow beside her" },
//   caption: "SNEHAL SHINDE · BOSTON, MA",
//   headline: ["Curious by default,", "careful by habit."],
//   // lead: "I'm a software engineer in Boston with 4+ years of building full-stack applications and the cloud infrastructure that runs them.",
//   // body: "At Tata Consultancy Services I designed and ran microservices for a core banking platform handling 2M+ daily transactions. Today I'm finishing my MS in Information Systems at Northeastern University.",
//   // personal: "", // TODO: a line in your own words, e.g. what you enjoy outside work. Leave "" to hide it.
//     lead: "I'm calm when things break, careful with the details, and always learning something new.",
//   body: "Over 4+ years of building full-stack applications and cloud infrastructure, I've learned to understand a problem fully before fixing it, to sweat the small things others miss, and to treat every new tool as something worth figuring out.",
//   facts: [
//     { label: "Based in", value: "Boston, MA" },
//     { label: "Studying", value: "Northeastern, Dec 2026" },
//     { label: "Certified", value: "GCP ACE · AZ-104" },
//   ],
// };

// // ---------- Contact ----------

// export const contact = {
//   label: "Get in touch",
//   headline: ["Have an idea?", "Let's build it."],
//   sub: "Hiring, building something, or stuck on a tricky problem? My inbox is open.",
//   location: "Boston, MA",
//   timeZone: "America/New_York", // used for the live local time
//   availability: "Available for work — Dec 2026",
// };
/* =====================================================================
   ALL SITE CONTENT LIVES HERE.
   Edit this file to update your portfolio. You never need to touch the
   components to change text, links, projects, or skills.

   Search for "TODO" to find every placeholder you still need to fill in.
   ===================================================================== */

// ---------- Types (describe the shape of the data below) ----------

export type Metric = {
  from: number; // the number the count starts at
  to: number; // the number it ends on
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string; // short line under the number
};

export type WhatIDoItem = {
  description: string;
  tags: string[];
  metric: Metric;
};

export type TimelineEntry = {
  kind: "work" | "education";
  name: string; // company or university
  role: string;
  dates: string;
  location: string;
  yearLabel: string; // shown on the timeline line
  points: string[]; // shown when the entry is opened
};

export type ExpertiseArea = {
  name: string;
  description: string;
  tools: string[];
  visual: "terminal" | "pipeline" | "cluster" | "browser" | "editor"; // the small live picture in the card
};

export type Project = {
  title: string;
  stack: string[];
  description: string;
  codeUrl: string; // GitHub repo URL, or "" until you have it
  // Put a screenshot in public/projects/ and point to it here, e.g. "/projects/ai-document-qa.png".
  // Files starting with "sample-" are placeholders and show a "Sample image" tag.
  image: { src: string; alt: string };
};

// ---------- Basic info ----------

export const site = {
  name: "Snehal Shinde",
  fullName: "Snehal Vishnu Shinde",
  role: "Software engineer, full-stack and cloud/DevOps",
  headerLabel: "Full-stack & Cloud/DevOps Engineer", // small text at top-left of the page
  // Big text at the bottom-right of the hero. Set to null to hide it.
  status: { label: "Graduating from Northeastern", value: "Dec '26" } as {
    label: string;
    value: string;
  } | null,
  location: "Boston, MA",
  summary:
    "I build full-stack applications and cloud/DevOps infrastructure with Java Spring Boot, Angular/TypeScript, Kubernetes, and AWS/GCP.",
  // Your email is NOT written on the page. It is assembled only when a visitor clicks
  // "Send me an email", which keeps it away from simple spam bots.
  emailParts: { name: "snehalshinde3028", domain: "gmail.com" },
  linkedin: "https://www.linkedin.com/in/snehal-s-578705172/",
  medium: "https://shindesnehal277.medium.com/", 
  github: "https://github.com/Snehalvs30", // TODO: add your GitHub profile URL, e.g. "https://github.com/your-username"
  resume: "https://drive.google.com/file/d/16c_L5TjwQksvaaHR1YWX6cPkrfPO451Q/view?usp=sharing", 
  siteUrl: "https://snehal-portfolio.vercel.app", // TODO: replace with your real Vercel URL after deploying
  // Note: your phone number is intentionally NOT included anywhere on the site.
};

// ---------- Hero ----------

export const hero = {
  availability: "Available for work — Dec 2026",
  greeting: "Hi, I'm",
  // The word after "I'm a" at the bottom of the hero cycles through these.
  roles: [
    "Full-stack developer",
    "Cloud engineer",
    "Backend engineer",
    "Web developer",
    "Software designer",
  ],
  // The quote at the bottom right: the first line stays, the second line types out each phrase.
  quote: {
    fixed: "I build with intention.",
    phrases: [
      "Reliable systems.",
      "Thoughtful applications.",
      "Scalable cloud infrastructure.",
      "Backend built to last.",
      "Results that speak for themselves.",
    ],
  },
};

// ---------- What I do (section 2) ----------

export const whatIDo = {
  label: "What I do",
  // Words in [brackets] turn bold black one by one as you scroll. They match the items below, in order.
  statement: "I [build] software, [ship] it fast and keep it [running].",
  items: [
    {
      description:
        "Java Spring Boot microservices behind Angular and React/TypeScript frontends, connected through clean REST APIs.",
      tags: ["Spring Boot", "Angular", "REST APIs"],
      metric: { from: 0, to: 40, suffix: "%", label: "lower API latency on a core banking platform" },
    },
    {
      description:
        "Pipelines with Jenkins and GitHub Actions, Docker containers and Terraform infrastructure, deployed to Kubernetes on AWS and GCP.",
      tags: ["CI/CD", "Kubernetes", "Terraform"],
      metric: { from: 45, to: 6, suffix: " min", label: "per release, down from 45 minutes" },
    },
    {
      description:
        "Monitoring with Prometheus and Grafana, security gates with Trivy, SonarQube and OPA, and fast root-cause analysis in production.",
      tags: ["Observability", "DevSecOps", "SLAs"],
      metric: { from: 90, to: 99.9, decimals: 1, suffix: "%", label: "uptime across 2M+ daily transactions" },
    },
  ] as WhatIDoItem[],
};

// ---------- About (not shown on the page right now; add <About /> back in app/page.tsx to use it) ----------

export const about = {
  title: "About",
  paragraphs: [
    "I'm a software engineer with 3+ years of experience across full-stack development and cloud/DevOps infrastructure, working mainly with Java Spring Boot, Angular/TypeScript, Kubernetes, and AWS/GCP.",
    "At Tata Consultancy Services I designed and operated Java/Spring Boot microservices on GKE for a core banking platform, sustaining 99.9% uptime across 2M+ daily transactions, and built the Jenkins and Docker CI/CD pipelines that cut its release cycle from 45 minutes to under 6.",
    "I'm now completing a Master of Science in Information Systems at Northeastern University in Boston. Most recently I was a software developer intern at Superstars Inc, building Angular/TypeScript components for video streaming.",
    // TODO (optional): add a sentence about what kind of role you're looking for.
  ],
  facts: [
    { label: "Based in", value: "Boston, MA" },
    { label: "Experience", value: "3+ years" },
    { label: "Studying", value: "MS Information Systems, Northeastern University (Dec 2026)" },
    { label: "Certified", value: "Google Cloud ACE, Microsoft Azure AZ-104 and AZ-900" },
  ],
};

// ---------- Experience & education timeline (newest first) ----------

export const timeline = {
  label: "Experience & education",
  entries: [
    {
      kind: "work",
      name: "Superstars Inc",
      role: "Software Developer Intern",
      dates: "Jan 2026 – May 2026",
      location: "Boston, MA",
      yearLabel: "2026",
      points: [
        "Built 25+ reusable Angular/TypeScript components and a predictive video preloading feature.",
        "Integrated 10+ REST API endpoints with RxJS, including request caching and error handling.",
        "Sped up the frontend with route-level lazy loading and progressive image rendering.",
      ],
    },
    {
      kind: "education",
      name: "Northeastern University",
      role: "MS in Information Systems",
      dates: "Sep 2024 – Dec 2026",
      location: "Boston, MA",
      yearLabel: "2024 – 2026",
      points: [
        "Master of Science in Information Systems, College of Engineering.",
        "Coursework: Programming Structures & Algorithms, Database Design, Application Engineering, and Generative AI.",
      ],
    },
    {
      kind: "work",
      name: "Tata Consultancy Services",
      role: "Systems Engineer",
      dates: "Apr 2021 – Jul 2024",
      location: "Mumbai, India",
      yearLabel: "2021 – 2024",
      points: [
        "Built CI/CD pipelines with Jenkins and Docker on GCP for zero-downtime deployments.",
        "Designed and ran 10+ Spring Boot microservices on GKE for a core banking platform.",
        "Tuned PostgreSQL/Oracle queries and indexes, and resolved production incidents within SLA.",
        "Automated a manual encryption/decryption process in Java/Spring Boot.",
      ],
    },
    {
      kind: "work",
      name: "LinuxWorld Informatics",
      role: "Associate Cloud Intern",
      dates: "May 2020 – Aug 2020",
      location: "Remote",
      yearLabel: "2020",
      points: [
        "Turned manual AWS provisioning (EC2, VPC, S3, IAM) into reusable Terraform modules.",
        "Automated configuration and deployments with Ansible playbooks.",
        "Set up Kubernetes for 15+ containerized apps, with Jenkins and GitHub Actions pipelines that roll back on failure.",
      ],
    },
        {
      kind: "education",
      name: "University of Mumbai",
      role: "Bachelor of Engineering",
      dates: "Aug 2016 – Sep 2020",
      location: "Mumbai, India",
      yearLabel: "2016 – 2020",
      points: [
        "Bachelor of Engineering, University of Mumbai.",
        // TODO (optional): add your branch or a highlight, e.g. a project or achievement.
      ],
    },
  ] as TimelineEntry[],
};

// ---------- Expertise ----------

export const expertise = {
  label: "Expertise",
  headline: ["Where I do", "my best work"],
  intro: "Backend first, with the cloud and delivery skills to take it all the way to production.",
  // The first area gets the tall card on the left.
  areas: [
    {
      name: "Backend",
      description: "APIs and services that hold up under real traffic: Java/Spring Boot microservices, event streaming and tuned databases.",
      tools: ["Java", "Spring Boot", "Node.js", "Kafka", "PostgreSQL", "Redis"],
      visual: "terminal",
    },
    {
      name: "DevOps",
      description: "Automated delivery: CI/CD pipelines, containers and infrastructure as code.",
      tools: ["Docker", "Jenkins", "Terraform", "ArgoCD"],
      visual: "pipeline",
    },
    {
      name: "Cloud",
      description: "Workloads on AWS and GCP, run on Kubernetes.",
      tools: ["AWS", "GCP", "EKS", "GKE", "Lambda"],
      visual: "cluster",
    },
    {
      name: "Full-stack",
      description: "End-to-end features, from the interface down to the service and database.",
      tools: ["Angular", "React", "TypeScript", "FastAPI"],
      visual: "browser",
    },
    {
      name: "Web development",
      description: "Fast, reusable interfaces built from clean components.",
      tools: ["Angular", "TypeScript", "HTML", "CSS", "RxJS"],
      visual: "editor",
    },
  ] as ExpertiseArea[],
  certifications: [
    "Google Cloud Associate Cloud Engineer",
    "Microsoft Azure AZ-104",
    "Azure AZ-900",
  ],
};

// ---------- Projects ----------

export const projects = {
  label: "Selected projects",
  items: [
    {
      title: "Baseplate",
      stack: ["Kubernetes", "ArgoCD", "AWS EKS", "Terraform", "Helm", "OpenTelemetry"],
      description:
        "A multi-tenant Kubernetes platform delivered through GitOps, running Ledgerline and Footnote as isolated tenants on k3s and AWS EKS from one repository. Replaced both EKS replicas under load with 0 of 4,801 requests failing; ArgoCD restored a deleted security policy in 3 seconds.",
      codeUrl: "https://github.com/Snehalvs30/baseplate",
      image: { src: "/projects/baseplate.png", alt: "Baseplate in layers: tenants, platform services, guardrails, Kubernetes on k3s and EKS, and AWS infrastructure, all synced from Git by ArgoCD" },
    },
    {
      title: "Footnote",
      stack: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "pgvector", "AWS", "Terraform"],
      description:
        "An AI document Q&A app: upload PDFs and ask questions, with streaming answers that cite the exact supporting sentences. Measured with a 26-question evaluation suite (20/20 correct and cited, 6/6 correct refusals), deployed on AWS with Terraform.",
      codeUrl: "https://github.com/Snehalvs30/footnote",
      image: { src: "/projects/footnote.png", alt: "Footnote answering a question, with citation markers and the supporting sentences highlighted in the source" },
    },
    {
      title: "Ledgerline",
      stack: ["Java 21", "Spring Boot", "PostgreSQL", "Kafka", "Kubernetes", "k6"],
      description:
        "A double-entry payments ledger built for correctness: idempotent transfers, the transactional outbox pattern with Kafka, and continuous reconciliation. Verified by an end-to-end smoke test on Kubernetes in CI, and k6 load tests.",
      codeUrl: "https://github.com/Snehalvs30/ledgerline",
      image: { src: "/projects/ledgerline-burgundy.png", alt: "Ledgerline's architecture: API, PostgreSQL with a transactional outbox, Kafka, and reconciliation" },    },
    // {
    //   title: "This Portfolio",
    //   stack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion", "Lenis"],
    //   description:
    //     "This website: a Next.js App Router site with scroll-driven animations, deployed on Vercel.",
    //   codeUrl: "", // TODO: GitHub repo URL for this portfolio
    //   image: { src: "/projects/sample-portfolio.svg", alt: "Sample illustration of this portfolio's hero" },
    // },
  ] as Project[],
};

// ---------- "This is me." (shown just before Contact) ----------

export const intro = {
  zoomText: "THIS IS ME", // the full stop is added automatically; you fly through it
  photo: { src: "/about/snehal.jpg", alt: "Snehal Shinde standing against a sunlit wall, her shadow beside her" },
  caption: "SNEHAL SHINDE · BOSTON, MA",
  headline: ["Curious by default,", "careful by habit."],
  // lead: "I'm a software engineer in Boston with 3+ years of building full-stack applications and the cloud infrastructure that runs them.",
  // body: "At Tata Consultancy Services I designed and ran microservices for a core banking platform handling 2M+ daily transactions. Today I'm finishing my MS in Information Systems at Northeastern University.",
  // personal: "", // TODO: a line in your own words, e.g. what you enjoy outside work. Leave "" to hide it.
  personal: "",  
   lead: "I'm calm when things break, careful with the details, and always learning something new.",
  body: "Over 3+ years of building full-stack applications and cloud infrastructure, I've learned to understand a problem fully before fixing it, to sweat the small things others miss, and to treat every new tool as something worth figuring out.",
  facts: [
    { label: "Based in", value: "Boston, MA" },
    { label: "Studying", value: "Northeastern, Dec 2026" },
    { label: "Certified", value: "GCP ACE · AZ-104" },
  ],
};

// ---------- Contact ----------

export const contact = {
  label: "Get in touch",
  headline: ["Have an idea?", "Let's build it."],
  sub: "Hiring, building something, or stuck on a tricky problem? My inbox is open.",
  location: "Boston, MA",
  timeZone: "America/New_York", // used for the live local time
  availability: "Available for work — Dec 2026",
};