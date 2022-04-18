import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Col, Container, Row, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { getroductsDetails, createProductReview } from './../../actions/supplierProduct'
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import Meta from '../../components/Helmet/Meta';

const FarmerProduct = ({ history, match }) => {

    const userId = match.params.id

    const dispatch = useDispatch()

    const FarmerProductDetails = useSelector(state => state.FarmerProductDetails)
    const { loading, error, product } = FarmerProductDetails

    const farmerReviewCreate = useSelector(state => state.farmerReviewCreate)
    const { loading: loadingReview, error: loadingError, success: successReview } = farmerReviewCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    useEffect(() => {

        if (successReview) {

        } else {
            if (!product.name || product._id !== userId) {
                dispatch(getroductsDetails(userId))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, match, successReview, history, userId])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating,
            comment,
        }))
    }

    return (
        <div className="productScreen">
            <Meta
                title="AgroBras | Admin Agricultor Revisão"
            />
            <Container>
                <Link className="btn btn-go-back btn-dark" to="/admin/supplierproducts">VOLTAR</Link>
                {
                    loading
                        ? <Loader />
                        : error
                            ? <Message variant='danger'>{error}</Message>
                            : (
                                <Row className="p-1 seed-product" >
                                    <Col md={5}>
                                        <Image className="mx-auto image-machine" src={product.image} alt={product.name} width={200} />
                                    </Col>
                                    <Col md={4}>
                                        <ListGroup className="borderless" variant='flush'>
                                            <ListGroup.Item>
                                                <h4>Nome </h4>{product.name}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <h4>Endereço </h4> {product.address}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <h4>Descrição do Produto<br /></h4> {product.description}
                                            </ListGroup.Item>
                                            {
                                                product.phonenumber ? (
                                                    <ListGroup.Item>
                                                        <h4> Numero de Contato<br /></h4>
                                                        <a rel="noreferrer" target='_blank' href={`https://wa.me/${product.phonenumber}`}>
                                                            {product.phonenumber}
                                                        </a>
                                                    </ListGroup.Item>
                                                ) : ''
                                            }
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col md={6}>
                                                        <h4>Categoria </h4>{product.cropSelection}
                                                    </Col>
                                                    {
                                                        product.storage ? (
                                                            <Col md={6}>
                                                                <h4>Quantidade </h4>{product.storage} kg
                                                            </Col>
                                                        ) : ''
                                                    }
                                                </Row>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                    <Col md={3}>
                                        <Card>
                                            <ListGroup>
                                                <ListGroup.Item>
                                                    <p>Escreva uma avaliação para o agricultor</p>
                                                    {successReview && (
                                                        <Message variant='success'>
                                                            Avalização Enviado com Sucesso
                                                        </Message>
                                                    )}
                                                    {loadingReview && <Loader />}
                                                    {loadingError && (
                                                        <Message variant='danger'>{loadingError}</Message>
                                                    )}
                                                    {userInfo && userInfo.isAdmin ? (
                                                        <Form onSubmit={submitHandler}>
                                                            <Form.Group controlId='rating'>
                                                                <Form.Label>Nota</Form.Label>
                                                                <Form.Control
                                                                    as='select'
                                                                    value={rating}
                                                                    onChange={(e) => setRating(e.target.value)}
                                                                >
                                                                    <option value=''>Selecione...</option>
                                                                    <option value='1'>1 - Pessimo</option>
                                                                    <option value='2'>2 - Ruim</option>
                                                                    <option value='3'>3 - Bom</option>
                                                                    <option value='4'>4 - Muito Bom</option>
                                                                    <option value='5'>5 - Excelente</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                            <Form.Group controlId='comment'>
                                                                <Form.Label>Comentario</Form.Label>
                                                                <Form.Control
                                                                    as='textarea'
                                                                    row='3'
                                                                    value={comment}
                                                                    onChange={(e) => setComment(e.target.value)}
                                                                ></Form.Control>
                                                            </Form.Group>
                                                            <Button
                                                                disabled={loadingReview}
                                                                type='submit'
                                                                variant='primary'
                                                            >Enviar</Button>
                                                        </Form>
                                                    ) : (
                                                            <Message>
                                                                Por favor <Link to='/login'>entre</Link> para escrever uma avaliação{' '}
                                                            </Message>
                                                        )}
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card>
                                    </Col>
                                </Row>
                            )
                }
            </Container>
        </div>
    )
}

export default FarmerProduct