import { ProfileNavigation } from "./navigation/navigation"
import { Outlet } from "react-router-dom"

import style from "./profile.module.css"

export function ProfileComponent() {
    return (
        <div className={style.сontainer}>
            <ProfileNavigation />
            <Outlet />
        </div>
    )
}