import { NextResponse } from "next/server";

export const POST = async (req) => {
  const requestBody = await req.json();
  const response = await fetch(
    `${process.env.VIATOR_BASEURL}/partner/products/search`,
    {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        "exp-api-key": process.env.VIATOR_API_KEY,
        "Accept-Language": "en-IN",
        Accept: "application/json;version=2.0",
      },
    }
  );

  const resp = await response.json();

  return NextResponse.json(resp, { status: 200 });
};
