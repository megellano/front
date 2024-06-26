import React, { useCallback, useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';




const Form = () => {

  const [country, setCountry] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lico, setLico] = useState('physic');

  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      country,
      firstname,
      lico
    }

    tg.sendData(JSON.stringify(data))

  }, [country, firstname, lico])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData])

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Отправить'
    })
  }, [])

  useEffect(() => {
    if (!firstname || !country) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, firstname])

  const onChangeCountry = (e) => {
    setCountry(e.target.value)
  }

  const onChangeFirstname = (e) => {
    setFirstname(e.target.value)
  }

  const onChangeLico = (e) => {
    setLico(e.target.value)
  }

  return (
    <div className={"form"}>
      <h3>Введите ваши данные</h3>
      <input
        className='input'
        type="text"
        placeholder={"Страна"}
        name="country"
        value={country}
        onChange={onChangeCountry}
      />
      <input className='input' type="text" placeholder={"Имя"} name="firstname" value={firstname} onChange={onChangeFirstname} />
      <select className='select' name="lico" value={lico} onChange={onChangeLico}>
        <option value={'physic'}>Физ. лицо</option>
        <option value={'legal'}>Юр. лицо</option>
      </select>
    </div>
  );
}

export default Form;