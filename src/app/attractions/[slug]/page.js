"use client";
import AttractionWrapper from "@/components/AttractionComponent/AttractionWrapper";
import { useSearchParams } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const seoId = searchParams.get("seo");
  
  return (
    <div>
      <AttractionWrapper seoId={seoId} />
    </div>
  );
};

export default page;
