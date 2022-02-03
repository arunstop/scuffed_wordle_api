import 'dotenv/config'

import mongoose, { ConnectOptions } from 'mongoose';

const connect = async () => {
    try {
        const mongodbUri: string = process.env.MONGODB_URI as string;
        mongoose.connect(mongodbUri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        } as ConnectOptions)
        // console.log(process.env.MONGODB_URI);
    } catch (error) {
        console.log(error)
    }
}

export default {connect};