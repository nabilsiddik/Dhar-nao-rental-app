import ReviewClient from "./ReviewPageClient";

const page = async ({
  params,
}: {
  params: {
    bookingId: string;
  };
}) => {
  const { bookingId } = await params;

  return (
    <div>
      <ReviewClient bookingId={bookingId}/>
    </div>
  );
};

export default page;
