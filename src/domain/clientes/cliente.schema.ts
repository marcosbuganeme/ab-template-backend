import { Schema, model, Document } from 'mongoose';

import { Cliente } from './';

type ClienteSchemaModel = Cliente & Document & {};

const ClienteSchema = new Schema({
  codcli: {
    type: String,
    required: true,
  },
  cliente: {
    type: String,
    required: true,
    uppercase: true,
  },
  endercob: {
    type: String,
    uppercase: true,
  },
  bairrocob: {
    type: String,
    uppercase: true,
  },
  fantasia: {
    type: String,
    uppercase: true,
  },
  dtCadastro: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const ClienteModel = model<ClienteSchemaModel>('Clientes', ClienteSchema);

export default ClienteModel;
