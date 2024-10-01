import { Evento } from '../main';

export const getEventStatistics = async () => {
    const statistics = await Evento.aggregate([
        {
            $lookup: {
                from: 'asistentes',         // Especifica la colección con la que se va a hacer la unión (en este caso, 'asistentes').
                localField: 'asistentes',   // El campo en la colección de 'eventos' que contiene los IDs de los asistentes.
                foreignField: '_id',        // El campo en la colección de 'asistentes' que corresponde a los IDs (aquí, '_id')
                as: 'asistentesInfo'        // Nombre del nuevo campo donde se guardarán los resultados de la unión, con la información de los asistentes.
            }
        },
        {
            $project: {
                titulo: 1,                                          // Incluye el campo 'titulo' del evento.
                fecha: 1,                                           // Incluye el campo 'fecha' del evento.
                ubicacion: 1,                                       // Incluye el campo 'ubicacion' del evento.
                numeroAsistentes: { $size: '$asistentesInfo' }      // Crea un nuevo campo 'numeroAsistentes', que cuenta el tamaño del arreglo 'asistentesInfo' (es decir, cuántos asistentes tiene el evento).
            }
        },
        {
            $sort: { numeroAsistentes: -1 }                          // Ordena los eventos en orden descendente (de mayor a menor) según el número de asistentes.
        },
        {
            $group: {
                _id: null,                                          // Se agrupan todos los eventos en un solo grupo, ya que no necesitamos agrupar por algún campo específico.
                totalEventos: { $sum: 1 },                          // Cuenta el total de eventos sumando 1 por cada evento en el conjunto.
                eventoConMasAsistentes: { $first: '$$ROOT' },       // Guarda el primer evento en el conjunto (el que tiene más asistentes después de la ordenación).
                promedioAsistentes: { $avg: '$numeroAsistentes' }   // Calcula el promedio del número de asistentes de todos los eventos.
            }
        }
    ]);

    console.log('Estadísticas de eventos:', statistics[0]);
};