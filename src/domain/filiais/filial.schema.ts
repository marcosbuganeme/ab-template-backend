import { Schema, model, Document } from 'mongoose'

import { Filial } from './'

type FilialSchemaModel = Filial & Document & {}

const FilialSchema = new Schema({
  codigo: {
    type: String,
    required: true
  },
  razaoSocial: {
    type: String,
    required: true,
    uppercase: true
  },
  dataCriada: {
    type: Date,
    required: true,
    default: new Date()
  },
  nomeResponsavel: {
    type: String,
    required: true,
    uppercase: true
  },
  emailResponsavel: {
    type: String,
    required: true,
    uppercase: true
  },
  telefoneResponsavel: {
    type: String,
    required: true
  }
})

const FilialModel = model<FilialSchemaModel>('Filiais', FilialSchema)

export default FilialModel