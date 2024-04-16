import { getDestinationByIdController } from "@/controllers/apisController";
import { NextResponse } from "next/server";
import fs from "fs";
import { apiList } from "@/utils/constants";

export const POST = async (req) => {
  try {
    const requestBody = await req.json();
    const destinationByIdData = fs.readFileSync(
      `${apiList.fileUpload}/destinationById.json`,
      "utf-8"
    );
    let readArr = destinationByIdData && JSON.parse(destinationByIdData);
    let check =
      readArr.length > 0 &&
      readArr.filter(
        (item) => item.destinationId === requestBody?.filtering?.destination
      );
    if (Object.keys(check).length === 1) {
      console.log("in json destination by id");
      let ArrOfObj = check[0]?.destinationData;

      return NextResponse.json(ArrOfObj, { status: 200 });
    } else {
      console.log("in Api destination by id");
      const destinationById = await getDestinationByIdController(requestBody);

      const singleData = {
        destinationId: requestBody?.filtering?.destination,
        destinationData: destinationById,
      };
      readArr.length > 0 ? readArr.push(singleData) : (readArr = [singleData]);
      const jsonData = JSON.stringify(readArr);

      if (destinationById.status) {
        fs.writeFile(
          `${apiList.fileUpload}/destinationById.json`,
          jsonData,
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
  } catch (error) {
    console.error("getDestinationById Api error", error);
    return NextResponse.json(error, {
      status: 500,
    });
  }
};
