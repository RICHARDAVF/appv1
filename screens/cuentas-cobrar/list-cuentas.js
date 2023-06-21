import { Component } from "react";
import { View,VirtualizedList,Text } from "react-native";
class ListCuentas extends Component{
    state={
        data:null
    }
    componentDidMount(){
        const {data} = this.props
        
        this.setState({data:data})
    }
    buscador(palabra){
        
        const result = data.filter(item=>item.id.includes(palabra));
        console.log(result)
      }
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
      renderItem({item}){
        return(
            <View>
                <Text>{item.id}</Text>
            </View>
        )
      }
    render(){
        const {data} = this.props;
        return (
            <VirtualizedList
            data={data}
            getItemCount={this.getItemCount}
            getItem={this.getItem}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            />
        );
    }
}

export default  ListCuentas;