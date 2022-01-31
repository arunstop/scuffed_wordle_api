import { Application, NextFunction, Request, Response, Router } from "express";

/* GET users listing. */
module.exports = Router().get('/', function (req: Request, res: Response, next: NextFunction) {
  if (!req.query.length) {
    return res.status(500).json({
      error: true,
      message: "[`length` is required] Need to specify word length",
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

