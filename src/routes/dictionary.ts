import { Application, NextFunction, Request, Response, Router } from "express";

/* GET users listing. */
module.exports = Router().get('/', function (req: Request, res: Response, next: NextFunction) {
    let errorMsg: Array<String> = [];
    if (!req.query.length) {
        errorMsg.push("[`length` is required] Need to specify word length");
    }
    if (!req.query.difficulty) {
        errorMsg.push("[`difficulty` is required] Need to choose difficulty");
    }
    if (errorMsg.length > 0) {
        return res.status(500).json({
            error: true,
            message: errorMsg.join(", "),
        })
    }
    // const englishWordList: Array<String> = require('../public/assets/AllEngWords.json');
    const allWordList: Array<String> = require('../public/assets/BBC35kWordList.json');
    const letterCount: number = Number(req.query.length);
    const wordList = [...allWordList.filter((val: String) => val.length == letterCount)];
    const answer = wordList[Math.round(Math.random() * wordList.length)];
    return res.status(200).json({
        letterCount,
        "wordsCount": wordList.length,
        "answer": answer,
        // "validWords": validWords,
        "words": wordList,
    })
});

