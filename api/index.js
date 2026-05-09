const express = require('express');
const api = express();

const data = [
    {
        unit: "Unit 1: Think Geographically",
        terms: [
            {
                term: "Absolute Location",
                definition: "the exact location of a place, typically given in latitude and longitude"
            },
            {
                term: "Relative Location",
                definition: "the location of a place in relation to other places"
            },
            {
                term: "Site",
                definition: "a place's absolute location and physical characteristics"
            },
            {
                term: "Situation",
                definition: "a place's location in relation to other places or surrounding features"
            }
        ]
    }
];

api.get('/api', (req, res) => {
    res.json(data);
});

api.listen(3000, () => {
    console.log('API is running on port 3000');
});