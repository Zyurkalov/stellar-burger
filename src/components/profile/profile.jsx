import { ProfileInputList } from "./input-list/input-list"
import { ProfileNavigation } from "./navigation/navigation"

import style from "./profile.module.css"

export function ProfileComponent() {

    return (
        <div className={style.сontainer}>
            <ProfileNavigation />
            <ProfileInputList />
        </div>
    )
}