import React,{PureComponent} from "react";
import { Alert, StyleSheet, Text, View ,VirtualizedList} from "react-native";
import { Contex } from "../../components/global/globalContex";
import { withNavigation } from "@react-navigation/compat";
class ItemDetalleDoc extends PureComponent{
    static contextType = Contex
    state = {
        data :[]
    }
    componentDidMount(){
        
        
        this.requestData()
    }
    async requestData(){
        const{dominio,cred} = this.context
        const{codigo,fecha} = this.props.route.params
        const url= `${dominio}/api/cuentas/read/doc/${cred.bdhost}/${cred.bdname}/${cred.bduser}/${cred.bdpassword}/${codigo}/${fecha}`
        
        const result = await fetch(url,{
            method:'GET'
        })
        const response = await result.json({})
        if ('error' in response){
            return Alert.alert(
                'ALerta',
                response.error,
                [
                    {
                        text:'Aceptar',
                        onPress:()=>{
                            this.props.navigation.goBack()
                        }
                    }
                ]
            )
        }
        this.setState({data:response.result})

    }
    getItemCount = () => {
        
        return this.state.data.length;
      };
    getItem = (data, index) => {
        return data[index];
      };
    keyExtractor = (item) => {
        return item.id.toString();
      };
    renderItem=({item})=>{
        const mon = (item.moneda=='S')?'S/':'US$'
        return(
            <View style={{borderWidth:0.8,borderRadius:5,paddingHorizontal:10}}>
                <Text>{item.nombre}</Text>
                <View style={{flexDirection:'row'}}>
                    <View>
                        <Text style={styles.txtsub}>Codigo: </Text>
                        <Text style={styles.txtsub}>Precio Unitario: </Text>
                        <Text style={styles.txtsub}>Cantidad: </Text>
                        <Text style={styles.txtsub}>SubTotal: </Text>
                    </View>
                    <View>
                        <Text>{item.codigo}</Text>
                        <Text>{mon}{item.precio}</Text>
                        <Text>{item.cantidad}</Text>
                        <Text>{mon}{item.monto}</Text>
                    </View>
                </View>
                
            </View>
        )
    }
    render(){
        const {data} = this.state
        return(
            <View>
               <VirtualizedList
                data={data}
                getItemCount={this.getItemCount}
                getItem={this.getItem}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                />
            </View>
        );
    }
}
export default  withNavigation(ItemDetalleDoc);

const styles = StyleSheet.create({
    txtsub:{
        fontWeight:'bold'
    }
})