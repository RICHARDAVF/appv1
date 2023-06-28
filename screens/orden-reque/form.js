import React,{PureComponent} from "react";
import { View,Text,TextInput, StyleSheet,LogBox, TouchableOpacity, ScrollView} from "react-native";
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-element-dropdown';
import RadioGroup from 'react-native-radio-buttons-group';
import _ from 'lodash';


class Form extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            date:null,
            valor:[],
            tipo:[{
                id: '1', 
                label: 'Option 1',
                value: 'option1'
            }, {
                id: '2',
                label: 'Option 2',
                value: 'option2'
            }]
        }
    }
    componentDidMount(){
        this.state.tipo[0].selected = true;
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        LogBox.ignoreLogs(['componentWillReceiveProps']);
        
    }
    changeDate(newDate){
        console.log(newDate)
        this.setState({date:newDate})
    }
    onPressRadioButton = (radioButtonsData) => {
        this.setState({tipo: radioButtonsData });
      };
    
    
    render(){
        const ubic = [
            {
                value:1,label:'Primer'
            },
            {
                value:2,label:'Primer'
            },
            {
                value:3,label:'Primer'
            },
        ]
        return(
            <View style={{flex:1}}>
                <ScrollView>
                <View style={{alignItems:'center',marginTop:6}}>
                    
                    <View style={{flexDirection:'row',paddingHorizontal:5}}>
                    <DatePicker
                        style={{width:'45%'}}
                        date={this.state.date}
                        mode="date"
                        placeholder="FECHA DE EMISION"
                        format="YYYY-MM-DD"
                        minDate="1900-01-01"
                        maxDate="2100-01-01"
                        confirmBtnText="CONFIRMAR"
                        cancelBtnText="CANCELAR"
                        useNativeDrive={true}
                        onDateChange={(date)=>this.changeDate(date)}
                    />
    
                    <DatePicker
                        style={{width:'45%'}}
                        date={this.state.date}
                        mode="date"
                        placeholder="FECHA DE ENTREGA"
                        format="YYYY-MM-DD"
                        minDate="1900-01-01"
                        maxDate="2100-01-01"
                        confirmBtnText="CONFIRMAR"
                        cancelBtnText="CANCELAR"
                        useNativeDrive={true}
                        onDateChange={(date)=>this.changeDate(date)}
                    />
                    </View>
                    <View style={{width:"95%",marginTop:10,flexDirection:'row',justifyContent:'space-around'}}>
                  
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                       
                        
                        data={ubic}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="AREA"
                        searchPlaceholder="Buscar..."
                        // value={local}
                        // onChange={item => {
                            // setLocal(item.value);
                        // }}
                        />
                        <Text style={{borderWidth:0.5,alignItems:"center",borderRadius:5}}>000007</Text>
                   </View>
                   
                    <Text style={styles.txtsub}>SOLICITADO POR</Text>
                    <TextInput style={styles.txtinput} placeholder="RAMIRO PEREZ"/>
                    <Text style={styles.txtsub}>TIPO</Text>
                    <RadioGroup 
                        radioButtons={this.state.tipo} 
                        onPress={this.onPressRadioButton} 
                        layout='row'
                        
                    />
                    
                    <Text style={styles.txtsub}>PROVEEDOR</Text>
                    <Dropdown
                        style={[styles.dropdown,{width:'90%'}]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                    
                        
                        data={ubic}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="PROVEEDOR"
                        searchPlaceholder="Buscar..."
                        // value={local}
                        // onChange={item => {
                            // setLocal(item.value);
                        // }}
                        />
                    <Text style={styles.txtsub}>LUGAR DE ENTREGA</Text>
                    <Dropdown
                        style={[styles.dropdown,{width:'90%'}]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                    
                        
                        data={ubic}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="LUGAR DE ENTREGA"
                        searchPlaceholder="Buscar..."
                        // value={local}
                        // onChange={item => {
                            // setLocal(item.value);
                        // }}
                        />
                    <Text style={styles.txtsub}>CONDICION DE PAGO</Text>
                    <Dropdown
                        style={[styles.dropdown,{width:'90%'}]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                    
                        
                        data={ubic}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="CONDICION DE PAGO"
                        searchPlaceholder="Buscar..."
                        // value={local}
                        // onChange={item => {
                            // setLocal(item.value);
                        // }}
                        />
                    
                    
                    <Text style={styles.txtsub}>OBS</Text>
                   
                    <Text style={styles.txtsub}>PRIORIDAD</Text>
                    <RadioGroup 
                        radioButtons={this.state.tipo} 
                        onPress={this.onPressRadioButton} 
                        layout='row'
                        
                    />
                    <Text style={styles.txtsub}>MERCADO</Text>
                    <RadioGroup 
                        radioButtons={this.state.tipo} 
                        onPress={this.onPressRadioButton} 
                        layout='row'
                        
                    />
                    <Text style={styles.txtsub}>OBSERVACION</Text>
                    <TextInput placeholder="OBSERVACION" multiline style={{borderWidth:0.5,width:'95%',height:50}}/>
                </View>
                
                <TouchableOpacity style={styles.btnnext} onPress={()=>console.log('guardado')} >
                    <Text>GUARDAR</Text>
                </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}
export default Form
const styles = StyleSheet.create({
    btnnext:{
        marginTop:30,
        bottom: 20, 
        left: 20, 
        backgroundColor: '#545cd7',
        padding: 10,
        borderRadius: 5,
        width:'90%',
        alignItems:'center'
      },
    txtsub:{
        fontWeight:'bold',
        marginVertical:5
    },
    dropdown: {
        height: 30,
        width:'60%',
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
    txtinput:{
        borderWidth:0.5,
        borderRadius:5,
        width:'90%',
        height:30,
        textAlign:'center',marginVertical:10
    },
    placeholderStyle: {
        fontSize: 16,
        fontWeight:'normal'
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
})