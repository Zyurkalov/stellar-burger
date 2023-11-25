import { ProfileInputList } from "./input-list/input-list"
import { ProfileNavigation } from "./navigation/navigation"
import { useDispatch } from "react-redux"
import {useEffect} from 'react'
import { getUser } from "../../service/actions/user-auth"
import style from "./profile.module.css"

export function ProfileComponent() {
    // const { userData } = useSelector((state) => state.userStatus);
    const dispatch = useDispatch()

    useEffect(() => {
      if (!sessionStorage.name || !sessionStorage.email) {
        dispatch(getUser())
      }
    }, []);

    return (
        ((sessionStorage.name || sessionStorage.email) &&
        <div className={style.сontainer}>
            <ProfileNavigation />
            <ProfileInputList />
        </div>)
    )
}