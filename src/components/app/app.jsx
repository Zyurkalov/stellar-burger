import React, {useEffect, useState}  from 'react';

import AppHeader from "../header/header"
import AppMain from "../main/main"
import appStyles from "./app.module.css"
import getIngrApi from "../../utils/burger-api"

function App() {

  const [data, setData] = React.useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getIngrApi();
      if (data.success && data.data && data.data.length > 0) {
        setData(data.data);
      } else {
        throw new Error('Что-то не так с полученными данными');
      }
    } catch (error) {
      setError(true);
      console.error('Не удалось загрузить данные с сервера:', error);
    } finally {
      setIsLoading(false);
    }
  };
    fetchData();
    },[])

  return (
    <>
      <AppHeader className={appStyles.header}/>
      <AppMain data={data}/>
    </>
  );
}

export default App;
