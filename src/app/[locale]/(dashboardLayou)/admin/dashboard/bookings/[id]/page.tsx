import SingleBooking from "@/components/Dashboard/BookingsPage/singleBooking";

async function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = await params;

  return (
    <div>
      <SingleBooking bookingId={id}></SingleBooking>
    </div>
  );
}

export default page;
