import { getDestinationBySeoId } from "@/services/apiServices";

const AttractionWrapper = async ({ seoId, pathname }) => {
  console.log({ seoId });
  const result = await getDestinationBySeoId(seoId);
  console.log({ result });

  return (
    <>
      <h1>AttractionWrapper page</h1>
    </>
  );
};

export default AttractionWrapper;
