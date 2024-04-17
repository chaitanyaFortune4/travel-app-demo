import { getDestinationByIdController } from "@/controllers/apisController";
import { NextResponse } from "next/server";
import fs from "fs";
import { apiList } from "@/utils/constants1";
import path from "path";
import { isDataStaleChecker } from "@/utils/common";

export const POST = async (req) => {
  try {
    const { destinationId } = await req.json();

    const fileName = `${destinationId}.json`;
    const filePath = path.join(`${apiList.fileUploadProductDestinationById}`, fileName);
    if (fs.existsSync(filePath)) {
      const destinationByIdData = fs.readFileSync(
        `${apiList.fileUploadProductDestinationById}/${destinationId}.json`,
        "utf-8"
      );
      let data = JSON.parse(destinationByIdData);
      if (!isDataStaleChecker(data.updatedAt)) {
        return NextResponse.json(data);
      } else {
        const destinationById = await getDestinationByIdController(destinationId);
        let arrData = {
          destinationById,
          updatedAt: new Date()
        }
        fs.writeFile(
          `${apiList.fileUploadProductDestinationById}/${destinationId}.json`,
          JSON.stringify(arrData),
          (err) => {
            if (err) {
              console.error("Error writing file:");
            } else {
              console.log("File written successfully");
            }
          }
        );
        return NextResponse.json({ data: arrData, message: "Data fetched successfully" }, { status: 200 });
      }
    } else {
      const destinationById = await getDestinationByIdController(destinationId);
      let arrData = {
        destinationById,
        updatedAt: new Date()
      }
      fs.writeFile(
        `${apiList.fileUploadProductDestinationById}/${destinationId}.json`,
        JSON.stringify(arrData),
        (err) => {
          if (err) {
            console.error("Error writing file:");
          } else {
            console.log("File written successfully");
          }
        }
      );
      let mainData = {
        data: destinationById,
        message: "Fetch product details successfully"
      }
      return NextResponse.json(mainData, { status: 200 });
    }
  } catch (error) {
    console.error("getDestinationById Api error", error);
    return NextResponse.json(error, {
      status: 500,
    });
  }
};
