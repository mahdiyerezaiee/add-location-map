import Map, {Marker, Popup} from "react-map-gl";
import pin from "../form/pin.png";
import './map.sass'
import '../form/form.sass'
import { useSelector} from "react-redux";
import {useState} from "react";
import {Alert, Button, Modal} from "react-bootstrap";
import FormEditLocation from "../form/form-edit";

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const MapShare = () => {
    const mapItem = useSelector((state) => state.form.itemsList)
    const [popup, setPopup] = useState(null)
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setPopup(false)
    }
    function handleShow() {
        setShow(true);
    }
    const clickHandler = (item) => {
        setPopup(item)
    }

    return (
        <div className='map'>
            <Map
                initialViewState={{
                    longitude: 51.404343,
                    latitude: 35.715298,
                    zoom: 11,

                }}
                style={{width: '100vw', height: '80vh'}}

                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken="pk.eyJ1IjoibWFoZGl5ZXJlemFpZWUiLCJhIjoiY2w0Y3MzeXE5MDFoZDNjbm96Z3lrOG5zaCJ9.PRa7LtBR7CJFCO96owJFgA">
                {mapItem.map((item) =>

                    <Marker key={item.id} longitude={item.lng} latitude={item.lat}>
                        <img src={pin} width={50} onClick={() => clickHandler(item)}/>
                    </Marker>
                )}
                {popup ?
                    <Popup className='align-content-end'
                           key={popup.id}
                           longitude={popup.lng}
                           latitude={popup.lat}
                           closeOnClick={false}
                           onClose={() => {
                               setPopup(false)
                           }}
                    >
                        <img src={popup.img} className="w-100 h-100"/>

                        <Alert variant="secondary" className="text-dark mt-3"><h6>name location:{popup.name}</h6>
                        </Alert>
                        <Alert variant="secondary" className="text-dark"><h6>type location :{popup.type}</h6></Alert>
                        <Button onClick={handleShow}>edit</Button>
                        <Modal show={show} onHide={handleClose} animation={false}>
                            <FormEditLocation id={popup.id}/>
                            <Button className='btn-cancel' onClick={handleClose}>back to map</Button>
                        </Modal>
                        <Button onClick={() => {
                            setPopup(false)
                        }}>canncel</Button>
                    </Popup> : null
                }

            </Map>
        </div>
    )
}
export default MapShare