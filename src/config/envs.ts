import 'dotenv/config';
import * as Joi from 'joi';
import { IsArray } from 'class-validator';

interface EnVars {
    PORT: number;
    PRODUCT_MICROSERVICE_HOST: string;
    PRODUCT_MICROSERVICE_PORT: number
    ORDER_MICROSERVICE_HOST: string;
    ORDER_MICROSERVICE_PORT: number

    NATS_SERVERS: string;
}

const envSchema = Joi.object({
    PORT: Joi.number().required(),
    // PRODUCT_MICROSERVICE_HOST: Joi.string().required(),
    // PRODUCT_MICROSERVICE_PORT: Joi.number().required(),
    // ORDER_MICROSERVICE_HOST: Joi.string().required(),
    // ORDER_MICROSERVICE_PORT: Joi.number().required(),

    NATS_SERVERS: Joi.array().items(Joi.string()).required()
})
    .unknown(true);

const { error, value } = envSchema.validate({
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(',') || []
});

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const envVars: EnVars = value;

export const envs = {
    PORT: envVars.PORT,
    // productMicroserviceHost: envVars.PRODUCT_MICROSERVICE_HOST,
    // productMicroservicesPort: envVars.PRODUCT_MICROSERVICE_PORT,
    // orderMicroserviceHost: envVars.ORDER_MICROSERVICE_HOST,
    // orderMicroservicePort: envVars.ORDER_MICROSERVICE_PORT,
    natsServers: envVars.NATS_SERVERS
};

