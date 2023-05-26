import { getAllData, postData } from "@/controllers/travellers.controller";

const GET = async (req, res) => {
    try {
        let response = await getAllData();
        res.send(response);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }

}

const POST = async (req, res) => {
    try {
        let response = await postData(req.body);
        res.send(response);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }

}


const handler = (req, res) => {

    const { method } = req;

    if (method === 'GET') {
        GET(req, res);
    } else if (method === 'POST') {
        POST(req, res);
    } else {
        res.status(404).send({ error: `${method} request not supported` });
    }
}


export default handler;