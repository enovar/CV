// Language-neutral structural & numeric data only.
// All translatable text lives in translations.js

export const cvData = {
  name: "Luís P. A.",
  contact: {
    email: "luis.particular@gmail.com",
    location: "Parede, Portugal",
    stackoverflow: "9.759",
  },
  // periodStart / periodEnd keep the numbers; "Present/Presente" comes from translations
  experience: [
    { company: "Infosistema – Sistemas de Informação, SA.", periodStart: "2010", current: true },
    { company: "Codex – Design e Relações Públicas", periodStart: "2009", periodEnd: "2010", current: false },
    { company: "Redvo – Infocomunicações, SA.", periodStart: "2008", periodEnd: "2009", current: false },
    { company: "Braitling – Sistemas de Comunicação", periodStart: "2005", periodEnd: "2008", current: false },
    { company: "Freelancer (Webdesign)", periodStart: "2000", periodEnd: "2005", current: false },
  ],
  // icons + proficiency levels only; names come from translations
  skills: [
    { icon: "⬡", levels: [98, 96, 95, 90, 85, 88, 85] },
    { icon: "◈", levels: [98, 98, 75, 80, 98] },
    { icon: "◎", levels: [95, 92, 90, 95, 93] },
    { icon: "◫", levels: [72, 75, 85, 82] },
    { icon: "◐", levels: [88, 90, 85, 88, 85] },
    { icon: "◉", levels: [93, 95, 90, 88] },
  ],
  // institution, period, grade are neutral; course names come from translations
  education: [
    { institution: "FLAG", period: "1998–1999", grade: "17 Valores" },
    { institution: "Rumos", period: "1998–1999", grade: "14 Valores" },
    { institution: "IJOVIP", period: "1995–1996", grade: "13 Valores" },
    { institution: "IJOVIP", period: "1993–1994", grade: "15 Valores" },
   // { institution: "Escola Secundária de Águeda", period: "1990–1993", grade: null },
  ],
  languagePercents: [100, 90],
  references: [
    { name: "Joyn Group", url: "https://www.joyn-group.com" },
    { name: "Infosistema", url: "https://www.infosistema.com" },
    { name: "Uniksystem", url: "https://www.uniksystem.com" },
    { name: "Landskill", url: "https://www.landskill.com" },
    { name: "Growin", url: "https://www.growin.com" },
    { name: "Fyld", url: "https://www.fyld.pt" },
    { name: "Joyn Ventures", url: "https://www.joyn-ventures.com" },
    { name: "Vanity Terrace", url: "https://www.vanityterrace.com" },
    { name: "BizApis", url: "https://www.bizapis.com" },
    { name: "BizSupply.ai", url: "https://www.bizsupply.ai" },
    { name: "DocDigitizer", url: "https://www.docdigitizer.com" },
    { name: "CoverSuite", url: "https://www.coversuite.com" },
    { name: "Foreteller", url: "https://www.weareforeteller.com" },
  ],
};
