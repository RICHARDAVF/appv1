import React, { Component } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Contex } from "../../components/global/globalContex";
import ListAprobacion from "./list-aprobacion";
import Icon from 'react-native-vector-icons/FontAwesome'
class Aprobacion extends Component {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    const {estado} = Contex._currentValue
    this.state ={
        status:estado
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <View>
          <TextInput placeholder="Buscar Cliente"/>
            <TouchableOpacity>
              <Icon name="search"/>
            </TouchableOpacity>
        </View> */}
        <ListAprobacion data={this.state.status}/>
      </View>
    );
  }
}

export default Aprobacion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
