import { NextResponse } from "next/server";

export const GET = async (req) => {
  //   const params = req.nextUrl.searchParams;
  //   let textData = params.get("query");
  try {
    const response = await fetch(
      `${process.env.VIATOR_BASEURL}/partner/v1/taxonomy/destinations`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          "exp-api-key": process.env.VIATOR_API_KEY,
          "Accept-Language": "en-IN",
        },
      }
    );

    const resp = await response.json();
    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.error("An error occurred while fetching data", {
      status: 500,
    });
  }
};
