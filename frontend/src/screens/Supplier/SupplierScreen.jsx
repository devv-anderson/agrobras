import React from 'react'
import { Container } from 'react-bootstrap';
import Meta from '../../components/Helmet/Meta';
import AddSupplierProduct from '../../components/SupplierProduct/AddSupplierProduct';
import './supplierStyles.css'

const SupplierScreen = () => {
    return (
        <Container className='supplierContainer'>
            <Meta
                title="AgroBras | Vendedor"
            />
            <h1 className='title'>VENDEDOR</h1>
            <h4 className="supplier-title">
                Venda seus produtos atraves da melhor plataforma da atualidade, temos agricultores conectados de todas as partes do Brasil.
            </h4>
            <br />
            <AddSupplierProduct />
        </Container>
    )
}

export default SupplierScreen