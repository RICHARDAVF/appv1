import { FlatList,Text } from "react-native";
import EventItemList from "./event-list-product";
import { useContext } from "react";
import { Contex } from "../global/globalContex";

function ListProduct({data}){
    const globalContex = useContext(Contex)
    const {tipoCambio,moneda} = globalContex
    
    if(data.length==0){
        return <Text>Sin Resultados</Text>
    }
    
    const renderItem  = ({item})=>{
        if (moneda=='USD'){
            return <EventItemList id = {item.id} codigo = {item.codigo} nombre = {item.nombre} precio={(item.precio/tipoCambio).toFixed(2)} afecto={item.afecto}/>
        }else{
            return <EventItemList id = {item.id} codigo = {item.codigo} nombre = {item.nombre} precio={item.precio} afecto={item.afecto}/>
        }
        
    }
    
    return (
        <FlatList
        data={data}
        keyExtractor={item=>item.id}
        renderItem={renderItem}
        style={{backgroundColor:'#e0ffff'}}
        />
    );
}
export default ListProduct;