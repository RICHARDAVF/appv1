import React, {  PureComponent } from "react";
import { Text, View, VirtualizedList,TouchableOpacity } from "react-native";
class ListDetalle extends PureComponent{
    getItemCount = () => {
        const { data } = this.props;
        return data.length;
      };
    
      getItem = (data, index) => {
        return data[index];
      };
    
      keyExtractor = (item) => {
        return item.id.toString();
      };
      renderItem=({item})=>{
        return(
            <TouchableOpacity style={{borderWidth:0.5}}>
                <Text>{item.codigo_vendedor}</Text>
                <Text>{item.documento}</Text>
                <Text>{item.serie}</Text>
                <Text>{item.numero}</Text>
                <Text>{item.monto_debe}</Text>
                <Text>{item.monto_haber}</Text>
                <Text>{item.monto_debes}</Text>
                <Text>{item.emision}</Text>
                <Text>{item.vencimiento}</Text>
            </TouchableOpacity>
        )
      }
    render(){
        const {data} = this.props
        return(
            <VirtualizedList
            data={data}
            getItemCount={this.getItemCount}
            getItem={this.getItem}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            />
        )
    }
}
export default ListDetalle;