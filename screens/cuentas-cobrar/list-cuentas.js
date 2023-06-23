import { Component } from "react";
import { View,VirtualizedList,Text,ActivityIndicator, StyleSheet,TouchableOpacity } from "react-native";
class ListCuentas extends Component{
    state={
        isLoading: true,
        nav:null
    }
    componentDidMount() {
      const {nav} = this.props
      this.setState({nav:nav})
        setTimeout(() => {
          this.setState({ isLoading: false }); 
        }, 3000); 
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
      renderItem=({item})=>{
        
        return(
                <TouchableOpacity style={{borderWidth:1,borderRadius:5}} onPress={()=>this.state.nav.navigate('SelectCuenta',{codigo:item.codigo,filtro:item.filtro,cliente:item.razon_social})} >
                    <Text style={styles.txtsub}>CLIENTE: {item.razon_social}</Text>
                    <Text style={styles.txtsub}>CODIGO: {item.codigo}</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:3}}>
                        <View>
                           
                            <Text style={styles.txtsub}>Facturas:</Text>
                            <Text style={styles.txtsub}>Letra:</Text>
                            <Text style={styles.txtsub}>Total:</Text>
                        </View>
                        <View>
                            <Text>s/ {item.monto_soles}</Text>
                            <Text>s/ {item.letra_soles}</Text>
                            <Text>s/ {item.total_soles}</Text>
                        </View>
                        <View>
                            <Text style={styles.txtsub}>Facturas:</Text>
                            <Text style={styles.txtsub}>Letra:</Text>
                            <Text style={styles.txtsub}>Total:</Text>
                        </View>
                        <View>
                            <Text>US$ {item.monto_dolares}</Text>
                            <Text>US$ {item.letra_dolares}</Text>
                            <Text>US$ {item.total_dolares}</Text>
                        </View>
                    </View>
                    
                    
                    
                </TouchableOpacity>
                
            )
      }
    render(){
        const {data} = this.props;
       
        const {isLoading} = this.state
        if (isLoading) {
       
            return (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            );
          }
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
const styles = StyleSheet.create({
    txtsub:{
        fontWeight:'bold'
    }
})