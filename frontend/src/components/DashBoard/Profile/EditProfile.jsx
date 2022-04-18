import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from './../../../components/Message/Message'
import Loader from './../../../components/Loader/Loader'
import { getUserDetails, updateUserProfile } from './../../../actions/userActions'
import { listMyOrders } from './../../../actions/orderAction'

const EditProfile = ({ history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cropSelection, setCropSelection] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, user, error } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
                setCropSelection(user.cropSelection)
            }
        }
    }, [userInfo, history, user, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Senhas não combinam')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password, cropSelection }))
        }
    }

    return (
        <Container style={{ marginBottom: '50px', marginTop: '20px' }}>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Perfil Atualizado!</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Row>
                    <Col md={5}>
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
                                type="email"
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
                    <Col md={5}>
                        <Form.Group controlId='password'>
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Insira a senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='confirmPassword'>
                            <Form.Label>Confirme a senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirme a senha"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" variant="primary">Atualizar</Button>
            </Form>
        </Container>
    )
}

export default EditProfile 
