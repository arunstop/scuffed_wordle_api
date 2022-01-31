import { Application, Request, Response, Router } from "express";

module.exports = Router().get(
    "/",
    async (req: Request, res: Response): Promise<Response> => {
        res.render('index', { title: 'Express' });
        return res.status(200).send({
            message: "Hello Worlds!",
        });
    }
);;
