export interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  permalink?: string;
  mediaType: "IMAGE" | "CAROUSEL_ALBUM" | "VIDEO";
}

export const INSTAGRAM_FEED: InstagramPost[] = [
  {
    id: "ig-1",
    image: "/images/instagram/insta-1.jpg",
    caption: "Double-height living space with handcrafted teakwood rafters and Italian marble in our recent Alappuzha luxury residence.",
    permalink: "https://www.instagram.com/calista_epc/",
    mediaType: "CAROUSEL_ALBUM",
  },
  {
    id: "ig-2",
    image: "/images/instagram/insta-2.jpg",
    caption: "Evening ambient lighting casting serene reflections over the poolside cantilever deck. Kozhikode modern villa.",
    permalink: "https://www.instagram.com/calista_epc/",
    mediaType: "IMAGE",
  },
  {
    id: "ig-3",
    image: "/images/instagram/insta-3.jpg",
    caption: "Precision board-formed concrete and warm wood paneling come together in perfect architectural symmetry.",
    permalink: "https://www.instagram.com/calista_epc/",
    mediaType: "CAROUSEL_ALBUM",
  },
  {
    id: "ig-4",
    image: "/images/instagram/insta-4.jpg",
    caption: "Seamless indoor-outdoor tropical living with floor-to-ceiling panoramic glass doors.",
    permalink: "https://www.instagram.com/calista_epc/",
    mediaType: "IMAGE",
  },
  {
    id: "ig-5",
    image: "/images/instagram/insta-5.jpg",
    caption: "Waterfront elevation catching the golden Kerala sunset along the tranquil Alappuzha backwaters.",
    permalink: "https://www.instagram.com/calista_epc/",
    mediaType: "IMAGE",
  },
  {
    id: "ig-6",
    image: "/images/instagram/insta-6.jpg",
    caption: "Architectural night perspective showing curved facade louvers at our Kochi commercial tower.",
    permalink: "https://www.instagram.com/calista_epc/",
    mediaType: "CAROUSEL_ALBUM",
  },
  {
    id: "ig-7",
    image: "/images/instagram/insta-7.jpg",
    caption: "Night illumination framing the tropical garden landscaping and private courtyard.",
    permalink: "https://www.instagram.com/calista_epc/",
    mediaType: "IMAGE",
  },
];
