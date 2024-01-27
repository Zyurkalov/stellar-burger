import { TType } from "../../types"
import { TSwitchTab } from "./types"
import { SWITCH_TAB } from "../../constatnts/actions"

export const switchTab = (tab:TType):TSwitchTab  => ({
    type: SWITCH_TAB,
    value: tab
})