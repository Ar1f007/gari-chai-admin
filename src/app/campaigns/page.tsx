import { Fragment } from "react";
import PageContainer from "@/components/layout/page-container";
import PageHeader from "@/components/layout/page-header.tsx";
import { getAllCarCampaigns } from "@/services/campaign/car-campaign";
import Campaign from "@/components/campaigns/campaign";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const AllCampaigns = async () => {
  const campaigns = await getAllCarCampaigns();

  function getContent(res: Awaited<ReturnType<typeof getAllCarCampaigns>>) {
    if (!res.data || res.data.length == 0) {
      return (
        <Alert className="max-w-md mx-auto">
          <AlertTitle className="flex gap-2 items-center">
            <InfoIcon />
            {!res.data ? res.message : "No Campaigns Added Yet"}
          </AlertTitle>
        </Alert>
      );
    }

    return (
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {res.data.map((campaign) => (
          <li key={campaign._id}>
            <Campaign
              key={campaign._id}
              campaign={campaign}
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <Fragment>
      <PageHeader>All Campaigns</PageHeader>

      <PageContainer>{getContent(campaigns)}</PageContainer>
    </Fragment>
  );
};
export default AllCampaigns;
