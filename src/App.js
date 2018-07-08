import React, {Component} from 'react';
import './App.css';
import {SearchComponent} from "./components/search/SearchComponent";
import {CardComponent} from "./components/card/CardComponent";
import {Col, Row} from "react-bootstrap";
import {ToolComponent} from "./components/tool/ToolComponent";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            API_URL: "https://developers.zomato.com/api/v2.1/search",
            search_results_count: 0,
            search_results:'',
            error:'',
            selection_list:[]
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Restaurant Search</h1>
                </header>
                <p/>
                <Row>
                    <Col md={6} mdOffset={3}>
                        <Row>
                            <Col md={8}><SearchComponent searchHandle={this.searchRestaurant}/></Col>
                            <Col md={4}><ToolComponent deleteHandle = {this.deleteSelection}
                                                       bringToTopHandle = {this.bringToTopSelection}/></Col>
                        </Row>
                    </Col>
                </Row>
                {this.state.search_results_count === 0 ? this.showNoResultsFound() : this.showResults()}
            </div>
        );
    }

    deleteSelection = ()=>{
        console.log("deleting selection");
        let modifiedResults = this.state.search_results.filter(result => {
                return !this.state.selection_list.includes(result.restaurant.id)
            }
        );
        this.setState({
            search_results:modifiedResults,
            selection_list:[]
        })
    };

    bringToTopSelection = ()=>{
        console.log("bringing to top selection");
        let modifiedResults = this.state.search_results;
        console.log("Modified" + JSON.stringify(modifiedResults));
        let resultsToBeMoved = this.state.search_results.filter(result => {
                return this.state.selection_list.includes(result.restaurant.id)
            }
        );
        modifiedResults = this.state.search_results.filter(result => {
                return !this.state.selection_list.includes(result.restaurant.id)
            }
        );
        resultsToBeMoved.forEach(x =>{
            modifiedResults.unshift(x)
        });
        this.setState({
            search_results:modifiedResults,
            selection_list:[]
        })

    };


    searchRestaurant = (restaurantName) => {
        console.log("Searching for " + restaurantName);
        fetch(this.state.API_URL + "?q=" + restaurantName + "&?count=15", {
            method: "GET",
            headers: {
                'user-key': 'fa151c6d43f10c5eaa43e09cfa03673c',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                this.handleResponse(response)
            })
            .catch(error => {
                this.handleError(error)
            })
    };

    handleResponse = (response) => {
        console.log("Handling response:");
        this.setState({
            search_results_count: response.results_found,
            search_results:response.restaurants
        });

    };

    handleError = (error) => {
        console.log("Handling error: " + JSON.stringify(error));
        this.setState({
            search_results_count: 0,
            search_results:''
        })
    };

    showNoResultsFound() {
        // return(
        //     <h2 className="search-result-header">No results found:</h2>
        // )
    }

    addToSelectionList = (id) =>{
        let selectionList = this.state.selection_list;
        selectionList.push(id);
        this.setState({
            selection_list:selectionList
        })
    };

    removeFromSelectionList = (id) => {
        let selectionList = this.state.selection_list;
        let index = selectionList.indexOf(id);
        if(index>-1){
            selectionList.splice(index,1);
        }
        this.setState({
            selection_list:selectionList
        })
    };

    showResults() {
        return(
            <div>
                <Row>
                    <Col md={6} mdOffset={3}>
                        <h3 className="search-result-header">Search Results:</h3>
                    </Col>
                </Row>
                <div className="container">
                    {this.state.search_results.map((x) => {
                        return(
                            <Row>
                                <Col md={6} mdOffset={3}>
                                    <CardComponent key = {x.restaurant.id}
                                                   details = {x.restaurant}
                                                   deleteSingle = {this.deleteSingle}
                                                   moveToTopSingle = {this.moveToTopSingle}
                                                   handleSelection = {this.addToSelectionList}
                                                   handleDeselection = {this.removeFromSelectionList}/>
                                </Col>
                            </Row>
                        )
                    })}
                </div>
            </div>
        )
    }

    deleteSingle = (id) =>{
        let modifiedResults = this.state.search_results.filter(result => {
            return (result.restaurant.id !== id)
            }
        );
        this.setState({
            search_results:modifiedResults,
            selection_list:[]
        })
    };

    moveToTopSingle = (id) =>{
        let modifiedResults = this.state.search_results;
        console.log("Modified" + JSON.stringify(modifiedResults));
        let resultsToBeMoved = this.state.search_results.filter(result => {
                return (result.restaurant.id === id)
            }
        );
        modifiedResults = this.state.search_results.filter(result => {
            return (result.restaurant.id !== id)
            }
        );
        resultsToBeMoved.forEach(x =>{
            modifiedResults.unshift(x)
        });
        this.setState({
            search_results:modifiedResults,
            selection_list:[]
        })

    }
}

export default App;
