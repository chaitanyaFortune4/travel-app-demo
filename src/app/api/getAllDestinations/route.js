import { addDataSolrDbController } from "@/controllers/solrApisController";
import { NextResponse } from "next/server";

// const transformData = (data) => {
//   for (let i = 0; i < data.length; i++) {
//     const item = data[i];
//     item.id = i + 1;
//     item.destinationId = item.destinationId;
//     item.destinationName = item.destinationName;
//   }
// };

export const GET = async (req) => {
  //   const params = req.nextUrl.searchParams;
  //   let textData = params.get("query");

  try {
    const response = await fetch(
      `${process.env.VIATOR_BASEURL}/partner/v1/taxonomy/destinations`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          "exp-api-key": process.env.VIATOR_API_KEY,
          "Accept-Language": "en-IN",
        },
      }
    );

    const resp = await response.json();

    console.log("RESP");

    const transformedData = resp.data.map((item) => ({
      id: item.sortOrder,
      destinationId: item?.destinationId,
      destinationName: item?.destinationName,
    }));

    const result = await addDataSolrDbController(transformedData);

    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.error("An error occurred while fetching data", {
      status: 500,
    });
  }
};
