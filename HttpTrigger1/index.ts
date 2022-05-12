import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Colecao, IColecao, productSchema } from "../models/colecao";
import * as mongoose from "mongoose";

const conx: string = "mongodb+srv://username:password@servername.5pflo.mongodb.net/databasename?retryWrites=true&w=majority";


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {

    await mongoose.connect(conx, {
        keepAlive: true, connectTimeoutMS: 10000, maxPoolSize: 10, autoIndex: true, 
    });
    
    try {
        
        if (req.method == "POST") {
            
            const product: IColecao = new Colecao();
            product.NOME = req.body.NOME;
            product.DESCRICAO = req.body.DESCRICAO;
            product.VALOR = req.body.VALOR;

            product.save();
            return context.res = {
                status: 200,
                message: "OK"
            };
        }        
        
        if (req.method == "DELETE") {
            const product: IColecao = await Colecao.findById(req.query._id);

            if (!product) {
                return context.res = {
                    status: 404,
                    message: "Não encontrado"
                };
            }

            product.deleteOne();
            return context.res = {
                status: 200,
                message: "OK"
            };

        }

        if (req.method == "PUT") {
            const product: IColecao = await Colecao.findById(req.body._id);

            if (!product) {
                return context.res = {
                    status: 404,
                    message: "Não encontrado"
                };
            }

            product.NOME = req.body.NOME;
            product.DESCRICAO = req.body.DESCRICAO;
            product.VALOR = req.body.VALOR;

            product.save();
            return context.res = {
                status: 200,
                message: "OK"
            };
        }
        
        if (req.method == "GET") {

            const products: any = await Colecao.find();

            if (!products) {
                return context.res = {
                    status: 404,
                    message: "Não encontrado"
                };
            }
            
            return context.res = {
                status: 200,
                message: "OK",
                body: { data: products }
            };

        }

    } catch (err) {
        return context.res = {
                status: 500,
                message: "Internal Server Error"
            };
    }
    
    
};

export default httpTrigger;

