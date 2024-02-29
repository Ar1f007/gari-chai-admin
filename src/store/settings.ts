import { TCarCampaign } from "@/schemas/campaign";
import { IS_CLIENT } from "@/utils/constants";
import { proxy } from "valtio";

import { devtools } from "valtio/utils";

export type TSettingsStore = {
  selectedCampaign: TCarCampaign | null;
};

const initialState: TSettingsStore = {
  selectedCampaign: null,
};

export const settingsStore = proxy<TSettingsStore>(initialState);

export const settingsActions = {
  setCampaign(campaign: TCarCampaign) {
    settingsStore.selectedCampaign = campaign;
  },
};

devtools(settingsStore, {
  name: "settings",
  enabled: IS_CLIENT,
});
