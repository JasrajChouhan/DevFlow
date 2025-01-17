const page = ({ params }: { params: { id: string } }) => {
  return <div>page profile id {params.id}</div>;
};

export default page;
