import { View ,Text} from "react-native";

function Home({navigation,rout,props}){
    return (
        <View style={{flex:1,alignContent:'center',alignItems:'center',justifyContent:'center'}}>
            
            <Text style={{fontSize:30,justifyContent:'center',alignContent:'center'}}> NOI SYSTEMS</Text>
            <Text style={{textAlign:'center'}}>MAS 20 DE AÑOS CREANDO SOLUCIONES PARA NUESROS CLIENTES</Text>
            
        </View>
    );
}
export default Home;