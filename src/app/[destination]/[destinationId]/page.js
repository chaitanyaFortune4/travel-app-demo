import ListingWrapper from "@/components/ListingComponent/ListingWrapper";
import {
  getAttractionsByDestId,
  getDestinationById,
} from "@/services/apiServices";
import Link from "next/link";

const page = async ({ params }) => {
  const destinationDetails = await getDestinationById({
    destinationId: params.destinationId,
  });

  const attractionsList = await getAttractionsByDestId({
    destinationId: params.destinationId,
  });

  return (
    <>
      <div
        style={{ marginBottom: "2rem", textAlign: "center", cursor: "pointer" }}
      >
        <Link style={{ textDecoration: "none", color: "inherit" }} href="/">
          <h1>Travel App Demo</h1>
        </Link>
      </div>
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
