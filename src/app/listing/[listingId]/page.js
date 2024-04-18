import ListingWrapper from "@/components/ListingComponent/ListingWrapper";
import {
  getAttractionsByDestId,
  getDestinationById,
} from "@/services/apiServices";

const page = async ({ params }) => {
  const destinationDetails = await getDestinationById({
    destinationId: params.listingId,
  });

  const attractionsList = await getAttractionsByDestId({
    destinationId: params.listingId,
  });

  return (
    <>
      <div>Test</div>
      <div>
        <ListingWrapper
          destinationDetails={destinationDetails.data.data}
          attractionsList={attractionsList.data.data}
        />
      </div>
    </>
  );
};

export default page;
