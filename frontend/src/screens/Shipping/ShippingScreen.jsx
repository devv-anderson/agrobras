import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from './../../components/CheckoutSteps/CheckoutSteps'
import FormContainer from '../../components/FormContainer/FormContainer'
import { saveShippingAddress } from './../../actions/cartActions.js'
import Meta from '../../components/Helmet/Meta'

const ShippingScreen = ({ history }) => {

    const cart = useSelector(state => state.cartSeed)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }

    return (
        <div style={{ marginTop: '100px' }}>
            <FormContainer>
                <Meta
                    title="AgroBras | Envio"
                />
                <CheckoutSteps step1 step2 />
                <h1>Envio</h1>
                <Form onSubmit={submitHandler} style={{ marginBottom: '40px' }}>
                    <Form.Group controlId='address'>
                        <Form.Label>Endereço <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Insira um endereço"
                            value={address}
                            required
                            onChange={(e) => setAddress(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='city'>
                        <Form.Label>Cidade <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Insira uma cidade"
                            value={city}
                            required
                            onChange={(e) => setCity(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='postalCode'>
                        <Form.Label>CEP <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Insira um CEP"
                            value={postalCode}
                            required
                            onChange={(e) => setPostalCode(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='country'>
                        <Form.Label>Pais <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Insira o pais"
                            value={country}
                            required
                            onChange={(e) => setCountry(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type='submit'>Continar</Button>
                </Form>
            </FormContainer>
        </div>
    )
}

export default ShippingScreen
