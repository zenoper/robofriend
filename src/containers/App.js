import React, { Component } from 'react';
import Cardlist from '../components/Cardlist';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css'
import ErrorBoundry from '../components/ErrorBoudry'

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchField: ''
        }
    }
    /////frfrfrfrfrfrfrfr////////////

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=> {
               return response.json();
            })
            .then(users=> {
                this.setState({ robots: users})
            });
    }

    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value })
    }

    render() {
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLocaleLowerCase().includes(this.state.searchField.toLocaleLowerCase())
        })

        if ( this.state.robots.length === 0) {
            return <h1 className='tc'>Loading</h1>
        } else {
            return(
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <Cardlist robots={filteredRobots}/>
                        </ErrorBoundry>
                    </Scroll>
                </div>
            ); 
        }

    }
}

export default App;