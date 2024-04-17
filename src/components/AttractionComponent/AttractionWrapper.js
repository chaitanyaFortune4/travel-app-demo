import { getDestinationBySeoId } from "@/services/apiServices";

const AttractionWrapper = async ({ seoId, pathname }) => {
  const result = await getDestinationBySeoId(seoId);
  console.log('result', result.data);

  return (
    <>
      <h1>AttractionWrapper page</h1>
    </>
  );
};

export default AttractionWrapper;
