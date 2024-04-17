import { NextResponse } from "next/server";
import fs from "fs";
import { apiList } from "@/utils/constants";
import { isDataStaleChecker } from "@/utils/common";
import { getAttractionController } from "@/controllers/apisController";

export const GET = async (req) => {
  try {
    console.log("xxxxx9");
    const attractionData = fs.readFileSync(
      `${apiList.fileUpload}/destinationBySeoId.json`,
      "utf-8"
    );
    console.log("attractions", typeof attractionData);

    let arr = JSON.parse(attractionData);
    console.log("arr", typeof arr);
    console.log("xxxxx19");

    if (attractionData && isDataStaleChecker(arr.updatedAt) === false) {
      console.log("json 15");
      return NextResponse.json(arr, { status: 200 });
    } else {
      const params = req.nextUrl.searchParams;
      let id = params.get("seoId");
      console.log("xxxxxxapi 15");
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
        console.log("xxxxx43");

        return NextResponse.json(attractions, { status: 200 });
      } else {
        console.log("xxxxx49");

        throw attractions;
      }
    }
  } catch (error) {
    console.error("getAttraction 34 Api error", error);
    return NextResponse.json(error, {
      status: 500,
    });
  }
};
