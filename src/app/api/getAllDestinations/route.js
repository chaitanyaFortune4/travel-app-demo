import { getAllDestinationsController } from "@/controllers/apisController";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  //   const params = req.nextUrl.searchParams;
  //   let textData = params.get("query");
  try {
    const destinations = await getAllDestinationsController();
    if (destinations.status) {
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
