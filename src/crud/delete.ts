import { Evento, Asistente } from '../main';

export const deleteOne = async (asistenteName: string, eventoName: string) => {
    const resultEvento = await Evento.findOneAndDelete({ titulo: eventoName });
    const resultAsistente = await Asistente.findOneAndDelete({ nombre: asistenteName });

    console.log('Deleted asistente:', resultAsistente);
    console.log('Deleted evento:', resultEvento);
};