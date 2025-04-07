import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
const PORT = 3000;
dotenv.config();
 
const MY_KEY = process.env.ApiKey;


const accessId = `${MY_KEY}`;
const baseUrl = 'https://api.resrobot.se/v2.1/departureBoard';
const ids = [
    'A=1@O=%C3%84ngelholm%20Stortorget@X=12860292@Y=56243096@U=1@L=740031349',
    'A=1@O=Sundsg%C3%A5rden%20(Helsingborg%20kn)@X=12764898@Y=55988944@U=1@L=740027543'
];

const fetchDepartureBoards = async () => {
    try {
        const requests = ids.map(async id => {
            const url = `${baseUrl}?id=${id}&format=json&accessId=${accessId}`;
            const response = await fetch(url);
            return await response.json();
        });

        const results = await Promise.all(requests);
        console.log(results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};