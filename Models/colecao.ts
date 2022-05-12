import { Schema, Document, model, Model } from 'mongoose';

export interface IColecao extends Document {
    NOME: String;
    DESCRICAO: String;
    VALOR: Number;
}

export const productSchema: Schema = new Schema({
    NOME: String,
    DESCRICAO: String,
    VALOR: Number
});

export const Colecao: Model<IColecao> = model<IColecao>("Colecao", productSchema, "colecao");