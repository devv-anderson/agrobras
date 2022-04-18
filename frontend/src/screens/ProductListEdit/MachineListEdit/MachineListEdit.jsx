import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from './../../../components/Message/Message'
import Loader from './../../../components/Loader/Loader'
import FormContainer from './../../../components/FormContainer/FormContainer'
import { listLendMachineProductsDetails, updateLendMachine } from './../../../actions/productLendMachinesActions'
import { MACHINE_UPDATE_RESET } from '../../../constants/productConstants'
import Meta from '../../../components/Helmet/Meta'

const SeedListEdit = ({ match }) => {

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [target_plant, setTarget_plant] = useState('')
    const [quantity, setQuantity] = useState('')
    const [machine_power, setMachine_power] = useState('')
    const [uploading, setUploading] = useState(false)

    const productId = match.params.id

    const dispatch = useDispatch()
    let history = useHistory()

    const productLendMachinesDetails = useSelector(state => state.productLendMachinesDetails)
    const { loading, productLendMachines, error } = productLendMachinesDetails

    const LendMachinesUpdate = useSelector(state => state.LendMachinesUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = LendMachinesUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: MACHINE_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {
            if (!productLendMachines.name || productLendMachines._id !== productId) {
                dispatch(listLendMachineProductsDetails(productId))
            } else {
                setName(productLendMachines.name)
                setDescription(productLendMachines.description)
                setPrice(productLendMachines.price)
                setImage(productLendMachines.image)
                setTarget_plant(productLendMachines.target_plant)
                setQuantity(productLendMachines.quantity)
                setMachine_power(productLendMachines.machine_power)
            }
        }
    }, [history, productLendMachines, dispatch, productId, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateLendMachine({
            _id: productId,
            name,
            image,
            price,
            description,
            target_plant,
            quantity,
            machine_power
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
                title="AgroBras | Admin Maquina de colheita Editar"
            />
            <FormContainer>
                <h2 style={{ marginTop: '120px', textAlign: 'center' }}>Maquina de Colheita Perfil</h2>
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
                                    placeholder="Insira um nome"
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
                            <Form.Group controlId='price'>
                                <Form.Label>Preço</Form.Label>
                                <Form.Control
                                    type="price"
                                    placeholder="Insira o preço"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='description'>
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    type="description"
                                    placeholder="Insira a descrição"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId='countInStock'>
                                <Form.Label>Planta Alvo</Form.Label>
                                <Form.Control
                                    type="countInStock"
                                    placeholder="Insira a planta alvo"
                                    value={target_plant}
                                    onChange={(e) => setTarget_plant(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='quantity'>
                                <Form.Label>Quantidade</Form.Label>
                                <Form.Control
                                    type="countInStock"
                                    placeholder="Insira a quantidade"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='machinepower'>
                                <Form.Label>Potencia</Form.Label>
                                <Form.Control
                                    type="machinepower"
                                    placeholder="Insira a potencia"
                                    value={machine_power}
                                    onChange={(e) => setMachine_power(e.target.value)}
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
