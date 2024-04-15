import { getAllDestinationsController } from "@/controllers/apisController";
import { NextResponse } from "next/server";
import fs from "fs";

export const GET = async (req) => {
  //   const params = req.nextUrl.searchParams;
  //   let textData = params.get("query");
  try {
    // let destinationData ;
    // let destinationData = fs.readFile('public/json/allDestination.json', 'utf8', (err, data) => {
    //   if (err) {
    //     console.error('Error reading file:', err);
    //     return;
    //   }
    // });
    const destinationData = fs.readFileSync('Accounts.json', 'utf-8');
    console.log("00000", destinationData);
    const destinations = await getAllDestinationsController();
    if (destinations.status) {
      const maindata = JSON.stringify(destinations);
      fs.writeFile(`public/json/allDestination.json`, maindata, (err) => {
        if (err) {
          console.error('Error writing file:', err);
        } else {
          console.log('File written successfully');
        }
      });
      return NextResponse.json(destinations, { status: 200 });
    } else {
      throw destinations;
    }
  } catch (error) {
    console.error("getAllDestination Api error", error);
    return NextResponse.json(error, {
      status: 500,
    });
  }
};

