import React,{PureComponent} from "react";
import { VirtualizedList,ActivityIndicator, StyleSheet } from "react-native";
class ListAproOrden extends PureComponent{
    constructor(props){
        super(props);
        this.statre = {
            loading:true,
            data:[]
        }
    }
    componentDidMount(){
        const {data} = this.props
        setTimeout(()=>{this.setState({loading:false})},
        this.tiempo(data))
    }
    tiempo(data){
        const timeLoading = Math.ceil(data.legth/1000)*100;
        return timeLoading
    }
    render(){
        const {loading,data} = this.state
        if(loading){
            <View style={styles.carga}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        }
        return(
            <VirtualizedList
            data={data}
            
            />
        );
    }
}
export default ListAproOrden;
const styles = StyleSheet.create({
    carga :{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    }
})