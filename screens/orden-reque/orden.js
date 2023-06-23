import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, ActivityIndicator,Text } from 'react-native';
import { Contex } from '../../components/global/globalContex';

const MyComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const globalContex = useContext(Contex)
    const {dominio,cred} = globalContex
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Inicio de la carga

        setLoading(true);

        const response = await fetch(`${dominio}/api/client/${cred.bdhost}/${cred.bdname}/${cred.bduser}/${cred.bdpassword}`,{method:"GET"});
        const responseData = await response.json({});
       
        // Simulación de un tiempo de carga necesario
        await new Promise(resolve => setTimeout(resolve, calculateLoadingTime(responseData)));

        // Fin de la carga
        setData(responseData);
        setLoading(false);
      } catch (error) {
        // Manejo de errores
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateLoadingTime = (responseData) => {
    // Lógica para calcular el tiempo de carga necesario
    // Puedes basarte en la cantidad de datos o cualquier otra métrica
    // Aquí un ejemplo simple: 1 segundo por cada 100 elementos
    const loadingTime = Math.ceil(responseData.length / 1000) * 100;
    console.log(loadingTime)
    return loadingTime;
  };

  const renderItem = ({ item }) => (
    // Renderiza los elementos de la lista
    <View>
      <Text>{item.codigo}</Text>
    </View>
  );

  if (loading) {
    return (
      <View>
        {/* Aquí puedes mostrar un indicador de carga */}
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default MyComponent;
