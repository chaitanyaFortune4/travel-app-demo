import ListingWrapper from "@/components/ListingComponent/ListingWrapper";
import {
  getAttractionsByDestId,
  getDestinationById,
} from "@/services/apiServices";

const page = async ({ params }) => {
  const destinationDetails = await getDestinationById({
    destinationId: params.destinationId,
  });

  const attractionsList = await getAttractionsByDestId({
    destinationId: params.destinationId,
  });

  return (
    <>
      <div>
        <ListingWrapper
          destinationName={params.destination}
          destinationDetails={destinationDetails.data.data}
          attractionsList={attractionsList.data.data}
        />
      </div>
    </>
  );
};

export default page;
