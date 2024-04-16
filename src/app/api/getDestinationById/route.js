import { getDestinationByIdController } from "@/controllers/apisController";
import { NextResponse } from "next/server";
import fs from "fs";
import { apiList } from "@/utils/constants";

export const POST = async (req) => {
  try {
    const requestBody = await req.json();
    let jsonData;
    try {
      const destinationByIdData = fs.readFileSync(
        `${apiList.fileUpload}/destinationById.json`,
        "utf-8"
      );
      jsonData = JSON.parse(destinationByIdData);
    } catch (error) {
      jsonData = [];
    }
    if (Array.isArray(jsonData)) {
      let arr = jsonData.find(
        (v) => v.destinationId === requestBody?.filtering?.destination
      );
      if (arr) {
        // console.log("in json destination by id");
        let ArrOfObj = arr.destinationData;

        return NextResponse.json(ArrOfObj, { status: 200 });
      } else {
        // console.log("in Api destination by id");
        const destinationById = await getDestinationByIdController(requestBody);

        const singleData = {
          destinationId: requestBody?.filtering?.destination,
          destinationData: destinationById,
        };

        jsonData.push({ ...singleData });
        if (destinationById.status) {
          fs.writeFile(
            `${apiList.fileUpload}/destinationById.json`,
            JSON.stringify(jsonData),
            (err) => {
              if (err) {
                console.error("Error writing file:");
              } else {
                console.log("File written successfully");
              }
            }
          );
          return NextResponse.json(destinationById, { status: 200 });
        } else {
          throw destinationById;
        }
      }
    } else {
      console.error("Data is not an array:", jsonData);
      return NextResponse.json(
        { error: "Data is not an array" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("getDestinationById Api error", error);
    return NextResponse.json(error, {
      status: 500,
    });
  }
};
