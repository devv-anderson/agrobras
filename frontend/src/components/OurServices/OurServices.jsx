import React from 'react'
import { Col, Container, Row, Image } from 'react-bootstrap'
import './ourSerices.css'

const OurServices = () => {
    return (
        <Container className="main" fluid>
            <h1 className="main-title">NOSSOS SERVIÇOS</h1>

            <Container className="services">
                <Row>
                    <Col md={3}>
                        <h5 className="sub-title">Maquinas pesadas</h5>
                        <Image className="img" src="images/services/heavy.svg" fluid />
                        <p className="sub-desc">Venha conheçer as melhores maquinas para plantio e colheita disponiveis no mercado.</p>
                    </Col>
                    <Col md={3}>
                        <h5 className="sub-title">Jardinagem</h5>
                        <Image className="img" src="images/services/gardening.svg" fluid />
                        <p className="sub-desc">Possuimos todos os produtos para jardinagem, sementes, pesticidads e fertilizantes.</p>
                    </Col>
                    <Col md={3}>
                        <h5 className="sub-title">Vendedor</h5>
                        <Image className="img" src="images/services/supplier.svg" fluid />
                        <p className="sub-desc">Agora você produz e nos vendemos seus produtos, apenas oferte e seja pago por isso.</p>
                    </Col>
                    <Col md={3}>
                        <h5 className="sub-title">Consumidor</h5>
                        <Image className="img" src="images/services/consumer.svg" fluid />
                        <p className="sub-desc">Por que pagar mais caro em supermercados? faça já seus pedidos e receba na sua porta.</p>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default OurServices
