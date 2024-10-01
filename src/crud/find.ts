import { Evento, Asistente } from '../main';

export const find = async (asistenteName: string, eventoTitle: string) => {
    // Buscamos al asistente por su nombre
    const asistente = await Asistente.findOne({ nombre: asistenteName }); 
    
    // Buscamos al evento por su título
    const evento = await Evento.findOne({ titulo: eventoTitle }); 

    console.log('(Find) The asistente with this name is', asistente);
    console.log('(Find) The evento with this title is', evento);

    // Población de asistentes en el evento encontrado
    const populatedEvento = await Evento
        .findOne({ titulo: eventoTitle }) 
        .populate('asistentes') 
        .exec();

    console.log('(Populate) The asistentes for this evento are', populatedEvento?.asistentes);
};
