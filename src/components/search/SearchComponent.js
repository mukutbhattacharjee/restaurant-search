import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './SearchComponent.css';
import {Button, Col, FormControl, Row} from "react-bootstrap";

export class SearchComponent extends Component {

    handleSearchStringChange = (event) => {
        event.preventDefault();
        this.setState({
            searchString: event.target.value
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            searchString: '',
            selectionIndexArray: []
        }
    }

    search = (event) => {
        event.preventDefault();
        console.log("passing to handler method")
        this.props.searchHandle(this.state.searchString);
    }

    deleteItem = (event) => {
        event.preventDefault();
        console.log("Deleting an item")
    }

    render() {
        return (

            <Row>
                <Col md={9}>
                    <form>
                        <FormControl
                            type="text"
                            value={this.state.value}
                            placeholder="Search a restaurant"
                            onChange={this.handleSearchStringChange}
                        />
                    </form>
                </Col>
                <Col md={3}>
                    <Button bsStyle="primary"
                            className="btn-block"
                            onClick={this.search}>Search</Button>
                </Col>
            </Row>

        )
    }
}

SearchComponent.propTypes = {
    searchHandle: PropTypes.func
};