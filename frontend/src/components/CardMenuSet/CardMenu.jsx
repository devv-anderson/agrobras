import React from 'react'
import { Container, Row, Card, CardDeck, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './CardMenuStyles.css'

const CardMenu = () => {
    return (
        <Container><Row>
            <CardDeck className='card-deck'>
                <Card border='primary'>
                    <Card.Body>
                        <Card.Title className='title'>Agricultor</Card.Title>
                        <Card.Text className='card-text'>Se você é um agricultor, essa é a plataforma perfeita para encomendar todos os seus produtos relacionados à agricultura.</Card.Text>
                        <Link to='/farmer'>
                            <Button variant="success" className="btn-explore btn-md m-2">VER MAIS</Button>
                        </Link>
                    </Card.Body>
                </Card>
                <Card border='primary'>
                    <Card.Body>
                        <Card.Title className='title'>Vendedor</Card.Title>
                        <Card.Text className='card-text'>
                            Agora ficou mais simples e facil ofertar sua variedade de produtos, faça isso atraves de nossa plataforma.         
                        </Card.Text>
                        <Link to='login?redirect=supplier'>
                            <Button variant="success" className="btn-explore btn-md m-2">VER MAIS</Button>
                        </Link>
                    </Card.Body>
                </Card>
                <Card border='primary'>
                    <Card.Body>
                        <Card.Title className='title'>Consumidor</Card.Title>
                        <Card.Text className='card-text'>
                           Não há necessidade de ir até o campo para obter grãos, basta encomendar aqui e receba na comodidade do seu lar.
                        </Card.Text>
                        <Link to='/consumer'>
                            <Button variant="success" className="btn-explore btn-md m-2">VER MAIS</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </CardDeck>
        </Row></Container>
    )
}

export default CardMenu
