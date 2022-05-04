import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from './../../components/CheckoutSteps/CheckoutSteps'
import FormContainer from '../../components/FormContainer/FormContainer'
import { savePaymentMethod } from './../../actions/cartActions.js'
import Meta from '../../components/Helmet/Meta'

const PaymentScreen = ({ history }) => {

    const cart = useSelector(state => state.cartSeed)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <div style={{ marginTop: '100px' }}>
            <FormContainer>
                <Meta
                    title="AgroBras | Pagamento"
                />
                <CheckoutSteps step1 step2 step3 />
                <h1>Metodo de Pagamento</h1>
                <Form onSubmit={submitHandler} style={{ marginBottom: '40px' }}>
                    <Form.Group>
                        <Form.Label as='legend'>Selecione o Metodo</Form.Label>

                        <Col>
                            <Form.Check
                                type='radio'
                                label='Paypal ou cartão de credito'
                                id='paypal'
                                name='paymentMethod'
                                value='PayPal'
                                checked
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            ></Form.Check>
                            <Form.Check
                                type='radio'
                                label='Stripe'
                                id='Stripe'
                                name='paymentMethod'
                                value='Stripe'
                                checked
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            ></Form.Check>
                        </Col>
                    </Form.Group>
                    <Button type='submit'>Continuar</Button>
                </Form>
            </FormContainer>
        </div>
    )
}

export default PaymentScreen
