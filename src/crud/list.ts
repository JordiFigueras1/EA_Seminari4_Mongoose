import { Asistente, Evento } from '../main';

export const list = async () => {
    const asistentes = await Asistente.find();
    console.log('The list of asistentes is:', asistentes);

    const eventos = await Evento.find();
    console.log('The list of eventos is:', eventos);
};
