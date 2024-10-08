import * as React from "react";
import { NextRequest } from "next/server";

import { ImageResponse } from "@vercel/og";

import { api, apiHost, isDev, rootNotionPageId } from "@/lib/config";
import { NotionPageInfo } from "@/lib/types";

// const interRegularFontP = fetch(
//   new URL("@public/fonts/Inter-Regular.ttf", import.meta.url)
// ).then((res) => res.arrayBuffer());

// const interBoldFontP = fetch(
//   new URL("@public/fonts/Inter-SemiBold.ttf", import.meta.url)
// ).then((res) => res.arrayBuffer());

export const config = {
  runtime: "edge",
};

export default async function OGImage(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pageId = searchParams.get("id") || rootNotionPageId;
  if (!pageId) {
    console.log("Invalid notion page id");
    return new Response("Invalid notion page id", { status: 400 });
  }

  const pageInfoRes = await fetch(`${apiHost}${api.getNotionPageInfo}`, {
    method: "POST",
    body: JSON.stringify({ pageId }),
    headers: {
      "content-type": "application/json",
    },
  });
  console.log(pageInfoRes);
  if (!pageInfoRes.ok) {
    return new Response(pageInfoRes.statusText, { status: pageInfoRes.status });
  }
  const pageInfo: NotionPageInfo = await pageInfoRes.json();
  console.log(pageInfo);

  // const [interRegularFont, interBoldFont] = await Promise.all([
  //   interRegularFontP,
  //   interBoldFontP,
  // ]);

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#1F2027",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: '"Inter", sans-serif',
          color: "black",
        }}
      >
        {pageInfo.image && (
          <img
            src={pageInfo.image}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}

        {pageInfo.authorImage && (
          <div
            style={{
              position: "absolute",
              top: 47,
              left: 104,
              height: 128,
              width: 128,
              display: "flex",
              borderRadius: "50%",
              border: "4px solid #fff",
              zIndex: "5",
            }}
          >
            <img
              src={pageInfo.authorImage}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      // fonts: [
      //   {
      //     name: "Inter",
      //     data: interRegularFont,
      //     style: "normal",
      //     weight: 400,
      //   },
      //   {
      //     name: "Inter",
      //     data: interBoldFont,
      //     style: "normal",
      //     weight: 700,
      //   },
      // ],
    }
  );
}
