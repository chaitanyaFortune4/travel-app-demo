import { getAllDestinationsController } from "@/controllers/apisController";
import { NextResponse } from "next/server";
import fs from "fs";
import { apiList } from "@/utils/constants";

export const GET = async (req) => {
  //   const params = req.nextUrl.searchParams;
  //   let textData = params.get("query");
  try {
    const destinationData = fs.readFileSync(
      `${apiList.fileUpload}/allDestination.json`,
      "utf-8"
    );
    if (destinationData) {
      let ArrOfObj = { data: JSON.parse(destinationData).data };
      
      return NextResponse.json(ArrOfObj, { status: 200 });
    } else {
      const destinations = await getAllDestinationsController();
      if (destinations.status) {
        const maindata = JSON.stringify(destinations);
        fs.writeFile(`public/json/allDestination.json`, maindata, (err) => {
          if (err) {
            console.error("Error writing file:");
          } else {
            console.log("File written successfully");
          }
        });

        return NextResponse.json(destinations, { status: 200 });
      } else {
        throw destinations;
      }
    }
  } catch (error) {
    console.error("getAllDestination Api error", error);
    return NextResponse.json(error, {
      status: 500,
    });
  }
};
