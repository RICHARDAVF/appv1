import { useContext } from "react";
import { Text,View ,TouchableOpacity,StatusBar} from "react-native";
import { Contex } from "../components/global/globalContex";
import styles from "../components/styles/style";

function Landing({navigation,route,props}){
    const globalContex = useContext(Contex);
    const {isLoggedIn,appSettings} = globalContex;
    return(
        <View style = {styles.container}>
            <Text >Bienvenido</Text>
            <Text> </Text>
            <TouchableOpacity style={styles.btnlogin} onPress={()=>navigation.navigate('Login')}>
                <Text style={styles.txt}>Login</Text>
                
            </TouchableOpacity>
       
        </View>
    );
}


export default Landing