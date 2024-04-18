import { getAttractionsBySeoId } from "@/services/apiServices";

const page = async ({ params }) => {
  // console.log("params", params);

  const attractionBySeoId = await getAttractionsBySeoId(params.attractionSeoId);

  // console.log("attractionBySeoId", attractionBySeoId);

  return (
    <>
      <div></div>
    </>
  );
};

export default page;
