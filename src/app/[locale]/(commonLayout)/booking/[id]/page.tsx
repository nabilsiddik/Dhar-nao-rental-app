import BookingDetailsClient from "./BookingDetailsClient";

export default async function BookingDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-white">
      <BookingDetailsClient bookingId={id} />
    </main>
  );
}
