import Traveller from "@/models/travellers.model";
import { createConnection } from "@/configs/MongoConnection";

const getAllData = async (query) => {

    let skip_criteria = 0;
    let sort_criteria = {};

    if (query.page && query.page > 1 && query.limit) {
        skip_criteria = query.limit * (query.page - 1);
    }

    if (query.sort && query.order) {
        sort_criteria[query.sort] = query.order === 'dsc' ? -1 : 1;
    }

    try {
        await createConnection();
        let response = await Traveller.find({}).limit(query.limit).skip(skip_criteria).sort(sort_criteria);
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
        return { data: `Details has been submitted with id ${response._id}` }
    } catch (error) {
        throw new Error(error);
    }
}


const deleteData = async (id) => {
    try {
        await createConnection();
        let response = await Traveller.deleteOne({ _id: id });
        return { data: `Data with id ${id} has been deleted` }
    } catch (error) {
        throw new Error(error);
    }
}

export { getAllData, postData, deleteData }