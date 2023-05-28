import { deleteData } from "@/controllers/travellers.controller";

const DELETE = async (req, res) => {
    try {
        let response = await deleteData(req.query.id);
        res.send(response);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const handler = (req, res) => {

    const { method } = req;

    if (method === 'DELETE') {
        DELETE(req, res);
    } else {
        res.status(404).send({ error: `${method} request not supported` });
    }
}

export default handler;