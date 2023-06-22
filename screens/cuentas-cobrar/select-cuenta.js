import React,{Component} from "react";
import { Text, View } from "react-native";
import { Contex } from "../../components/global/globalContex";
import ListDetalle from "./list-detalle";
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
        
        
        return(
            <View>
                <ListDetalle data={this.state.datos}/>
            </View>
        )
    }
}

export default SelectCuenta;