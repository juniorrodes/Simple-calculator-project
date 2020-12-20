import React, { useState, useEffect } from 'react';
import api from '../services/api'
import './Historic.css';

type historicType = {
    operation: string,
    result: string
}

export default function Historic() {
    const [historicList, setHistoricList] = useState<historicType[]>([]);

    useEffect(() => {
        api.get('historic')
            .then((response) => {
                setHistoricList(response.data.map((element: historicType) => element));
                console.log(historicList);
            });
    }, []);

    return(
        <div className='historic-component'>
            {historicList[0] ? <ul>{historicList.map((element) => 
                <li>{element.operation +' = ' + element.result}</li>)}</ul> : null}
        </div>
    );
}