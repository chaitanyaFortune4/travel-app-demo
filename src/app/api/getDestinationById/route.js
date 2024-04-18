import { getDestinationByIdController } from "@/controllers/apisController";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const requestBody = await req.json();
    const destinationById = await getDestinationByIdController(requestBody);

    if (destinationById.status) {
      return NextResponse.json(destinationById, { status: 200 });
    } else {
      throw destinationById;
    }
  } catch (error) {
    console.error("getDestinationById Api error", error);
    return NextResponse.json(error, {
      status: 500,
    });
  }
};
