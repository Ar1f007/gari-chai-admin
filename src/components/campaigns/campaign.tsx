import { TCarCampaign } from "@/schemas/campaign";
import { PLACEHOLDER_IMAGE } from "@/utils/constants";
import Image from "next/image";
import extDayjs from "@/lib/dayjs";
import { Badge } from "../ui/badge";
import ActionBtn from "./action-btns";

const Campaign = ({ campaign }: { campaign: TCarCampaign }) => {
  return (
    <div className="flex flex-col gap-5 items-center justify-between bg-input rounded-md box-border shadow-md overflow-hidden pb-6">
      <Image
        src={campaign.posterImage?.originalUrl ?? PLACEHOLDER_IMAGE}
        alt={campaign.title}
        width={400}
        height={200}
        className="w-full h-[200px] max-h-[200px] object-cover"
      />

      <div className="px-4 flex flex-col gap-5">
        <h2 className="text-center capitalize font-medium text-sm">
          {campaign.title}
        </h2>

        {/* CAMPAIGN DATE */}
        <div className="flex justify-between gap-3 w-full items-center">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-primary leading-none">
              Start:
            </span>
            <time className="text-xs font-semibold text-primary leading-none">
              {extDayjs(campaign.startDate).format("MMM D, YYYY h:mm A")}
            </time>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-primary leading-none">
              End:
            </span>
            <time className="text-xs font-semibold text-primary leading-none">
              {extDayjs(campaign.endDate).format("MMM D, YYYY h:mm A")}
            </time>
          </div>
        </div>
        {/* CAMPAIGN DATE */}

        <div className="flex gap-2 justify-between flex-wrap items-center">
          <div className="space-x-2">
            <Badge>
              Total Cars: {campaign.usedCars.length + campaign.newCars.length}
            </Badge>

            <Badge variant={campaign.isActive ? "default" : "destructive"}>
              {campaign.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>

          <ActionBtn campaign={campaign} />
        </div>
      </div>
    </div>
  );
};
export default Campaign;
