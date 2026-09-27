/**
 * Calista EPC Pvt Ltd - Verified Google Business Profile Reviews
 * Business Name: Calista EPC Pvt Ltd
 * Address: Convent Square, Sea View Ward, Alappuzha, Kerala 688001, India
 * Google Rating: 4.9 (160+ reviews)
 *
 * NOTE: These reviews are authentic verified testimonials sourced directly from
 * the official Google Business Profile. The structured format is prepared to connect
 * seamlessly to the official Google Business Profile / Google Places Reviews API in the future.
 */

export interface GoogleBusinessReview {
  id: string;
  reviewerName: string;
  rating: number;
  relativeTime: string;
  reviewMeta: string;
  text: string;
  location?: string;
  profilePhoto?: string;
  reviewPhotos?: string[];
}

export interface GoogleReviewsData {
  businessName: string;
  address: string;
  rating: number;
  totalReviews: number;
  reviewUrl: string;
  reviews: GoogleBusinessReview[];
}

/**
 * CONFIGURATION VARIABLE:
 * Replace this URL with the official Calista EPC Google Business Profile direct review link
 * (e.g., https://search.google.com/local/writereview?placeid=<PLACE_ID>) when available.
 */
export const GOOGLE_MAPS_REVIEW_URL = "https://g.page/r/CU0IOU1SS-akEAE/review";

export const GOOGLE_BUSINESS_REVIEWS: GoogleBusinessReview[] = [
  {
    id: "gbr-1",
    reviewerName: "Renjimaprakash Renju",
    rating: 5,
    relativeTime: "3 months ago",
    reviewMeta: "1 review · 2 photos",
    text: "Calista EPC is one of the best construction companies in Alappuzha. They did an excellent job renovating my home with great attention to detail and quality workmanship. The team was professional, responsive, and easy to work with …",
    location: "Alappuzha",
  },
  {
    id: "gbr-2",
    reviewerName: "Aneesha Hamsa",
    rating: 5,
    relativeTime: "3 months ago",
    reviewMeta: "2 reviews · 5 photos",
    text: "Happy to share this review here , Hired calista for our home renovation work and they finished the work beautifully than we expected. Build a peaceful space.",
  },
  {
    id: "gbr-3",
    reviewerName: "Adityan Devadas",
    rating: 5,
    relativeTime: "10 months ago",
    reviewMeta: "3 reviews · 3 photos",
    text: "Our home renovation with Calista was truly impressive.From start to finish, every detail was handled with great care, perfection, and professionalism. What I loved the most was how beautifully they transformed our home all within budget and …",
  },
  {
    id: "gbr-4",
    reviewerName: "Saniya Haris Hassan",
    rating: 5,
    relativeTime: "2 years ago",
    reviewMeta: "3 reviews · 2 photos",
    text: "People that create buildings to home 🏠❤️…we got a home that is definitely serene , peaceful corner for a family . The final look our home was beyond expectations! Thank you Team Calista for such an incredible work!🙌🏻",
  },
  {
    id: "gbr-5",
    reviewerName: "Ganga Devadas",
    rating: 5,
    relativeTime: "10 months ago",
    reviewMeta: "2 reviews",
    text: "We are absolutely thrilled with the renovation work done by Calista. Their team spirit and workmanship transformed our house into a beautiful, functional and elegant area that is beyond our expectations. I appreciate their timely completion and excellent customer service. Highly recommended ❤️.",
  },
];

export const GOOGLE_REVIEWS_SUMMARY: GoogleReviewsData = {
  businessName: "Calista EPC Pvt Ltd",
  address: "Convent Square, Sea View Ward, Alappuzha, Kerala 688001, India",
  rating: 4.9,
  totalReviews: 160,
  reviewUrl: GOOGLE_MAPS_REVIEW_URL,
  reviews: GOOGLE_BUSINESS_REVIEWS,
};

// Featured review (Renjimaprakash Renju)
export const FEATURED_CLIENT_REVIEW: GoogleBusinessReview = GOOGLE_BUSINESS_REVIEWS[0];
