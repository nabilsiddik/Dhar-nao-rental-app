import SingleMessage from "./singleMessage";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  return <SingleMessage id={id} />;
}
