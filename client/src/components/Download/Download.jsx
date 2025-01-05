import React from 'react';
import { useParams } from 'react-router-dom';
import { downloadFile }  from '../../actions/file';
import './download.css';

function Download() {
    const { id } = useParams();
    setTimeout(() => downloadFile(id), 0)
    return (
        <div className="download">
            <h1>Загрузка...</h1>
        </div>
    )
}

export default Download;