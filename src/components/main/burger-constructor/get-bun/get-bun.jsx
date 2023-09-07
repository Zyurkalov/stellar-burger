import React, {useEffect} from 'react'
import {
  CurrencyIcon,
  Button,
  LockIcon,
  DeleteIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "../burger-constructor.module.css";
import newStyle from "./get-bun.module.css";

function GetBun({ bun, seeAnalysis, bordStyle}) {

  let props = {
    "_id":"60666c42cc7b410027a1a9b1",
    "name":"Краторная булка N-200i",
    "type":"bun",
    "proteins":80,
    "fat":24,
    "carbohydrates":53,
    "calories":420,
    "price":30,
    "image":"https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v":0
  };
  if (bun.props !== undefined) {
    props = bun.props;
  }

  return (

    <li
      key={props._id}
      className={`mb-4 ${style.component} ${newStyle.cart_component}`}
      onClick={() => seeAnalysis(props)}
    >
      <DragIcon style={{ display: 'none' }} />
      <div className={`${style.cart} ${bordStyle ? newStyle.cart_borderUp : newStyle.cart_borderBt}`}>
        <img
          src={props.image_mobile}
          className={style.image}
          alt={props.name}
        />
        <div className={`${newStyle.descrCont}`}>
          <h3 className={`text text_type_main-default ${style.cardName} `}>
          {props.name}
          </h3>
          <p className={`text text_type_main-default`}>
            {bordStyle ? '(верх)' : '(низ)'}
          </p>
        </div>
        <div className={`${style.price}`}>
          <p className={"text text_type_digits-default"}>
            {props.price}
          </p>
          <CurrencyIcon />
        </div>
        <LockIcon type="secondary"/>
      </div>
    </li>
  );
}

export default GetBun
