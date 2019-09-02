import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import dataJSON from '../../DataJSON/data.json';
import Styled from "./style";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this._groupDataByRoomType(),
            visible: false,
            details: {},
        };
    }

    componentDidMount() {
        console.log("data", this.state.data)
    }

    _groupDataByRoomType = () => {
        const groupBy = key => array =>
            array.reduce((objectsByKeyValue, obj) => {
                const value = obj[key];
                objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
                return objectsByKeyValue;
            }, {});
        const groupByRoomType = groupBy('roomTypeLabel');
        return groupByRoomType(dataJSON.data)
    }

    _showDetails = (d) => {
        this.setState({
            visible: true,
            details: d
        }, () => {
            console.log("details", this.state.details)
        })
    }

    _hideModal = () => {
        this.setState({
            visible: false
        })
    }

    render() {
        const { data, details } = this.state;

        return (
            <Styled>
                <Container>
                    <h3> Hotel Room Booking </h3>
                    <div className="hotel-booking">
                        {Object.keys(data).map((d, i) => {
                            return (
                                <Row key={i} className="">
                                    <Col xl={3} ><b>{d}</b></Col>
                                    <Col xl={9}>
                                        {data[d].map((d, i) => {
                                            return (
                                                <div key={i} className="d-flex mb-2">
                                                    <p className="bedType">
                                                        <span className="d-block"><b>Bed Type</b></span>
                                                        <span className="d-block">- {d.bedTypeLabel}</span>
                                                    </p>
                                                    <p className="breakfast">
                                                        <span className="d-block"><b>Breakfast </b></span>
                                                        <span className="d-block" >{d.boardCodeDescription.length !== 0 ? (
                                                            d.boardCodeDescription

                                                        ) : "-"}</span></p>
                                                    <p className="price d-xl-flex align-items-center">
                                                        <span className="mb-1 pr-2"><b>RM {d.price}</b></span>
                                                        <Button onClick={() => this._showDetails(d)}>Details</Button>
                                                    </p>
                                                </div>
                                            )
                                        })}
                                    </Col>
                                </Row>
                            )
                        })}
                    </div>
                </Container>
                <Modal
                    show={this.state.visible}
                    onHide={this._hideModal}
                >
                    <Modal.Header>
                        <Modal.Title>Room Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {JSON.stringify(details) !== JSON.stringify({}) && (
                            <Row>
                                <Col>
                                    <p><b>Room Type:</b> {details.roomTypeLabel}</p>
                                    <p><b>Bed Type : </b>{details.bedTypeLabel}</p>
                                    <p><b>Breakfast:</b> {details.boardCodeDescription.length !== 0 ? details.boardCodeDescription : "-"}</p>
                                    <p><b>Price:</b> RM {details.price}</p>
                                </Col>
                            </Row>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this._hideModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Styled>
        );
    }
}
export default Home