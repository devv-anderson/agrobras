import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Image } from 'react-bootstrap'
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps'
import Message from './../../components/Message/Message'
import Loader from './../../components/Loader/Loader'
import { listSupplierProductsForAll } from './../../actions/supplierProduct'
import MapStyles from './MapStyles'
import Rating from './Rating/Rating'

const Map = () => {

    const dispatch = useDispatch()

    const [selectedPlace, setSelectedPlace] = useState(null)

    const supplierProductForAllList = useSelector(state => state.supplierProductForAllList)
    const { loading: loadingProducts, error: errorProducts, products } = supplierProductForAllList

    useEffect(() => {
        dispatch(listSupplierProductsForAll())
    }, [dispatch])

    return (
        <GoogleMap
            defaultCenter={{ lat: -23.561354, lng: -46.656441 }}
            defaultZoom={10}
            defaultOptions={{ styles: MapStyles }}
        >
            {
                loadingProducts ? <Loader />
                    : errorProducts
                        ? <Message variant='danger'>{errorProducts}</Message>
                        : (
                            products.map(place => (
                                <Marker
                                    key={place._id}
                                    position={{
                                        lat: place.latitude,
                                        lng: place.longitude
                                    }}
                                    onClick={() => {
                                        setSelectedPlace(place)
                                    }}
                                    icon={{
                                        url: '/mapIcon.svg',
                                        scaledSize: new window.google.maps.Size(25, 25)
                                    }}
                                />
                            ))
                        )

            }
            {
                selectedPlace && (
                    <InfoWindow
                        position={{
                            lat: selectedPlace.latitude,
                            lng: selectedPlace.longitude
                        }}
                        onCloseClick={() => {
                            setSelectedPlace(null)
                        }}
                    >
                        <div>
                            <Image className="mx-auto d-block img-fluid mb-1" rounded width="120px" src={selectedPlace.image} alt={selectedPlace.name} />
                            <h4 style={{ textAlign: "center" }}>{selectedPlace.name}</h4>
                            <p>
                                Descrição: {selectedPlace.description}<br />
                                {
                                    selectedPlace.isReviwed
                                        ? (<>
                                            <p><Rating text="Avaliação" value={selectedPlace.rating} /></p>
                                        </>
                                        )
                                        : ''
                                }
                                Telefone: {selectedPlace.phonenumber}<br />
                                Endereço: {selectedPlace.address}
                            </p>
                        </div>
                    </InfoWindow>
                )
            }
        </GoogleMap>

    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default WrappedMap
