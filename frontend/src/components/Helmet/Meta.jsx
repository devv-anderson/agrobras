import React from 'react'
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
           <title>{title}</title> 
           <meta name='description' content={description} />
           <meta name='keyword' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Bem vindo ao AgroBras',
    description: 'Eccomerce voltado a agricultores e clientes domesticos de todo o brasil',
    keywords: 'agricultura, agricultor, departamento de agricultura'
}

export default Meta
