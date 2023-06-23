import React,{Component} from "react";
import { Text, View } from "react-native";
import { Contex } from "../../components/global/globalContex";
import ListDetalle from "./list-detalle";
import { withNavigation } from "@react-navigation/compat";
class SelectCuenta extends Component{
    static contextType = Contex
    state = {
        datos:[]
    }
    componentDidMount(){
        const {route} = this.props
        this.setState({codigo:route.params.codigo})
        this.requestData()
    }

    async requestData(){
        const {dominio,cred} = this.context
        const {filtro,codigo} = this.props.route.params
        const url=`${dominio}/api/cuentas/read/${cred.bdhost}/${cred.bdname}/${cred.bduser}/${cred.bdpassword}/${codigo}/${filtro}`
        const response = await fetch(url,{
            method:'GET'
        })
        const data = await response.json({})
        this.setState({datos:data.message})
        
    }
    render(){
        
        const {cliente} = this.props.route.params
        return(
            <View style={{flex:1}}>
                <View style={{width:'100%',justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:10}}>
                    <Text style={{fontWeight:'bold',width:'95%',borderWidth:1}}> Cliente: {cliente}</Text>
                </View>
                <ListDetalle data={this.state.datos}/>
            </View>
        )
    }
}

export default withNavigation(SelectCuenta);