import { getAllDestinationsController } from "@/controllers/apisController";
import { NextResponse } from "next/server";
import fs from "fs";
import { apiList } from "@/utils/constants";
import { isDataStaleChecker } from "@/utils/common";

export const GET = async (req) => {
  try {
    const destinationData = fs.readFileSync(
      `${apiList.fileUpload}/allDestination.json`,
      "utf-8"
    );
    let arr = JSON.parse(destinationData)
    if (destinationData && isDataStaleChecker(arr.updatedAt) === false) {
      return NextResponse.json(arr, { status: 200 });
    } else {
      const destinations = await getAllDestinationsController();
      if (destinations.status) {
        // const maindata = JSON.stringify(destinations);
        let arr = {
          updatedAt: new Date(),
          data: destinations.data
        }
        fs.writeFile(`public/json/allDestination.json`, JSON.stringify(arr), (err) => {
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
