import { Component } from "react";
import { View,Text ,StyleSheet, TextInput, TouchableOpacity} from "react-native";
import { Contex } from "../../components/global/globalContex";
import  Icon  from "react-native-vector-icons/FontAwesome";
import { Checkbox } from "react-native-paper";
import ListCuentas from "./list-cuentas";

class Cuentas extends Component{
    static contextType= Contex
    state = {
    ontogle:false    
    }
    componentDidMount() {
        const {dominio} = this.context
        
    }
    render(){   
        const data = [
            {"id":1,"value":'r'},
            {"id":2,"value":'d'},
            {"id":3,"value":'f'},
            {"id":4,"value":'m'},
            {"id":5,"value":'y'},
            {"id":6,"value":'b'},
        ]
        return( 
        <View style={styles.main}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',alignContent:'space-around',paddingHorizontal:6,marginTop:10}}>
                <TextInput style={{borderBottomWidth:0.5,width:'60%'}}/>
               
                <TouchableOpacity>
                    <Icon name='search' size={22} color='gray'/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="download" size={22} color='blue'/>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',alignContent:'space-around',paddingHorizontal:6,marginTop:10}}>
               <Checkbox.Item status={this.state.ontogle ? 'checked' : 'unchecked'}
                   label="Documentos Cancelados"
                    onPress={() => this.setState({ontogle:!this.state.ontogle})}  />
            </View>
            
            <ListCuentas data={data}/>
        </View>);
    }
}
export default Cuentas;
const styles = StyleSheet.create({
    main:{
        flex:1
    }
})