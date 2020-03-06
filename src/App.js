import React, { useState, useEffect } from 'react';

import Button from './components/Button/Button';
import commafy from './utils/commafy';

import './App.css';
import './global.css';

// TODO: 1. solve the commafy value, when typed a number and do some operator, when we click on '=',
// and show total, if yout type again, you will be typing directly on display.
// TODO: 2. when typed an operator it shows '0', solve to keep the value on display then show total on display.
// TODO: 3. adjust useEffect to keep updating the hours.

const App = () => {
  const [ time, setTime ] = useState(new Date());
  const [ value, setValue ] = useState(0);
  const [ memory, setMemory ] = useState(null);
  const [ operator, setOperator ] = useState(null);

  useEffect(() => {
    const handleTime = () => {
      setTime(new Date());
    }
    handleTime();
  }, []);

  const handleButton = (content) => () => {
    let num = parseFloat(value);

    if (content === 'AC') {
      setValue('0');
      setMemory(null);
      setOperator(null);
      return;
    };

    if (content === '+/-') {
      setValue((num * -1).toString());
      return;
    };

    if (content === '%') {
      setValue((num / 100).toString());
      setMemory(null);
      setOperator(null);
      return;
    };

    if (content === '/' || content === 'x' || content === '-' || content === '+') {
      if (operator !== null) {
        if (operator === "+") {
          setMemory(memory + num);
        } else if (operator === "-") {
          setMemory(memory - num);
        } else if (operator === "x") {
          setMemory(memory * num);
        } else if (operator === "/") {
          setMemory(memory / num);
        }
      } else {
        setMemory(num);
      }
      setOperator(content);
      setValue(0)
      return;
    };

    if (content === "=") {
      if (!operator) return;
      
      if (operator === "+") {
        setValue((memory + num).toString());
      } else if (operator === "-") {
        setValue((memory - num).toString());
      } else if (operator === "x") {
        setValue((memory * num).toString());
      } else if (operator === "/") {
        setValue((memory / num).toString());
      }
      setMemory(null);
      setOperator(null);
      return;
    };

    setValue(parseFloat(num + content).toString());
  };

  return (
    <div className="App">
      <div className="top">
        <div className="time">
          {time.getUTCHours().toString().padStart(2, '0')}:
          {time.getUTCMinutes().toString().padStart(2, '0')}
        </div>
        <div>@LucasReinaldo</div>
      </div>
      <div className="display">{commafy(value)}</div>
      <div className="buttons">
        <Button onButtonClick={handleButton} content="AC" type="function"/>
        <Button onButtonClick={handleButton} content="+/-" type="function"/>
        <Button onButtonClick={handleButton} content="%" type="function"/>
        <Button onButtonClick={handleButton} content="/" type="operator"/>
        <Button onButtonClick={handleButton} content="7" />
        <Button onButtonClick={handleButton} content="8" />
        <Button onButtonClick={handleButton} content="9" />
        <Button onButtonClick={handleButton} content="x" type="operator"/>
        <Button onButtonClick={handleButton} content="4" />
        <Button onButtonClick={handleButton} content="5" />
        <Button onButtonClick={handleButton} content="6" />
        <Button onButtonClick={handleButton} content="-" type="operator"/>
        <Button onButtonClick={handleButton} content="1" />
        <Button onButtonClick={handleButton} content="2" />
        <Button onButtonClick={handleButton} content="3" />
        <Button onButtonClick={handleButton} content="+" type="operator"/>
        <Button onButtonClick={handleButton} content="0" />
        <Button onButtonClick={handleButton} content="." />
        <Button onButtonClick={handleButton} content="=" type="operator"/>
      </div>
      <div className="bottom"></div>
    </div>
  );
}

export default App;
