import { Alert } from "react-native";
export default async function Query(url){
    
    try{
        const response =  await fetch(url,{
            method:'GET',
            credentials:'omit'
        });
        const data = await response.json()
        
        return data;
    }catch(error){
        console.log(error.message)
        Alert.alert(error.message)
        return 0;
    }
}