import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    Form,
    Button,
    Container,
    Row,
    Col
} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from './../../../components/Message/Message'
import Loader from './../../../components/Loader/Loader'
import FormContainer from './../../../components/FormContainer/FormContainer'
import { listSeedProductsDetails, updateSeedProducts } from './../../../actions/productSeedActions'
import { SEED_UPDATE_RESET } from '../../../constants/productConstants'
import Meta from '../../../components/Helmet/Meta'

const SeedListEdit = ({ match }) => {

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [uploading, setUploading] = useState(false)

    const productId = match.params.id

    const dispatch = useDispatch()
    let history = useHistory()

    const prodcutSeedDetails = useSelector(state => state.prodcutSeedDetails)
    const { loading, productSeed, error } = prodcutSeedDetails

    const seedUpdate = useSelector(state => state.seedUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = seedUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: SEED_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {
            if (!productSeed.name || productSeed._id !== productId) {
                dispatch(listSeedProductsDetails(productId))
            } else {
                setName(productSeed.name)
                setDescription(productSeed.description)
                setPrice(productSeed.price)
                setCategory(productSeed.category)
                setImage(productSeed.image)
                setCountInStock(productSeed.countInStock)
            }
        }
    }, [history, productSeed, dispatch, productId, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateSeedProducts({
            _id: productId,
            name,
            image,
            description,
            category,
            price,
            countInStock
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)

        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    return (
        <Container style={{ marginBottom: '50px' }}>
            <Meta
                title="AgroBras | Admin Semente Editar"
            />
            <FormContainer>
                <h2 style={{ marginTop: '120px', textAlign: 'center' }}>Semente Perfil</h2>
                <Link to='/admin/productlist' className='btn btn-light my-3'>
                    VOLTAR
                </Link>
                {loading && <Loader />}
                {error && <Message variant='danger'>{error}</Message>}
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {successUpdate && <Message variant='success'>Perfil Atualizado!</Message>}
                <Form onSubmit={submitHandler}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId='name'>
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="name"
                                    placeholder="Insira o nome"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='image'>
                                <Form.Label>Imagem</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Insira uma imagem"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                ></Form.Control>
                                <Form.File
                                    id='image-file'
                                    label='Escolher Arquivo'
                                    custom
                                    onChange={uploadFileHandler}
                                ></Form.File>
                                {uploading && <Loader />}
                            </Form.Group>
                            <Form.Group controlId='description'>
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    type="description"
                                    placeholder="Insira uma descrição"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId='category'>
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control
                                    type="category"
                                    placeholder="Insira a categoria"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='price'>
                                <Form.Label>Preço</Form.Label>
                                <Form.Control
                                    type="price"
                                    placeholder="Insira o preço"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='countInStock'>
                                <Form.Label>Quantidade em estoque</Form.Label>
                                <Form.Control
                                    type="countInStock"
                                    placeholder="Insira a quantidade em estoque"
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Button type="submit" variant="primary">Atualizar</Button>
                        </Col>
                    </Row>
                </Form>
            </FormContainer>
        </Container>
    )
}

export default SeedListEdit 
