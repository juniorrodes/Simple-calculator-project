import React, { useState } from 'react';
import Calculator from './Calculator';
import './App.css';

export default function App(){

    const [isCalculatorVisible, setIsCalculatorVisible] = useState(true);

    return(
        <div className='component-app'>
            {isCalculatorVisible ? <Calculator /> : false}
        </div>
    );
}