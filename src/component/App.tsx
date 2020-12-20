import React, { useState } from 'react';
import Calculator from './Calculator';
import Historic from './Historic'
import './App.css';

export default function App(){

    const [isCalculatorVisible, setIsCalculatorVisible] = useState(true);
    
    return(
        <div className='component-app'>
            <div className='component-app-calc-button'>
                <button onClick={() => {setIsCalculatorVisible(true)}}>Calculadora</button>
            </div>
            <div className='component-app-history-button'>
                <button onClick={() => {setIsCalculatorVisible(false)}}>Histórico</button>
            </div>
            {isCalculatorVisible ? <Calculator /> : <Historic />}
        </div>
    );
}