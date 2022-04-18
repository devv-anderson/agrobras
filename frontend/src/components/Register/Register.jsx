import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message/Message'
import Loader from '../Loader/Loader'
import FormContainer from '../FormContainer/FormContainer'
import { register } from '../../actions/userActions'
import Meta from '../Helmet/Meta'

const Register = ({ location, history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cropSelection, setCropSelection] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, userInfo, error } = userRegister
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [userInfo, history, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Senhas não conferem')
        } else {
            dispatch(register(name, email, password, cropSelection))
        }
    }

    return (

        <FormContainer>
            <Meta
                title="AgroBras | Cadastrar"
            />
            <h1 style={{ marginTop: '120px' }}>Cadastrar</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId='name'>
                            <Form.Label>Nome <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Insira o nome"
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>E-mail <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="nic"
                                placeholder="Insira o e-mail"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='cropSelection'>
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control
                                type="cropSelection"
                                placeholder="Ex: fruta, semente"
                                value={cropSelection}
                                onChange={(e) => setCropSelection(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId='password'>
                            <Form.Label>Senha <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Insira a senha"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='confirmPassword'>
                            <Form.Label>Confirme a senha <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirme a senha"
                                value={confirmPassword}
                                required
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="primary">Cadastrar</Button>
                    </Col>
                </Row>
            </Form>
            <Row className='py-3'>
                <Col style={{ marginBottom: '30px' }}>
                    Ja possui uma conta? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Entrar</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default Register
