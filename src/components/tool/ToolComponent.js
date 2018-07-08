import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './ToolComponent.css';
import {Button, Col, Row} from "react-bootstrap";

export class ToolComponent extends Component {


    bringToTop = (event) =>{
        event.preventDefault();
        this.props.bringToTopHandle();
    };

    deleteSelection = (event) =>{
        event.preventDefault();
        this.props.deleteHandle();

    };

    render() {
        return (

            <Row>
                <Col md={6}>
                    <Button bsStyle="primary" className="btn-block" onClick={this.bringToTop}>Bring to top</Button>
                </Col>
                <Col md={6}>
                    <Button bsStyle="danger" className="btn-block"
                            onClick={this.deleteSelection}>Delete</Button>
                </Col>
            </Row>

        )
    }
}

ToolComponent.propTypes = {
    deleteHandle: PropTypes.func,
    bringToTopHandle: PropTypes.func,
};