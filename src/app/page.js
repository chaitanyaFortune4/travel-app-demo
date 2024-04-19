import Search from "@/components/SearchComponent/search";
import { getAllDestinations } from "@/services/apiServices";
export default async function Home() {
  const allDestinations = await getAllDestinations();

  return (
    <>
      <Search data={allDestinations.data.data} />
    </>
  );
}
