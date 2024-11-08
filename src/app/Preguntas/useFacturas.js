import { useEffect, useState } from "react";
import Swal from 'sweetalert2'

const useFacturas = () => {
    const [facturas, setFacturas] = useState([]); // Cambiado de factura a facturas
    const [busquedaFactura, setBusquedaFactura] = useState('');
    const [facturasFiltradas, setFacturasFiltradas] = useState([]);
    const [paginaActualFactura, setPaginaActualFactura] = useState(1);
    const facturasPorPagina = 8;

    // Obtener facturas al iniciar
    useEffect(() => {
        getDataInit(2);
    }, []);

    // Filtrar facturas cuando cambia la búsqueda
    useEffect(() => {
        const resultados = facturas.filter(factura =>
            factura.numero_factura?.toLowerCase().includes(busquedaFactura.toLowerCase()) ||
            factura.estado?.toLowerCase().includes(busquedaFactura.toLowerCase())
        );
        setFacturasFiltradas(resultados);
    }, [busquedaFactura, facturas]);

    const getDataInit = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/factura?id=${id}`);

            if (!response.ok) {
                throw new Error('Error al obtener facturas: ' + response.statusText);
            }

            const result = await response.json();
            orderFacturasById(result);
            return result;
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    };

    const orderFacturasById = (facturasData) => {
        const facturasOrdenadas = facturasData.sort((a, b) => b.id - a.id); // Ordenar descendente
        setFacturas(facturasOrdenadas);
        setFacturasFiltradas(facturasOrdenadas);
    };

    // Calcular facturas para la página actual
    const indiceUltimoFactura = paginaActualFactura * facturasPorPagina;
    const indicePrimeroFactura = indiceUltimoFactura - facturasPorPagina;
    const facturasActuales = facturasFiltradas.slice(indicePrimeroFactura, indiceUltimoFactura);
    const totalPaginasFactura = Math.ceil(facturasFiltradas.length / facturasPorPagina);

    const cambiarPaginaFactura = (numeroPagina) => {
        setPaginaActualFactura(numeroPagina);
    };

    const formatText = (text) => {
        if (!text) return '';
        return text.length > 30 ? text.slice(0, 30) + '...' : text;
    };

    return {
        getDataInit,
        facturasFiltradas,
        facturasActuales,
        paginaActualFactura,
        cambiarPaginaFactura,
        totalPaginasFactura
    };
};

export default useFacturas;