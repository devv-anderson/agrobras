import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from './../Message/Message'
import Loader from './../Loader/Loader'
import FormContainer from './../FormContainer/FormContainer'
import { updateSupplierProduct, getroductsDetails } from './../../actions/supplierProduct'
import { SUPPLIER_PRODUCT_UPDATE_RESET } from './../../constants/supplierConstant'
import Meta from '../Helmet/Meta'

const SupplierProductEdit = ({ match }) => {

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [cropSelection, setCropSelection] = useState('')
    const [storage, setStorage] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [uploading, setUploading] = useState(false)

    const productId = match.params.id

    const dispatch = useDispatch()
    let history = useHistory()

    const FarmerProductDetails = useSelector(state => state.FarmerProductDetails)
    const { loading, product, error } = FarmerProductDetails

    const farmerProductUpdate = useSelector(state => state.farmerProductUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = farmerProductUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: SUPPLIER_PRODUCT_UPDATE_RESET })
            history.push('/profile')
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(getroductsDetails(productId))
            } else {
                setName(product.name)
                setDescription(product.description)
                setEmail(product.email)
                setAddress(product.address)
                setImage(product.image)
                setCropSelection(product.cropSelection)
                setStorage(product.storage)
                setPhonenumber(product.phonenumber)
            }
        }
    }, [history, product, dispatch, productId, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateSupplierProduct({
            _id: productId,
            name,
            email,
            address,
            cropSelection,
            storage,
            image,
            phonenumber,
            description
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
                title="AgroBras | Vendedor"
            />
            <FormContainer>
                <h2 style={{ marginTop: '100px', textAlign: 'center' }}>Product Profile</h2>
                <Link to='/profile' className='btn btn-light my-3'>
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
                            <Form.Group controlId='address'>
                                <Form.Label>Endereço <span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    type="address"
                                    as="textarea" rows={1}
                                    placeholder="Insira um endereço"
                                    value={address}
                                    required
                                    onChange={(e) => setAddress(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='cropSelection'>
                                <Form.Label>Categoria <span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    type="cropSelection"
                                    placeholder="Ex: fruta, semente"
                                    value={cropSelection}
                                    required
                                    onChange={(e) => setCropSelection(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='storage'>
                                <Form.Label>Preço <span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    type="storage"
                                    placeholder="Insira o preço"
                                    value={storage}
                                    required
                                    onChange={(e) => setStorage(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId='image'>
                                <Form.Label>Imagem <span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Insira uma imagem"
                                    value={image}
                                    required
                                    onChange={(e) => setImage(e.target.value)}
                                ></Form.Control>
                                <Form.File
                                    id='image-file'
                                    label='Escolher arquivo'
                                    custom
                                    onChange={uploadFileHandler}
                                ></Form.File>
                                {uploading && <Loader />}
                            </Form.Group>
                            <Form.Group controlId='phonenumber'>
                                <Form.Label>Numero de telefone<span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    type="phonenumber"
                                    placeholder="Insira o numero de telefone"
                                    value={phonenumber}
                                    required
                                    onChange={(e) => setPhonenumber(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='description'>
                                <Form.Label>Descrição <span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    as="textarea" rows={3}
                                    type="description"
                                    placeholder="Insira uma descrição"
                                    value={description}
                                    required
                                    onChange={(e) => setDescription(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <br />
                            <Button type="submit" variant="primary">Enviar</Button>
                        </Col>
                    </Row>
                </Form>
            </FormContainer>
        </Container>
    )
}

export default SupplierProductEdit 
