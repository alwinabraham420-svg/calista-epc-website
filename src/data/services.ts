export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  href: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "residential",
    number: "01",
    title: "Residential Construction",
    subtitle: "Luxury Villas & Homes",
    description: "Tailored residential spaces engineered with contemporary Kerala tropical aesthetics, premium structural integrity, and exquisite finishes.",
    image: "/images/services/residential.jpg",
    href: "#services",
  },
  {
    id: "commercial",
    number: "02",
    title: "Commercial Construction",
    subtitle: "Offices & Retail Complexes",
    description: "High-performance commercial architecture designed for modern enterprise, operational efficiency, and striking urban presence.",
    image: "/images/services/commercial.jpg",
    href: "#services",
  },
  {
    id: "industrial",
    number: "03",
    title: "Industrial Construction",
    subtitle: "Warehouses & Facilities",
    description: "Robust industrial facilities, logistics hubs, and manufacturing plants built with precision heavy civil engineering.",
    image: "/images/services/industrial.jpg",
    href: "#services",
  },
  {
    id: "infrastructure",
    number: "04",
    title: "Infrastructure Development",
    subtitle: "Roadways & Civil Engineering",
    description: "Public and private infrastructure projects contributing to regional connectivity, durable bridges, and sustainable civil works.",
    image: "/images/services/infrastructure.jpg",
    href: "#services",
  },
];
