import ListingDetailsClient from "./ListingDetailsClient";

import { Metadata } from "next";

interface Props {
  params: { id: string };
}

// THIS RUNS ON THE SERVER
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  // Fetch data directly from your API/DB for SEO
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/listings/${id}`);
  const data = await res.json();
  const listing = data?.data;

  if (!listing) {
    return { title: "Listing Not Found" };
  }

  return {
    title: listing.title,
    description: listing.description.slice(0, 160),
    openGraph: {
      title: listing.title,
      description: listing.description,
      images: [listing.images?.[0] || "/default-car.jpg"],
      url: `https://renthub.com/listings/${id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: listing.title,
      description: listing.description,
      images: [listing.images?.[0]],
    },
  };
}

export default async function ListingPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return (
    <main className="bg-white min-h-screen">
      <ListingDetailsClient id={id} />
    </main>
  );
}
