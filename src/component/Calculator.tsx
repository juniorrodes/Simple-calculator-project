import ButtonPanel from "./ButtonPanel";
import api from '../services/api';
import Display from './Display';
import React, { useState } from "react";
import "./Calculator.css";

function isNumber(item: any) {
  return /[0-9]+/.test(item);
};

function updateNumber(firstNumber: string | null, setfirstNumber: Function, buttonName: string){
  if(firstNumber === null){
    setfirstNumber(buttonName);
  } else if(firstNumber === '0'){
    setfirstNumber(buttonName);
  } else {
    setfirstNumber(firstNumber + buttonName);
  }
};

function errorMessage(message: string){
  alert(message);
}

function request(equation: any, setTotal: Function, setFirstNumber: Function, setSecondNumber: Function,
  operation: string, setOperation?: Function){
  api.post(operation, equation)
    .then((response) => {
      setTotal(response.data.result);
      setSecondNumber(response.data.result);
      setFirstNumber(null);
      if(setOperation){
        setOperation(null);
      }
    })
    .catch(() => {
      errorMessage('Ocorreu um erro na operação.');
    });
}

function calculate(equation: any, operation: string | null, 
  setFirstNumber: Function, setSecondNumber: Function, setTotal: Function, setOperation?: Function){
  if(operation === '+'){
    request(equation, setTotal, setFirstNumber, setSecondNumber, 'addition', setOperation);
  } else if (operation === '-'){
    request(equation, setTotal, setFirstNumber, setSecondNumber, 'subtraction', setOperation);
  } else if (operation === 'x'){
    request(equation, setTotal, setFirstNumber, setSecondNumber, 'multiplication', setOperation);
  } else if (operation === '÷'){
    request(equation, setTotal, setFirstNumber, setSecondNumber, 'division', setOperation);
  }
};

export default function Calculator(){

  const [total, setTotal] = useState<null | string>(null);
  const [firstNumber, setFirstNumber] = useState<null | string>(null);
  const [operation, setOperation] = useState<null | string>(null);
  const [secondNumber, setSecondNumber] = useState<null | string>(null);

  const handleClick = (buttonName: string) => {
    if(isNumber(buttonName) || (buttonName === '.')){
      if((operation === null) && (firstNumber === null)){
        setTotal(null);
      }
      updateNumber(firstNumber, setFirstNumber, buttonName);
    } else if(buttonName === 'AC'){
      setTotal(null);
      setFirstNumber(null);
      setOperation(null);
    } else{
      if(buttonName === '='){
        const equation = {
          firstNumber: firstNumber,
          secondNumber: secondNumber
        };
        calculate(equation, operation, setFirstNumber, setSecondNumber, setTotal, setOperation);
      } else{
        if(operation && (firstNumber != null)){
          const equation = {
            firstNumber: firstNumber,
            secondNumber: secondNumber,
            operation: operation
          };
          calculate(equation, operation, setFirstNumber, setSecondNumber, setTotal);
        }
        if(total && (firstNumber === null)){
          setSecondNumber(total);
          setTotal(null);
          setOperation(buttonName);
        } else if (operation == null){
          setFirstNumber(null);
          setSecondNumber(firstNumber);
          setOperation(buttonName);
        }
      }
    }
  };

  return (
    <div className="component-calculator">
      <Display value={firstNumber || total || "0"}/>
      <ButtonPanel clickHandler={handleClick} />
    </div>
  );
}