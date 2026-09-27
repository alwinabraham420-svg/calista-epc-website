export interface Project {
  id: string;
  slug: string;
  name: string;
  location: string;
  category: string;
  description: string;
  coverImage: string;
  gallery?: string[];
  featured?: boolean;
}

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "proj-1",
    slug: "luxury-residence-alappuzha",
    name: "Luxury Residence",
    location: "Alappuzha",
    category: "Residential",
    description: "A contemporary tropical waterfront villa featuring cantilevered slabs, glass curtain walls, and seamless integration with nature.",
    coverImage: "/images/projects/luxury-residence.jpg",
    featured: true,
  },
  {
    id: "proj-2",
    slug: "commercial-complex-kochi",
    name: "Commercial Complex",
    location: "Kochi",
    category: "Commercial",
    description: "An iconic corporate tower in Kochi engineered with curved energy-efficient double-glazed facades and modern office spaces.",
    coverImage: "/images/projects/commercial-complex.jpg",
  },
  {
    id: "proj-3",
    slug: "institutional-building-kottayam",
    name: "Institutional Building",
    location: "Kottayam",
    category: "Institutional",
    description: "A state-of-the-art campus facility combining open courtyards, natural ventilation louvers, and sustainable civil design.",
    coverImage: "/images/projects/institutional-building.jpg",
  },
  {
    id: "proj-4",
    slug: "modern-villa-kozhikode",
    name: "Modern Villa",
    location: "Kozhikode",
    category: "Residential",
    description: "A multi-tiered architectural masterpiece with natural stone cladding, infinity pool, and lush rooftop gardens.",
    coverImage: "/images/projects/modern-villa.jpg",
    featured: true,
  },
];
