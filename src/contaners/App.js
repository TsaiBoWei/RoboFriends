import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { robots } from '../Robots';
import Cardlist from '../components/Cardlist';
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import'./App.css';

import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch( setSearchField(event.target.value) ),
        //onRequsetRobots: () => requestRobots(dispatch)
        // same with
        onRequsetRobots: () => dispatch(requestRobots())
    }
}

class App extends Component {

    // a part of react > don't use as function
    componentDidMount() {
        this.props.onRequsetRobots();
    }
    
    render() {
        const { searchField, onSearchChange, robots, isPending } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });

        return isPending ?
        <h1>Loading</h1> :
        (
            <div className='tc'>
                <h1 className='f2'>RoboFriends</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                        <Cardlist robots={filteredRobots} />
                    </ErrorBoundry>                    
                </Scroll>
            </div>              
        );        
    }    
};

export default connect(mapStateToProps, mapDispatchToProps)(App);