import React, {Component} from "react";
import {Col, Panel, Row} from "react-bootstrap";
import PropTypes from 'prop-types';
import './CardComponent.css'
import * as FontAwesome from 'react-icons/lib/fa'
export class CardComponent extends Component{

    constructor(props){
        super(props);
        this.state={
            id:props.details.id,
            pic_url:props.details.featured_image,
            rest_type:'CASUAL DINING',
            rest_name:props.details.name,
            rest_locality:props.details.location.locality,
            rest_address:props.details.location.address,
            rest_cuisines:props.details.cuisines,
            rest_cost_for_2:props.details.average_cost_for_two,
            rest_open_hours:'7AM to 11PM (Mon-Sun)',
            rest_rating:props.details.user_rating.aggregate_rating,
            rest_votes:props.details.user_rating.votes,

            //selection
            selectedPanelClassName:''
        }
    }

    handleSelection = (event) => {
        event.preventDefault();
        console.log("Selected: " + this.state.id);
        if(this.state.selectedPanelClassName===''){
            this.setState({
                selectedPanelClassName:'selected-panel',
            });
            this.props.handleSelection(this.state.id);
        }else{
            this.setState({
                selectedPanelClassName:'',
                selectionId:''
            });
            this.props.handleDeselection(this.state.id);
        }

    };

    deleteSingle = (event) => {
        event.preventDefault();
        this.props.deleteSingle(this.state.id);

    };

    moveToTop = (event) => {
        event.preventDefault();
        this.props.moveToTopSingle(this.state.id);

    };
    render(){
        return(
            <Panel>
                <Panel.Heading className="text-right panel-header">
                    <span><FontAwesome.FaTrash onClick = {this.deleteSingle}/></span>
                    <span><FontAwesome.FaArrowUp onClick = {this.moveToTop}/></span>
                </Panel.Heading>
                <Panel.Body className={this.state.selectedPanelClassName} onClick={this.handleSelection}>
                    <Row>
                        <Col md={3}>
                            <img src={this.state.pic_url} alt="" className="featured-image"/>
                        </Col>
                        <Col md={7}>
                            <div className="type text-left">{this.state.rest_type}</div>
                            <div className="name text-left">{this.state.rest_name}</div>
                            <div className="locality text-left">{this.state.rest_locality}</div>
                            <div className="address text-left">{this.state.rest_address}</div>
                        </Col>
                        <Col md={2}>
                            <p className="rating right">{this.state.rest_rating}</p>
                            <p className="votes text-right">{this.state.rest_votes} votes</p>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col md={3}><div className="sec-label text-left">CUISINES:</div></Col>
                        <Col md={9}><div className="sec-value text-left">{this.state.rest_cuisines}</div></Col>
                    </Row>
                    <Row>
                        <Col md={3}><div className="sec-label text-left">COST FOR TWO:</div></Col>
                        <Col md={9}><div className="sec-value text-left">{this.state.rest_cost_for_2}</div></Col>
                    </Row>
                    <Row>
                        <Col md={3}><div className="sec-label text-left">HOURS:</div></Col>
                        <Col md={9}><div className="sec-value text-left">{this.state.rest_open_hours}</div></Col>
                    </Row>

                </Panel.Body>
                <Panel.Footer>
                    <Row>
                        <Col md={4} className="footer-text divider-right">Call</Col>
                        <Col md={4} className="footer-text divider-right">View Menu</Col>
                        <Col md={4} className="footer-text ">Order Now</Col>
                    </Row>
                </Panel.Footer>
            </Panel>
        )
    }

}


CardComponent.propTypes = {
    details: PropTypes.object,
    handleSelection:PropTypes.func,
    handleDeselection:PropTypes.func,
    deleteSingle:PropTypes.func,
    moveToTopSingle:PropTypes.func,
};