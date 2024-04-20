"use client";
import AttractionWrapper from "@/components/AttractionComponent/AttractionWrapper";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const seoId = searchParams.get("seo");
  
  return (
    <div>
      <AttractionWrapper seoId={seoId} />
    </div>
  );
};

export default Page;
