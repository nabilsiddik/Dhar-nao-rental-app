"use client";

import ConfirmationClient from "@/components/booking/ConfirmationClient";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = await params;

  return (
    <div>
      <Elements stripe={stripePromise}>
        <ConfirmationClient listingId={id} />
      </Elements>
    </div>
  );
};

export default page;
