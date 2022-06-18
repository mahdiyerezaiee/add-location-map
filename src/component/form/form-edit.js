import {useState} from "react";
import Map, {Marker} from 'react-map-gl';
import pin from "./pin.png"
import {useDispatch, useSelector} from "react-redux";
import {formActions} from "../../store/form-slice";
import './form.sass'
import {Button, Modal, Form} from "react-bootstrap";

/**
 *
 * @param id
 * @returns {JSX.Element}
 * @constructor
 */
const FormEditLocation = ({id}) => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [logo, setLogo] = useState('')
    const [type, setType] = useState('')
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [img, setImg] = useState()
    const handleClick = e => {
        setLat(e.lngLat.lat)
        setLng(e.lngLat.lng)
    }
    // const id = mapItem.map((item)=>item.id)
    const onImageChange = (e) => {
        const [file] = e.target.files;
        setImg(URL.createObjectURL(file));
    };
    const shareHandler = (e) => {
        e.preventDefault()
        dispatch(formActions.editMapItem({
            id,
            name,
            img,
            type,
            lat,
            lng,
        }))
        setName("")
        setLogo("")
        setType("")
    }
    return (
        <div className="">
            <div className="modal_form">
                <Form className="row">
                    <label className="col-6 mt-12">location name : </label>
                    <Form.Control
                        required
                        className="col-6 mt-2"
                        name='name'
                        type='name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <br/>
                    <label className="col-6 mt-3"> location map: </label>
                    <div className="map-form col-6 mt-1">
                        <Map
                            initialViewState={{
                                longitude: 51.404343,
                                latitude: 35.715298,
                                zoom: 11,

                            }}
                            mapStyle="mapbox://styles/mapbox/streets-v9"
                            mapboxAccessToken="pk.eyJ1IjoibWFoZGl5ZXJlemFpZWUiLCJhIjoiY2wzcjE1eTN4MWFrbzNwbDJycXZjZmh6YyJ9.5mYj5EwRGi47qZwx5_5yzQ"
                            onClick={handleClick}>
                            <Marker longitude={lng}
                                    latitude={lat}>
                                <img src={pin} width={50}/>
                            </Marker>

                        </Map>
                    </div>
                    <label className="col-6 mt-2">location Type:</label>
                    <Form.Select
                        required
                        className="col-6 mt-2"
                        value={type}
                        onChange={e => setType(e.target.value)}>
                        <option>Open this select menu</option>
                        <option>business</option>
                        <option>home</option>
                    </Form.Select>
                    <label className="col-6 mt-2">location Logo:</label>
                    <Form.Control
                        required
                        type="file"
                        className="col-6 mt-2"
                        value={''}
                        onChange={onImageChange}
                    />
                </Form>
                <Button onClick={shareHandler} className="mt-3 d-inline-block w-25 float-end">save</Button>
                {/*<Button  onClick={handleClose} className='d-inline-block w-25 float-end'>cancel</Button>*/}

            </div>
        </div>
    )
}
export default FormEditLocation