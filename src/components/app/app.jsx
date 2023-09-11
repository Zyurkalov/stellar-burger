
import React, {useEffect, useState}  from 'react';

import AppHeader from "../header/header"
import AppMain from "../main/main"
import appStyles from "./app.module.css"

function App() {

  const API_URL = "https://norma.nomoreparties.space/api/ingredients";
  const [data, setData] = React.useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error('Ответ с сервера не получен')
        }
        const fetchObj = await res.json();
        if (fetchObj.success && fetchObj.data && fetchObj.data.length > 0) {
          
          setData(fetchObj.data);
        }else{
          throw new Error('Что то не так с полученными данными')
        }
      } catch(error) {
        setError(true)
        console.error('Не удалось загрузить данные с сервера:', error)
      } finally {
        setIsLoading(false)
      }
    }
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
