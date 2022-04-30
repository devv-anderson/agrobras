import React, { useState, useEffect, useRef } from 'react'
import { Form, Button, Row, Col, Container, Table, Image, Overlay, Popover } from 'react-bootstrap'
import { Scrollbar } from "react-scrollbars-custom";
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from './../../components/Message/Message'
import Loader from './../../components/Loader/Loader'
import { getUserDetails, updateUserProfile } from '../../actions/userActions'
import { listMyOrders } from './../../actions/orderAction'
import { listMyProducts } from './../../actions/supplierProduct'
import Meta from '../../components/Helmet/Meta';

const ProfileScreen = ({ history }) => {

    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

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

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    const supplierProdictListMy = useSelector(state => state.supplierProdictListMy)
    const { loading: loadingProducts, error: errorProducts, products } = supplierProdictListMy

    useEffect(() => {

        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
                dispatch(listMyProducts())
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
            setMessage('Senham não combinam')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password, cropSelection }))
        }
    }

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);

    };


    return (
        <Container fluid style={{ marginBottom: '50px' }}>
            <Meta
                title="AgroBras | Perfil"
            />
            <Row>
                <Col md={3}>
                    <h2 style={{ marginTop: '110px' }}>Perfil</h2>
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {success && <Message variant='success'>Perfil Atualizado!</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Nome <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Insira um nome"
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>E-mail <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="nic"
                                placeholder="Insira um e-mail"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Insira uma senha"
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
                        <Button type="submit" variant="primary">Atualizar</Button>
                    </Form>
                </Col>
                <Col md={9}>
                    <Scrollbar style={{ width: '100%', height: 630 }}>
                        <Container fluid>
                            <Row>
                                <h2 style={{ marginTop: '110px' }}>Meus Pedidos</h2>
                                {loadingOrders ? <Loader />
                                    : errorOrders ? <Message variant="danger">{errorOrders}</Message>
                                        : (
                                            <Table striped bordered hover responsive className="table-sm">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>DATA</th>
                                                        <th>TOTAL</th>
                                                        <th>PAGO</th>
                                                        <th>ENVIADO</th>
                                                        <th>MAIS</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orders.map(order => (
                                                        <tr key={order._id}>
                                                            <td>{order._id}</td>
                                                            <td>{order.createdAt.substring(0, 10)}</td>
                                                            <td>{order.totalPrice}</td>
                                                            <td>{order.isPaid ? order.paidAt.substring(0, 10) :
                                                                <i className="fas fa-times" styles={{ color: "red" }}></i>
                                                            }</td>
                                                            <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) :
                                                                <i className="fas fa-times" styles={{ color: 'red' }}></i>
                                                            }</td>
                                                            <td>
                                                                <LinkContainer to={`/order/${order._id}`}>
                                                                    <Button className="btn-sm" variant="success">Detalhes</Button>
                                                                </LinkContainer>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        )
                                }
                            </Row>
                            <Row>
                                <h2 style={{ marginTop: '110px' }}>Meus Produtos</h2>
                                {loadingProducts ? <Loader />
                                    : errorProducts ? <Message variant="danger">{errorProducts}</Message>
                                        : (
                                            <Table striped bordered hover responsive className="table-sm">
                                                <thead>
                                                    <tr>
                                                        <th>NOME</th>
                                                        <th>E-MAIL</th>
                                                        <th>ENDEREÇO</th>
                                                        <th>IMAGEM</th>
                                                        <th>CATEGORIA</th>
                                                        <th>REVISADO</th>
                                                        <th>EDITAR</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {products.map(product => (
                                                        <tr key={product._id}>
                                                            <td>{product.name}</td>
                                                            <td>{product.email}</td>
                                                            <td>{product.address}</td>
                                                            <td>
                                                                <Image width={70} rounded src={product.image} />
                                                            </td>
                                                            <td>{product.cropSelection}</td>
                                                            <td style={{ textAlign: "center" }}>
                                                                {
                                                                    product.isReviwed ? (
                                                                        <Button
                                                                            className="mt-2"
                                                                            ref={target}
                                                                            onClick={handleClick}
                                                                        > Check
                                                                        </Button>
                                                                    ) : <i className="fas fa-times" style={{ color: 'red', fontSize: '24px' }}></i>
                                                                }
                                                                <Overlay
                                                                    show={show}
                                                                    target={target}
                                                                    placement="bottom"
                                                                    container={ref.current}
                                                                    containerPadding={10}
                                                                >
                                                                    <Popover id="popover-contained">
                                                                        <Popover.Title as="h3">Avaliação: {product.rating}</Popover.Title>
                                                                        {
                                                                            product.reviews.map(review => (
                                                                                <Popover.Content key={review._id}>
                                                                                    <strong>Comentario: {review.comment}</strong>
                                                                                </Popover.Content>
                                                                            ))
                                                                        }
                                                                    </Popover>
                                                                </Overlay>
                                                            </td>
                                                            <td>
                                                                <LinkContainer to={`/supplierproducts/${product._id}/edit`}>
                                                                    <Button variant="light" className="btn btn-sm">
                                                                        <i className="fas fa-edit"></i>
                                                                    </Button>
                                                                </LinkContainer>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        )
                                }
                            </Row>
                        </Container>
                    </Scrollbar>
                </Col>
            </Row>
        </Container>
    )
}

export default ProfileScreen 
