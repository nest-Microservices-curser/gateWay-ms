import 'dotenv/config';
import * as Joi from 'joi';

interface EnVars {
    PORT: number;
    PRODUCT_MICROSERVICE_HOST: string;
    PRODUCT_MICROSERVICE_PORT: number
}

const envSchema = Joi.object({
    PORT: Joi.number().required(),
    PRODUCT_MICROSERVICE_HOST: Joi.string().required(),
    PRODUCT_MICROSERVICE_PORT: Joi.number().required()
})
    .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const envVars: EnVars = value;

export const envs = {
    PORT: envVars.PORT,
    productMicroserviceHost: envVars.PRODUCT_MICROSERVICE_HOST,
    productMicroservicesPort: envVars.PRODUCT_MICROSERVICE_PORT
};

