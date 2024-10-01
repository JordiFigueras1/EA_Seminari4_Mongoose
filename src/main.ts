import { Schema, model, connect } from 'mongoose';
import { create } from './crud/create';
import { list } from './crud/list';
import { find } from './crud/find';
import { deleteOne } from './crud/delete';
import { getEventStatistics } from './crud/aggregation';

// 1. Create an interface representing a document in MongoDB for Asistente.
interface IAsistente {
  _id: Schema.Types.ObjectId;
  nombre: string;
  correo: string;
  telefono?: string;
  fechaInscripcion?: Date;
}

// 2. Create a Schema corresponding to the Asistente document interface.
const asistenteSchema = new Schema<IAsistente>({
  _id: Schema.Types.ObjectId,
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  telefono: String,
  fechaInscripcion: Date
});

// 3. Create a Model for Asistente.
export const Asistente = model<IAsistente>('Asistente', asistenteSchema);

// 1. Create an interface representing a document in MongoDB for Evento.
interface IEvento {
  _id: Schema.Types.ObjectId;
  titulo: string;
  fecha: Date;
  ubicacion: string;
  asistentes: IAsistente['_id'][];
}

// 2. Create a Schema corresponding to the Evento document interface.
const eventoSchema = new Schema<IEvento>({
  _id: Schema.Types.ObjectId,
  titulo: { type: String, required: true },
  fecha: { type: Date, required: true },
  ubicacion: { type: String, required: true },
  asistentes: [{ type: Schema.Types.ObjectId, ref: 'Asistente' }]
});

// 3. Create a Model for Evento.
export const Evento = model<IEvento>('Evento', eventoSchema);

run().catch(err => console.log(err));

async function run() {
  // 4. Connect to MongoDB
  await connect('mongodb://127.0.0.1:27017/Asistentes_eventos');

  // Crear datos (ya están creados)
  await create();

  // List
  await list();

  // Get/populate (nombreAsistente, tituloEvento)
  await find('Jaime', 'Concierto de Verano');

  // Agregar la nueva función de estadísticas
  await getEventStatistics();

  // Delete (asistenteId, eventoId)
  await deleteOne('Jaime', 'Concierto de Verano');

  // List
  await list();
}
