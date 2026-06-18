import React from "react";
import SingleUser from "./SingleUser";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  console.log(id, "my iddd");
  return <SingleUser id={id} />;
};

export default page;
