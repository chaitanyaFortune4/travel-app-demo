import { getProductdetailsByID } from "@/controllers/apisController";
import { NextResponse } from "next/server";
import fs from "fs";
import path from 'path';
import { apiList } from "@/utils/constants1";
import { isDataStaleChecker } from "@/utils/common";

export const GET = async (req) => {
    try {
        const params = req.nextUrl.searchParams;
        let id = params.get("query");
        const fileName = `${id}.json`;
        const filePath = path.join(`${apiList.fileUploadProduct}`, fileName)
        if (fs.existsSync(filePath)) {
            const destinationData = fs.readFileSync(
                `${apiList.fileUploadProduct}/${id}.json`,
                "utf-8"
            );
            let data = JSON.parse(destinationData)
            if (!isDataStaleChecker(data.updatedAt)) {
                return NextResponse.json(data)
            } else {
                let data = await getProductdetailsByID(req);
                let resData = {
                    data,
                    updatedAt: new Date()
                }
                fs.writeFile(`${apiList.fileUploadProduct}/${id}.json`, JSON.stringify(resData), (err) => {
                    if (err) {
                        console.error("Error writing file:", err);
                    } else {
                        console.log("File written successfully");
                    }
                });
                let arrData = {
                    data: data,
                    message: "Fetch product details successfully"
                }
                return NextResponse.json(arrData, { status: 200 });
            }
        } else {
            let data = await getProductdetailsByID(req);
            let resData = {
                data,
                updatedAt: new Date()
            }
            fs.writeFile(`${apiList.fileUploadProduct}/${id}.json`, JSON.stringify(resData), (err) => {
                if (err) {
                    console.error("Error writing file:", err);
                } else {
                    console.log("File written successfully");
                }
            });
            let arrData = {
                data: data,
                message: "Fetch product details successfully"
            }
            return NextResponse.json(arrData, { status: 200 });
        }
    } catch (err) {
        console.log("err", err);
        return NextResponse.json(err, { status: 500 });
    }
};
