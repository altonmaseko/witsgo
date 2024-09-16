const express = require('express');
const fs = require('fs');
const axios = require('axios');
const { PdfReader } = require('pdfreader');



const router = express.Router();

const pdfUrl = 'https://www.wits.ac.za/media/wits-university/campus-life/documents/CampusBusSchedule24.pdf';
const pdfPath = 'downloadedSchedule.pdf';


router.get('/pdf-text', (req, res) => {
  axios({
    url: pdfUrl,
    method: 'GET',
    responseType: 'stream',
  })
    .then(response => {
      response.data.pipe(fs.createWriteStream(pdfPath))
        .on('finish', () => {
          const items = []; // Store extracted text

          new PdfReader().parseFileItems(pdfPath, (err, item) => {
            if (err) {
              console.error(err);
              res.status(500).send('Error reading PDF');
            } else if (!item) {
              res.send(items.join('<br/>'));
            } else if (item.text) {
              items.push(item.text);
            }
          });
        });
    })
    .catch(err => {
      console.error('Error fetching the PDF:', err);
      res.status(500).send('Error downloading the PDF');
    });
});


module.exports = router

