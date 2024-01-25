import { TType } from "../../types"

export const SWITCH_TAB: 'SWITCH_TAB' = 'SWITCH_TAB'
export type TSwitchTab = {
    readonly type: typeof SWITCH_TAB,
    readonly value: TType
}
export const switchTab = (tab:TType):TSwitchTab  => ({
    type: SWITCH_TAB,
    value: tab
})