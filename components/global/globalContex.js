import React,{useState,createContext} from "react";
export const Contex = createContext()

export const Provider = ({children})=>{
    const [dominio,setDominio] = useState('http://192.168.0.104:8000')
    const [userLogged,setUserLogged] = useState({});
    const [partialurl,setPartialurl] = useState('');
    const [isLogin,setIsLogin] = useState(false);
    const [user,setUser] = useState({});
    const [cliente,setCliente] = useState({});
    const [productos,setProductos] = useState([])
    const [data,setData] = useState([]);
    const [clientes,setClientes]=useState({})
    const [selected,setSelected]=useState({})
    const [almacenes,setAlmacenes] = useState({})
    const [ubicacion,setUbicacion] = useState([])
    const [precios,setPrecios] = useState([])
    const [cred,setCred] = useState([])
    const [tipoCambio,setTipoCambio] = useState('')
    const [moneda,setMoneda] = useState('S')
    const [icoMon,setIcoMon] = useState('s/')
    const [tipoPago,setTipoPago] = useState([])
    const [alm,setAlm] = useState('')
    const [local,setLocal] = useState('')
    const [p,setP] = useState('')
    const [estado,setEstado] = useState([])
    const [aprobacion,setAprobacion] = useState([])
    const [editPedido,setEditPedido] = useState(true)
    const [datosEdit,setDatosEdit] = useState({})
    const [tipoP,setTipoP] = useState('')
    const globalContex = {
        dominio,setDominio,
        userLogged,setUserLogged,
        partialurl,setPartialurl,
        isLogin,setIsLogin,
        user,setUser,
        cliente,setCliente,
        productos,setProductos,
        data,setData,
        clientes,setClientes,
        selected,setSelected,
        almacenes,setAlmacenes,
        ubicacion,setUbicacion,
        precios,setPrecios,
        cred,setCred,
        tipoCambio,setTipoCambio,
        moneda,setMoneda,
        icoMon,setIcoMon,
        tipoPago,setTipoPago,
        alm,setAlm,
        local,setLocal,
        p,setP,
        estado,setEstado,
        aprobacion,setAprobacion,
        editPedido,setEditPedido,
        datosEdit,setDatosEdit,
        tipoP,setTipoP
    }
    return <Contex.Provider value={globalContex}>{children}</Contex.Provider>
};

