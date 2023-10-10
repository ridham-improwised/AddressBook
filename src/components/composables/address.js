import { ref, unref } from "vue";
import axios from "axios";

export default function useAddress() {
    const addresses = ref(null) ;
    const error = ref(null) ;
    const url = ref("http://localhost:3000/addresses/") ;

    
    const getAddress = async() => {
        console.log('received call');
        addresses.value = null ;
        error.value = null ;

        try {
            const response = await axios(unref(url)) ;
            addresses.value = response.data ;
            console.log('got data');
        } catch (err) {
            error.value = err ;
            console.log(err);
        }
    }

    const deleteAddress = async(id) => {
        addresses.value = null ;
        error.value = null ;

        let response ;
        try {
            const config = {
                method: "delete",
                url: unref(url) + id,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            response = await axios(config)
            console.log(response);
        } catch (err) {
            error.value = err ;
            console.log(err);
        }

        return { response }
    }

    const addAddress = async(formData) => {
        addresses.value = null ;
        error.value = null ;

        let response ;
        try {
            const config = {
                method: "post",
                url: unref(url),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(formData)
            } 
            response = await axios(config) ;
            addresses.value = response.data ;
            console.log("after api call response ",response);
        } catch (err) {
            error.value = err ;
            console.log("after api call response ", err);
        }

        return { response }
    }

    const updateAddress = async(formData, id) => {
        addresses.value = null ;
        error.value = null ;

        let response ;
        try {
            const config = {
                method: "put",
                url: unref(url) + id,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(formData)
            } 
            response = await axios(config) ;
            addresses.value = response.data ;
            console.log("after api call response ",response);
        } catch (err) {
            error.value = err ;
            console.log("after api call response ", err);
        }

        return { response }
    }

    return {
        addresses,
        error,
        getAddress,
        deleteAddress,
        addAddress,
        updateAddress
    }
}