import React from 'react'
import { Container, Row, CardDeck, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import Meta from '../../components/Helmet/Meta';
import './FarmerStyle.css'

const FarmerScreen = () => {
    return (
        <div>
            <Meta
                title="AgroBras | Agricultor"
            />
            <Container className='farmerContainer'>
                <h1 className='title'>AGRICULTOR</h1>
                <h4 className="farmer-title">Se você é um agricultor, você está na plataforma perfeita, aqui você pode encomendar todos os seus produtos relacionados à agricultura e também vender sua produção.</h4>
                <Row className="row-one justify">
                    <CardDeck>
                        <Card border="primary" style={{ width: '25rem' }}>
                            <Card.Body>
                                <Card.Title className="card-titile">Sementes, pesticidas e fertilizantes</Card.Title>
                                <LinkContainer to="/farmers/purchaseSeeds">
                                    <Button className="btn-explore btn-md m-2">VER MAIS</Button>
                                </LinkContainer>
                            </Card.Body>
                        </Card>
                        <Card border="primary" style={{ width: '25rem' }}>
                            <Card.Body>
                                <Card.Title className="card-titile">Venda seus produtos atraves da plataforma</Card.Title>
                                <LinkContainer to="/login?redirect=supplier">
                                    <Button className="btn-explore btn-md m-2">VER MAIS</Button>
                                </LinkContainer>
                            </Card.Body>
                        </Card>
                        <Card border="primary" style={{ width: '25rem' }}>
                            <Card.Body>
                                <Card.Title className="card-titile">Maquinario de plantio e colheita</Card.Title>
                                <LinkContainer to="/farmers/lendMachines">
                                    <Button className="btn-explore btn-md m-2">VER MAIS</Button>
                                </LinkContainer>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                </Row>
            </Container>
        </div>
    )
}

export default FarmerScreen
