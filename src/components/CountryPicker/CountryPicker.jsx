import React, { useState, useEffect } from "react";
import {NativeSelect, FormControl} from "@material-ui/core";
import styles from './CountryPicker.module.css';
import {fetchCountries} from '../../api';

const CountryPicker = ({handleCountryPicker}) => {
    const [fetchedCountries, setFetchedCountries] = useState([])
    useEffect(() => {const api = async () => {
            setFetchedCountries(await fetchCountries());
        }
        api();
    },[setFetchedCountries]);

    console.log("fetchedCountries",fetchedCountries);
    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e)=> handleCountryPicker(e.target.value)}>
                <option value={''}>Global</option>
                {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker