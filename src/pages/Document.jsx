import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getDocument } from "../services/document";

const Document = () => {
    const { id } = useParams()
    const [document, setDocument] = useState()

    useEffect(() => {
        getDocument(id).then(setDocument)
    }, [id])

    useEffect(() => {
        console.log(document)
    }, [document])

    return (
        <main>
            <h1 style={{ textAlign: 'center' }}>{document?.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: document?.text }}>
            </div>
        </main>
    );
};

export default Document;