import { Library } from "@/features/library";
import { getServerAssets } from "@/features/library/server-data";

export const dynamic = "force-dynamic";

export default function Home() {
  return <Library assets={getServerAssets()} />;
}
