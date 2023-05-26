import Traveller from "@/models/travellers.model";
import { createConnection } from "@/configs/MongoConnection";

const getAllData = async (query) => {

    let skip = 0;

    if (query.page && query.page > 1 && query.limit) {
        skip = query.limit * (query.page - 1);
    }

    try {
        await createConnection();
        let response = await Traveller.find({}).limit(query.limit).skip(skip);
        let total = await Traveller.count();
        let pages = !query.limit ? 1 : Math.ceil(total / query.limit);
        return { data: response, total_pages: pages, page: query.page || 1 }
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