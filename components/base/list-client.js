import React from "react";
import { FlatList } from "react-native";
import EventListClient from "./event-list-client";

function ListClient({data}){
 
    const renderItem  = ({item})=>{
        
        return <EventListClient item = {item}/>
        
    }
    
    return (
        <FlatList
            data={data}
            keyExtractor={item=>item.id}
            renderItem={renderItem}
            initialNumToRender={10}
        />
    );
}
export default ListClient;