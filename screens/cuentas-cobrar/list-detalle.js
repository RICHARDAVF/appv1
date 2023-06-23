import React, {  PureComponent } from "react";
import { Text, View, VirtualizedList,TouchableOpacity, StyleSheet } from "react-native";
import { withNavigation } from "@react-navigation/compat";
class ListDetalle extends PureComponent{
    componentDidMount(){
      
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
        const mon = (item.moneda=='S')?'S/':'US$'
        const {navigation} = this.props
        return(
            <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('DocumDetalle',{codigo:item.numero,fecha:item.emision})}>
              <View>
                <Text style ={styles.txtsub}>Codigo Vendedor.:</Text>
                <Text style ={styles.txtsub}>Tipo Documento.:</Text>
                <Text style ={styles.txtsub}>Serie & Numero:</Text>
                <Text style ={styles.txtsub}>Cargo:</Text>
                <Text style ={styles.txtsub}>Abono:</Text>
                <Text style ={styles.txtsub}>Saldo:</Text>
                <Text style ={styles.txtsub}>Fecha Emision:</Text>
                <Text style ={styles.txtsub}>Fecha Vencimineto:</Text>
              </View>
              <View>
                <Text>{item.codigo_vendedor}</Text>
                <Text>{item.documento}</Text>
                <Text>{item.serie}-{item.numero}</Text>
                <Text>{mon} {item.monto_debe}</Text>
                <Text>{mon} {item.monto_haber}</Text>
                <Text>{mon} {item.monto_debes}</Text>
                <Text>{item.emision}</Text>
                <Text>{item.vencimiento}</Text>
              </View>
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
export default withNavigation(ListDetalle);
const styles = StyleSheet.create({
  txtsub:{
    fontWeight:'bold'
  },
  btn:{
    borderWidth:0.5,
    borderRadius:5,
    flexDirection:'row',
    alignContent:'space-around',
    justifyContent:'space-around'
  }
})