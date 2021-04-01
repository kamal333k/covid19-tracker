import React from 'react'

 import {Cards, Chart, CountryPicker} from "./components"
 import styles from './App.module.css'

 import { fetchData } from "./api";
 import coronaImg from "./images/banner.png"
class App extends React.Component {
    state = {
        data: {},
        country: ""
    }
    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({data: fetchedData});
    }
    handleCountryPicker = async (country) =>{
        const fetchedData = await fetchData(country);
        this.setState({data: fetchedData, country: country});
    }
    render(){
        const {data, country} = this.state;
        return (
            <div className = {styles.container}>
                <img src={coronaImg} className={styles.image} alt="covid-19"/>
                <Cards data={data}/>
                <CountryPicker handleCountryPicker={this.handleCountryPicker} />
                <Chart data={data} country={country}/>
            </div>
        )
    }
}

export default App 