import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getDocument} from "../services/document";

const Document = () => {
    const { id } = useParams()
    const [document, setDocument] = useState()

    useEffect(()=>{
        getDocument(id).then(setDocument)
    }, [])

    useEffect(()=>{
        console.log(document)
    }, [document])

    return (
        <div>
            документы {id}
        </div>
    );
};

export default Document;