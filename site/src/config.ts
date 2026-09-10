// Central site configuration. Public values only; secrets never live here.
// The chat endpoint is read from PUBLIC_CHAT_ENDPOINT (site/.env or a GitHub Actions variable)
// and falls back to the value below once the Worker is deployed.

export const site = {
  name: 'Naveen Kumar',
  shortName: 'Naveen',
  title: 'Naveen Kumar | Principal AI Architect and Forward-Deployed AI Leader',
  tagline: 'I take agentic AI from POC to governed production inside regulated enterprises.',
  description:
    'Principal AI Architect and forward-deployed AI engineering leader with 12+ years building production agentic AI, enterprise RAG, LLM evaluation and AI platforms for government, retail, BFSI, healthcare and technology. Immediate joiner. Open to Head of AI, CAIO-track, Forward Deployed Engineering Lead, Principal AI Platform and sovereign AI leadership roles, remote or onsite.',
  // Set to your custom domain (e.g. 'https://naveenkumar.ai') once DNS is configured; see README "Custom domain".
  url: 'https://naveenkumar911.github.io',
  location: 'Dubai / Abu Dhabi, UAE (GMT+4)',
  experienceYears: '12+',
  availability: 'Immediate joiner. Open to remote (US / global), relocation, and UAE onsite',
  joinerStatus: 'Immediate joiner',
  executiveBriefPdf: '/NaveenKumar_Executive_Brief.pdf',
  email: 'naveenkumar95925@gmail.com',
  phoneUAE: '+971 562399343',
  phoneIN: '+91 9592542092',
  whatsapp: '971562399343',
  linkedin: 'https://www.linkedin.com/in/naveen-kumar-29014b143',
  linkedinFollowers: '16K',
  github: 'https://github.com/naveenkumar911',
  calcom: 'https://cal.com/naveenkumar911',
  formspree: 'https://formspree.io/f/mwlkqojy',
  resumeDocx: '/NaveenKumar_Resume.docx',
  chatEndpoint: import.meta.env.PUBLIC_CHAT_ENDPOINT || '',
  // Privacy-friendly analytics (free, no cookies). Set PUBLIC_GOATCOUNTER in site/.env or as a GitHub
  // Actions variable to e.g. 'https://naveenkumar.goatcounter.com/count'; see README "Analytics".
  goatcounter: import.meta.env.PUBLIC_GOATCOUNTER || '',
  ogImage: '/og/default.png',
  twitter: '',
};

export const nav = [
  { href: '/#hire-me-as', label: 'Roles' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/architecture', label: 'Architecture' },
  { href: '/demos', label: 'Live Demos' },
  { href: '/insights', label: 'Insights' },
  { href: '/leadership', label: 'Leadership' },
  { href: '/hire', label: 'Hire Naveen' },
];

export const numbers = {
  hired: 8,
  onboarded: 12,
  programs: 12,
  concurrentPrograms: 6,
  teamSize: 10,
};
