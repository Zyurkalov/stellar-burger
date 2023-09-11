import styles from "./app.module.css";
import { data } from "../../utils/data";

import AppHeader from "../header/header"
import AppMain from "../main/main"
import appStyles from "./app.module.css"

function App() {
  return (
    <div>
      <AppHeader className={appStyles.header}/>
      <AppMain data={data}/>
    </div>
  );
}

export default App;
