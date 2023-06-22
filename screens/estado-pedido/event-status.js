
import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, VirtualizedList,View,ActivityIndicator } from 'react-native';

class ListaComponentes extends PureComponent { 
  state = {
    isLoading: true, 
  };

  componentDidMount() {
   
    setTimeout(() => {
      this.setState({ isLoading: false }); 
    }, 3000); 
  } 
  renderItem = ({ item }) => {
        const {navigation} = this.props
      return (
        <TouchableOpacity style={{borderWidth:1}} onPress={()=>navigation.navigate('EditarPedido',{item:item})}>
            <Text>CODIGO: {item.codigo_pedido}</Text>
            <Text>CLIENTE: {item.cliente}</Text>
            <Text>FECHA: {item.fecha}</Text>
            <Text>TOTAL: {item.total}</Text>
            <Text style={{color:(item.status=='APROBADO')?'green':'orange'}}>ESTADO: {item.status}</Text>
       </TouchableOpacity>
      );
    };

    
    getItemCount = () => {
      const { componentes } = this.props;
      return componentes.length;
    };
  
    getItem = (data, index) => {
      return data[index];
    };
  
    keyExtractor = (item) => {
      return item.id.toString();
    };
  
    render() {
      const { componentes } = this.props;
      const { isLoading } = this.state;
  
      if (isLoading) {
       
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
      }
      return (
        <VirtualizedList
          data={componentes}
          getItemCount={this.getItemCount}
          getItem={this.getItem}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      );
    }
  }
  export default ListaComponentes