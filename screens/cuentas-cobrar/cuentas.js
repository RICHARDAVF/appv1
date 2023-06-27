import { Component } from "react";
import { View,Text ,StyleSheet, TextInput, TouchableOpacity} from "react-native";
import { Contex } from "../../components/global/globalContex";
import  Icon  from "react-native-vector-icons/FontAwesome";
import ListCuentas from "./list-cuentas";
import CheckBox from '@react-native-community/checkbox';
// import { withNavigation } from "@react-navigation/compat";
class Cuentas extends Component{
    static contextType= Contex
    state = {
        oncheck:false,
        data:[],
        palabra:null    
    }
    componentDidMount(){
        this.requestData()
        
    }
    buscador(palabra){
        const result = this.state.data.filter(item=>item.razon_social.includes(palabra.toUpperCase()))
        this.setState({data:result})
    }
    async requestData(){
        const {dominio,cred} = this.context
        const url = `${dominio}/api/cuentas/${cred.bdhost}/${cred.bdname}/${cred.bduser}/${cred.bdpassword}/${(this.state.oncheck)?1:0}`
        const response = await fetch(url,{
            method:'GET',
        })
        const data = await response.json({})
        this.setState({data:data.message})
    }
    render(){   
        const {data} = this.state
        const {navigation} = this.props
        return( 
        <View style={styles.main}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',alignContent:'space-around',paddingHorizontal:6,marginTop:10}}>
                <TextInput value={this.state.palabra} onChangeText={(text)=>this.setState({palabra:text})} style={{borderBottomWidth:0.5,width:'60%'}}/>
                <TouchableOpacity onPress={()=>this.buscador(this.state.palabra)}>
                    <Icon name='search' size={22} color='gray'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.requestData()}>
                    <Icon name="download" size={22} color='blue'/>
                </TouchableOpacity>
            </View>
            <View style={{paddingHorizontal:6,margin:10,flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                <Text style={{marginEnd:5}}>
                   <Icon name="check" size={15}/> Documentos Cancelados</Text>
                <CheckBox
                        disabled={false}
                        value={this.state.oncheck}
                        onValueChange={(newValue) => this.setState({oncheck:newValue})}
                        boxType="square"
                        size={10}
                        animationDuration={0.1}
                    />
            </View>
            <ListCuentas data={data} nav={navigation} />
        </View>);
    }
}
export default Cuentas;
const styles = StyleSheet.create({
    main:{
        flex:1
    }
})