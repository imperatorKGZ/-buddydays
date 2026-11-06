import type { BlogSpecies } from "@/data/blog/categories";

export type BlogArticleStatus = "draft" | "published";

export interface BlogArticleSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  species: BlogSpecies;
  category: string;
  tags: string[];
  readingMinutes: number;
  publishedAt?: string;
  sections?: BlogArticleSection[];
  sources?: { label: string; url: string }[];
  rank: number;
  editorPick: boolean;
  status: BlogArticleStatus;
  outline: string[];
}

/**
 * Editorial topic previews used to build and test the blog experience.
 * Change status to "published" only after the complete article has been written,
 * fact-checked, sourced where appropriate, and approved for publication.
 */
export const blogArticles: BlogArticle[] = [
  {
    id: "dog-rainy-day-activities", slug: "keeping-your-dog-engaged-on-rainy-days",
    title: "Keeping Your Dog Engaged on Rainy Days", excerpt: "Simple indoor ideas for adding movement, curiosity and connection to a wet-weather day.",
    species: "dogs", category: "lifestyle", tags: ["indoor activities", "rainy day", "play", "boredom"], readingMinutes: 6, rank: 18, editorPick: true, status: "draft",
    outline: ["Start with your dog's energy and comfort", "Use short games and simple scent activities", "Make quiet time part of the routine"],
  },
  {
    id: "dog-road-trip", slug: "preparing-your-dog-for-a-road-trip", title: "Preparing Your Dog for a Road Trip", excerpt: "A calm, practical checklist for planning stops, packing essentials and making the car feel familiar.",
    species: "dogs", category: "travel", tags: ["road trip", "car travel", "packing", "travel"], readingMinutes: 7, rank: 16, editorPick: true, status: "draft",
    outline: ["Get familiar with the travel setup", "Pack for comfort and routine", "Plan breaks and arrival time"],
  },
  {
    id: "dog-new-home", slug: "helping-your-dog-settle-into-a-new-home", title: "Helping Your Dog Settle Into a New Home", excerpt: "Thoughtful ways to make a new space feel predictable, comfortable and familiar.",
    species: "dogs", category: "care", tags: ["new home", "routine", "moving", "settling in"], readingMinutes: 5, rank: 14, editorPick: false, status: "draft",
    outline: ["Set up a familiar resting area", "Keep the first days predictable", "Explore the home gradually"],
  },
  {
    id: "dog-leash-walks", slug: "making-daily-dog-walks-more-enjoyable", title: "Making Daily Dog Walks More Enjoyable", excerpt: "Small changes to route, pace and attention that can make everyday walks work better for both of you.",
    species: "dogs", category: "training", tags: ["walking", "leash", "daily routine", "outdoors"], readingMinutes: 6, rank: 12, editorPick: true, status: "draft",
    outline: ["Choose a pace that suits your dog", "Build in time to sniff and explore", "Keep equipment comfortable and well-fitted"],
  },
  {
    id: "dog-brushing", slug: "a-gentle-at-home-brushing-routine-for-dogs", title: "A Gentle At-Home Brushing Routine for Dogs", excerpt: "How to make coat care feel more predictable with short sessions and the right approach for your dog's coat.",
    species: "dogs", category: "care", tags: ["grooming", "brushing", "coat care", "routine"], readingMinutes: 5, rank: 10, editorPick: false, status: "draft",
    outline: ["Know what your dog's coat needs", "Introduce tools gradually", "Keep sessions short and comfortable"],
  },
  {
    id: "dog-body-language", slug: "everyday-dog-body-language-to-notice", title: "Everyday Dog Body Language to Notice", excerpt: "A beginner-friendly look at posture, movement and context when observing how a dog communicates.",
    species: "dogs", category: "behavior", tags: ["body language", "communication", "behavior", "signals"], readingMinutes: 8, rank: 8, editorPick: false, status: "draft",
    outline: ["Look at the whole body, not one signal", "Read behavior in context", "Give dogs space when they need it"],
  },
  {
    id: "dog-resting-space", slug: "creating-a-comfortable-resting-space-for-your-dog", title: "Creating a Comfortable Resting Space for Your Dog", excerpt: "A practical guide to choosing a quiet spot, thinking about size and keeping the area easy to use.",
    species: "dogs", category: "home", tags: ["dog bed", "home setup", "rest", "comfort"], readingMinutes: 4, rank: 6, editorPick: false, status: "draft",
    outline: ["Pick a calm location", "Think about size and access", "Keep the space consistent"],
  },
  {
    id: "dog-enrichment", slug: "choosing-enrichment-activities-for-your-dog", title: "Choosing Enrichment Activities for Your Dog", excerpt: "How to choose manageable activities around your dog's interests, confidence and everyday routine.",
    species: "dogs", category: "lifestyle", tags: ["enrichment", "mental stimulation", "games", "activities"], readingMinutes: 6, rank: 4, editorPick: false, status: "draft",
    outline: ["Notice what your dog enjoys", "Offer variety without overwhelming them", "Adjust difficulty over time"],
  },
  {
    id: "cat-indoor-enrichment", slug: "simple-ways-to-enrich-an-indoor-cats-day", title: "Simple Ways to Enrich an Indoor Cat's Day", excerpt: "Ideas for adding choice, play, observation spots and small changes to an indoor environment.",
    species: "cats", category: "enrichment", tags: ["indoor cats", "play", "enrichment", "environment"], readingMinutes: 7, rank: 17, editorPick: true, status: "draft",
    outline: ["Create places to observe and rest", "Rotate a small selection of toys", "Make room for natural play patterns"],
  },
  {
    id: "cat-new-home", slug: "helping-your-cat-feel-at-home-after-a-move", title: "Helping Your Cat Feel at Home After a Move", excerpt: "A gradual approach to introducing a new space while keeping familiar routines and safe places available.",
    species: "cats", category: "care", tags: ["moving", "new home", "settling in", "routine"], readingMinutes: 6, rank: 15, editorPick: false, status: "draft",
    outline: ["Prepare one quiet starter room", "Bring familiar items into the space", "Expand access at your cat's pace"],
  },
  {
    id: "cat-friendly-room", slug: "setting-up-a-cat-friendly-room", title: "Setting Up a Cat-Friendly Room", excerpt: "A room-by-room way to think about resting spots, vertical space, scratching and everyday essentials.",
    species: "cats", category: "home", tags: ["cat-friendly home", "room setup", "scratching", "rest"], readingMinutes: 6, rank: 13, editorPick: true, status: "draft",
    outline: ["Make room for separate activities", "Add safe vertical options", "Keep key resources easy to reach"],
  },
  {
    id: "cat-carrier", slug: "making-a-cat-carrier-feel-more-familiar", title: "Making a Cat Carrier Feel More Familiar", excerpt: "Gentle ways to make the carrier part of the everyday environment instead of bringing it out only for trips.",
    species: "cats", category: "behavior", tags: ["cat carrier", "travel", "positive association", "routine"], readingMinutes: 5, rank: 11, editorPick: false, status: "draft",
    outline: ["Leave the carrier available at home", "Add familiar bedding", "Let your cat approach without pressure"],
  },
  {
    id: "cat-scratching", slug: "understanding-why-cats-scratch", title: "Understanding Why Cats Scratch", excerpt: "Explore the everyday purposes of scratching and ways to make appropriate surfaces easier to choose.",
    species: "cats", category: "behavior", tags: ["scratching", "scratching posts", "behavior", "home"], readingMinutes: 6, rank: 9, editorPick: false, status: "draft",
    outline: ["Recognize scratching as normal behavior", "Offer different surfaces and orientations", "Place options where your cat already spends time"],
  },
  {
    id: "cat-play-routine", slug: "building-a-play-routine-for-your-cat", title: "Building a Play Routine for Your Cat", excerpt: "A flexible approach to short play sessions, toy rotation and noticing what keeps your cat interested.",
    species: "cats", category: "enrichment", tags: ["play", "toys", "routine", "indoor cats"], readingMinutes: 5, rank: 7, editorPick: false, status: "draft",
    outline: ["Find a time that fits your household", "Try different play styles", "Finish with a calm transition"],
  },
  {
    id: "cat-body-language", slug: "everyday-cat-body-language-to-notice", title: "Everyday Cat Body Language to Notice", excerpt: "A simple introduction to reading ears, tail position, posture and the setting around your cat.",
    species: "cats", category: "behavior", tags: ["body language", "communication", "tail", "ears"], readingMinutes: 8, rank: 5, editorPick: false, status: "draft",
    outline: ["Observe ears, eyes, tail and posture together", "Consider the environment", "Respect signals that ask for space"],
  },
  {
    id: "cat-litter-area", slug: "creating-a-calm-and-practical-litter-area", title: "Creating a Calm and Practical Litter Area", excerpt: "Consider privacy, access, placement and simple upkeep when planning a litter area at home.",
    species: "cats", category: "care", tags: ["litter box", "home setup", "cleaning", "cat care"], readingMinutes: 6, rank: 3, editorPick: false, status: "draft",
    outline: ["Choose an accessible location", "Keep the area comfortable and predictable", "Plan a simple cleaning routine"],
  },
  {
    id: "cat-window-spots", slug: "making-a-window-spot-work-for-your-cat", title: "Making a Window Spot Work for Your Cat", excerpt: "Ideas for creating a safe observation place that fits your room and your cat's habits.",
    species: "cats", category: "indoor-cats", tags: ["window perch", "indoor cats", "home", "enrichment"], readingMinutes: 4, rank: 2, editorPick: false, status: "draft",
    outline: ["Check the window and surrounding area", "Choose a stable resting surface", "Keep the view and access safe"],
  },
  {
    id: "cat-shared-home", slug: "making-shared-spaces-comfortable-for-cats", title: "Making Shared Spaces Comfortable for Cats", excerpt: "Small home-layout decisions that give cats options while keeping shared rooms practical for people.",
    species: "cats", category: "lifestyle", tags: ["shared spaces", "home", "cat comfort", "layout"], readingMinutes: 5, rank: 1, editorPick: false, status: "draft",
    outline: ["Think in zones rather than one cat area", "Provide routes and places to pause", "Keep household routines predictable"],
  },
];

export function getBlogArticleBySlug(slug: string) {
  return blogArticles.find((article) => article.slug === slug);
}

