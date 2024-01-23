import { TType } from "../../Types"

export const SWITCH_TAB: 'SWITCH_TAB' = 'SWITCH_TAB'
export type TSwitchTab = {
    readonly type: typeof SWITCH_TAB,
    readonly value: TType
}
export const switchTab = (tab:TType) => ({
    type: SWITCH_TAB,
    value: tab
})