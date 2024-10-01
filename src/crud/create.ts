import { Asistente, Evento } from '../main';
import mongoose from 'mongoose';

export const create = async () => {
    // Creamos 2 asistentes
    const asistente1 = new Asistente({
        _id: new mongoose.Types.ObjectId(),
        nombre: 'Jaime',
        correo: 'james@gmail.com',
        telefono: '123456789',
        fechaInscripcion: new Date('2024-01-01')
    });
    await asistente1.save();

    const asistente2 = new Asistente({
        _id: new mongoose.Types.ObjectId(),
        nombre: 'Guillermo Suarez',
        correo: 'guille@gmail.com',
        telefono: '987654321',
        fechaInscripcion: new Date('2024-01-02')
    });
    await asistente2.save();

    // Creamos 2 eventos
    const evento1 = new Evento({
        _id: new mongoose.Types.ObjectId(),
        titulo: 'Concierto de Verano',
        fecha: new Date('2024-07-01'),
        ubicacion: 'Auditorio Principal',
        asistentes: [asistente1._id, asistente2._id] // Asociamos asistentes al evento
    });
    await evento1.save();

    const evento2 = new Evento({
        _id: new mongoose.Types.ObjectId(),
        titulo: 'Fiesta de Fin de Año',
        fecha: new Date('2024-12-31'),
        ubicacion: 'Centro de Eventos',
        asistentes: [asistente2._id] // Asociamos asistentes al evento
    });
    await evento2.save();
};
