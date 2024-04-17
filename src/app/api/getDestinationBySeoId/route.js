import { NextResponse } from "next/server";
import fs from "fs";
import { apiList } from "@/utils/constants";
import { isDataStaleChecker } from "@/utils/common";
import { getAttractionController } from "@/controllers/apisController";

export const GET = async (req) => {
  try {
    const attractionData = fs.readFileSync(
      `${apiList.fileUpload}/destinationBySeoId.json`,
      "utf-8"
    );
    console.log("attractions", typeof attractionData);

    let arr = JSON.parse(attractionData);
    console.log("arr", typeof arr);

    if (attractionData && isDataStaleChecker(arr.updatedAt) === false) {
      return NextResponse.json(arr, { status: 200 });
    } else {
      const params = req.nextUrl.searchParams;
      let id = params.get("seoId");
      const attractions = await getAttractionController(id);
      console.log("attractions", typeof attractions);
      if (attractions.status) {
        let arr = {
          updatedAt: new Date(),
          data: attractions.data,
        };
        fs.writeFile(
          `public/json/destinationBySeoId.json`,
          JSON.stringify(arr),
          (err) => {
            if (err) {
              console.error("Error writing file:");
            } else {
              console.log("File written successfully");
            }
          }
        );

        return NextResponse.json(attractions, { status: 200 });
      } else {

        throw attractions;
      }
    }
  } catch (error) {
    console.error("getAttraction Api error", error);
    return NextResponse.json(error, {
      status: 500,
    });
  }
};
