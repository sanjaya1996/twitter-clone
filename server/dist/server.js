"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.get('/', (req, res) => {
    res.send('Twitter-Clone API is up and running!');
});
const port = process.env.PORT || 5000;
app.listen(5000, () => console.log(`App Listening on Port ${port}`));
