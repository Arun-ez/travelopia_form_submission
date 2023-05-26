import Traveller from "@/models/travellers.model";
import { createConnection } from "@/configs/MongoConnection";

const getAllData = async () => {
    try {
        await createConnection();
        let response = await Traveller.find({});
        return { data: response }
    } catch (error) {
        throw new Error(error);
    }
}

const postData = async (data) => {

    try {
        await createConnection();
        let response = await Traveller.create(data);
        return { data: `Details submitted with id ${response._id}` }
    } catch (error) {
        throw new Error(error);
    }
}

export { getAllData, postData }