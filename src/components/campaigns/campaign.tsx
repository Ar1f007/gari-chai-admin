import { TCarCampaign } from "@/schemas/campaign";
import { PLACEHOLDER_IMAGE } from "@/utils/constants";
import Image from "next/image";
import extDayjs from "@/lib/dayjs";
import { Badge } from "../ui/badge";
import ActionBtn from "./action-btns";

const Campaign = ({ campaign }: { campaign: TCarCampaign }) => {

  const isRunning =
    extDayjs().isAfter(extDayjs(campaign.startDate)) &&
    extDayjs().isBefore(extDayjs(campaign.endDate));

  return (
    <div className="flex flex-col gap-4 bg-card rounded-lg shadow-lg overflow-hidden relative border">
      {isRunning && (
        <div className="absolute top-2 left-2 z-10">
          <Badge variant="default" className="px-3 py-1 text-xs">
            Running
          </Badge>
        </div>
      )}

      <div className="relative w-full h-[200px]">
        <Image
          src={campaign.posterImage?.originalUrl ?? PLACEHOLDER_IMAGE}
          alt={campaign.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
          <h2 className="text-white text-lg font-semibold">
            {campaign.title}
          </h2>
          {campaign.tagline && (
            <p className="text-white text-sm">{campaign.tagline}</p>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div className="flex justify-between items-center text-sm text-foreground font-medium">
          <div>
            <span>Start: </span>
            <time>
              {extDayjs(campaign.startDate).format("MMM D, YYYY h:mm A")}
            </time>
          </div>
          <div>
            <span>End: </span>
            <time>
              {extDayjs(campaign.endDate).format("MMM D, YYYY h:mm A")}
            </time>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Badge variant="outline">
              Total Cars: {campaign.usedCars.length + campaign.newCars.length}
            </Badge>
            <Badge
              variant={campaign.isActive ? "default" : "destructive"}
              className="capitalize"
            >
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
