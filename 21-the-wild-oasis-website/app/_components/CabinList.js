import CabinCard from "@/app/_components/CabinCard"
import { getCabins } from "@/app/_lib/data-service";
import { unstable_noStore as noStore } from "next/cache";

async function CabinList({ filter }) {
  noStore();

  const cabins = await getCabins();

  if (!cabins.length) return null;

  let displayedCabins;

  switch (filter) {
    case 'small':
      displayedCabins = cabins.filter((cabin) => {
        return cabin.maxCapacity <= 3
      })
      break;
    case 'medium':
      displayedCabins = cabins.filter((cabin) => {
        return cabin.maxCapacity > 3 && cabin.maxCapacity < 8
      })
      break;
    case 'large':
      displayedCabins = cabins.filter((cabin) => {
        return cabin.maxCapacity >= 8
      })
      break;
    default:
      displayedCabins = cabins;
      break;
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  )
}

export default CabinList
