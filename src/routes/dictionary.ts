import { Application, NextFunction, Request, Response, Router } from "express";
import _ from'lodash';

// DIFFICULTIES
const DIFFICULTIES: Array<string> = ["EASY", "NORMAL", "HARD"];

module.exports = Router().get('/', function (req: Request, res: Response, next: NextFunction) {
    let errorMsgs: Array<String> = [];
    let { length, difficulty } = req.query;
    if (!length) {
        errorMsgs.push("[`length` is required] Cannot be empty");
    }
    // limit length between 4-9
    else if (typeof length == "number" || Number(length) < 4 || Number(length) > 13) {
        errorMsgs.push("[`length` is invalid] Must be between 4 to 12");
    }
    // check if difficulty is valid
    if (!difficulty || !DIFFICULTIES.includes(difficulty.toString().toUpperCase())) {
        errorMsgs.push("[`difficulty` is invalid] Needs to be either EASY or NORMAL or HARD");
    }
    // check if there is an error
    if (errorMsgs.length > 0) {
        return res.status(500).json({
            error: true,
            message: errorMsgs.join(". "),
        })
    }

    // filter word list by length
    const filterByLength = (list: Array<string>, length: number): Array<string> => [...list.filter((val: string) => val.length == length)];
    // get list of words by difficulty
    function wordListByDifficulty(diffy: string): Array<string> {

        const easy: Array<string> = require('../public/assets/easy-oxford5000.json');
        if (diffy.toUpperCase() == 'EASY') {
            return easy;
        }
        const normal: Array<string> = require('../public/assets/normal-oxford-google.json');
        if (diffy.toUpperCase() == 'NORMAL') {
            return normal;
        }
        const hard: Array<string> = require('../public/assets/hard-oxford-google-bbc.json');
        if (diffy.toUpperCase() == 'HARD') {
            return hard;
        }
        return easy;

    }
    // Giving types to query

    const letterCount: number = Number(length);
    // get all english words
    const englishWordList: Array<string> = require('../public/assets/AllEngWords.json');
    // get english words by length
    const englishWordListByLength: Array<string> = filterByLength(englishWordList, letterCount);
    // choose word list by difficulty
    const targetWordList: Array<string> = filterByLength(wordListByDifficulty(difficulty as string), letterCount);
    // get answer from target word list
    const answer = targetWordList[Math.round(Math.random() * targetWordList.length)];
    //
    return res.status(200).json({
        letterCount,
        "difficulty": difficulty as string,
        "wordsCount": targetWordList.length,
        "answer": answer,
        "answerList": targetWordList,
        // "validWords": validWords,
        "wordList": englishWordListByLength,
    })
});

