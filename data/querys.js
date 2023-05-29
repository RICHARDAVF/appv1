export default async function Query(url){
    
    try{
        const response =  await fetch(url,{
            method:'GET',
        });
        const data = await response.json()
        
        return data;
    }catch{
        Alert.alert('Error de servidor')
        return 0;
    }
}