import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, VirtualizedList,View,StyleSheet ,ActivityIndicator} from 'react-native';
class ListDatos extends PureComponent {  
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
        <TouchableOpacity style={{ borderWidth: 1}} onPress={()=>navigation.navigate('EventApro',{item:item})}>
            <Text>CLIENTE: {item.cliente}</Text>
          <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:3}}>
              <View>
                  <Text style={styles.txt}>CODIGO: </Text>
                  <Text style={styles.txt}>SUB TOTAL: </Text>
                  <Text style={styles.txt}>IGV: </Text>
                  <Text style={styles.txt}>TOTAL: </Text>
              </View>
              <View>
                  <Text style={{fontSize:10}}>{item.codigo_pedido}</Text>
                  <Text style={{fontSize:10}}>{item.subtotal}</Text>
                  <Text style={{fontSize:10}}>{item.igv}</Text>
                  <Text style={{fontSize:10}}>{item.total}</Text>
                  
              </View>
              <View>
                  <Text style={styles.txt}>FECHA: </Text>
                  <Text style={styles.txt}>APROBACION 1: </Text>
                  <Text style={styles.txt}>APROBACION 2: </Text>
                  <Text style={styles.txt}>OBSERVACION: </Text>
              </View>
              <View> 
                  <Text style={{fontSize:10}}>{item.fecha}</Text>
                  <Text style={{fontSize:10}}>{(item.status1==2)?'APROBADO':'PENDIENTE'}</Text>
                  <Text style={{fontSize:10}}>{(item.status2==2)?'APROBADO':'PENDIENTE'}</Text>
              </View>
          </View>
            
            
            
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
  export default ListDatos
const styles = StyleSheet.create({
    btns: {
        borderWidth: 1,
        borderRadius: 2
    },
    panel: {
        width: '90%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 10,
        borderWidth: 1


    },
    txt:{
        fontWeight:'bold',
        fontSize:10
        
    }

})