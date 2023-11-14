import {useState} from "react"

// этот хук можно использовать для изменении значении инпутов
// и изменения состояния для кнопки submit

export const useInput = (initialState) => {
    const [input, setInput] = useState(initialState);
    const [active, setActive] = useState(false);
  
    const changedInput = (bool) => {
      setActive(bool);
    };
  
    // const modifiedInput = (event) => {
    //   const key = event.target.name;
    //   setInput({ ...input, [key]: event.target.value });
    //   setActive(true);
    // };

    const modifiedInput = (event) => {
      const key = event.target.name;
      const length = event.target.value.length;
      setInput({ ...input, [key]: event.target.value });
      if (length <= 0) {
        setActive(false);
      } else {
        setActive(true);
      }
    };
  
    return [input, setInput, changedInput, active, modifiedInput];
  };
