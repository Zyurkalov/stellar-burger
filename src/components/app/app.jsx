import styles from "./app.module.css";
import { data } from "../../utils/data";

import AppHeader from "../header/header"
import AppMain from "../main/main"
import appStyles from "./app.module.css"

function App() {
  return (
    // <div className={styles.app}>
    //   <pre style={{
    //   	margin: "auto",
    //   	fontSize: "1.5rem"
    //   }}>
    //   	Измените src/components/app/app.jsx и сохраните для обновления.
    //   </pre>
    // </div>
    <body>
      <AppHeader className={appStyles.header}/>
      <AppMain />
    </body>
  );
}

export default App;
