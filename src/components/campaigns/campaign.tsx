import { TCarCampaign } from "@/schemas/campaign";
import { PLACEHOLDER_IMAGE } from "@/utils/constants";
import Image from "next/image";
import extDayjs from "@/lib/dayjs";

const Campaign = ({ campaign }: { campaign: TCarCampaign }) => {
  return (
    <div className="flex flex-col gap-5 items-center justify-between bg-input rounded-md p-4 box-border shadow-md">
      <Image
        src={campaign.posterImage?.originalUrl ?? PLACEHOLDER_IMAGE}
        alt={campaign.title}
        width={400}
        height={200}
        className="rounded w-auto h-[200px] max-h-[200px] object-cover"
      />

      <h2 className="text-center capitalize">{campaign.title}</h2>
      <div className="flex flex-col gap-3 w-full items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium leading-none">Start:</span>
          <time className="text-sm font-medium leading-none">
            {extDayjs(campaign.startDate).format("MMM D, YYYY h:mm A")}
          </time>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium leading-none">End:</span>
          <time className="text-sm font-medium leading-none">
            {extDayjs(campaign.endDate).format("MMM D, YYYY h:mm A")}
          </time>
        </div>
      </div>
    </div>
  );
};
export default Campaign;
