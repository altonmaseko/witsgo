const express = require('express');
const fs = require('fs');
const axios = require('axios');
const { PdfReader } = require('pdfreader');



const router = express.Router();
//get the bus schedule pdf from site
const pdfUrl = 'https://www.wits.ac.za/media/wits-university/campus-life/documents/CampusBusSchedule24.pdf';
const pdfPath = 'downloadedSchedule.pdf';

const newPdfUrl = 'https://witsgobackend.azurewebsites.net/v1/schedule/pdf-text';
const newPdfPath = 'downloadedNewSchedule.pdf';

// router.get('/pdf-text', (req, res) => {
//   axios({
//     url: pdfUrl,
//     method: 'GET',
//     responseType: 'stream',
//   })
//     .then(response => {
//       response.data.pipe(fs.createWriteStream(pdfPath))//pipe the pdf to the file
//         .on('finish', () => {
//           const items = []; // Store extracted text

//           new PdfReader().parseFileItems(pdfPath, (err, item) => {//parse the pdf file
//             if (err) {
//               console.error(err);
//               res.status(500).send('Error reading PDF');
//             } else if (!item) {
//               res.send({"data":items.join('<br/>')});
//             } else if (item.text) {
//               items.push(item.text);
//             }
//           });
//         });
//     })
//     .catch(err => {
//       console.error('Error fetching the PDF:', err);//error handling
//       res.status(500).send('Error downloading the PDF');
//     });
// });

router.get('/pdf-text', (req, res) => {
  const responseData = {
    data: `SATURDAY AND SUNDAY <br/> 
           <br/> NB <br/> – <br/> 
           <br/> For Public Holidays, the Sunday Schedule is used. <br/> 
           <br/> Route 1 <br/> – <br/> 
           <br/> Full Circuit (excluding WJ RESIDENCE) <br/> 
           <br/> AMIC > NSW > WJ (PARKLANE) > WEC > EOH > KNK > AMIC <br/> 
           <br/> 09:00 to 20:00 <br/> - <br/> 
           <br/> normal circuit on the hour <br/> 
           <br/> All circuit and Rosebank buses MUST go via Noswall (Cnr. Ameshoff St. & Jan Smuts Avenue) throughout the day. <br/> 
           <br/> Over weekends the circuit bus stops in Park Lane. The last circuit bus leaves AMIC deck at 20:00 <br/> 
           <br/> <br/> Route 3C <br/> 
           <br/> WJ > WEC > AMIC > WEC > WJ <br/> 
           <br/> 09:00 to 10:00 <br/> – <br/> 
           <br/> continuous shuttle, “drop & go” <br/> 
           <br/> 10:00 to 20:00 <br/> – <br/> 
           <br/> hourly on the hour from WJ <br/> 
           <br/> The last bus departs AMIC at 20:00 <br/> 
           <br/> <br/> Route 6A <br/> – <br/> 
           <br/> AMIC | KNK | ROSEBANK | KNK| AMIC <br/> 
           <br/> AMIC > KNK > ROSEBANK > KNK > AMIC > ROSEBANK <br/> 
           <br/> Saturdays: 09:00 to 17:00 <br/> – <br/> 
           <br/> every hour from AMIC <br/> 
           <br/> (Last Departure from Rosebank is at 17:00) <br/> 
           <br/> Sundays: 09:00 to 15:00 <br/> – <br/> 
           <br/> hourly <br/> 
           <br/> (Last Departure from Rosebank is at 15:00) <br/> 
           <br/> <br/> Route 6B <br/> – <br/> 
           <br/> AMIC | NSW| ROSEBANK <br/> 
           <br/> AMIC > NSW > ROSEBANK > NSW > AMIC <br/> 
           <br/> Saturdays: 09:00 to 17:00 <br/> – <br/> 
           <br/> every hour from AMIC <br/> 
           <br/> (Last Departure from Rosebank is at 17:00) <br/> 
           <br/> Sundays: 09:00 to 15:00 <br/> – <br/> 
           <br/> hourly <br/> 
           <br/> (Last Departure from Rosebank is at 15:00) <br/> 
           <br/> <br/> Route 6C <br/> – <br/> 
           <br/> WEC | EOH | ROSEBANK <br/> 
           <br/> WEC > EOH > ROSEBANK > EOH > WEC <br/> 
           <br/> Saturdays: 09:00 to 17:00 <br/> – <br/> 
           <br/> every hour from WEC <br/> 
           <br/> (Last Departure from Rosebank is at 17:00) <br/> 
           <br/> Sundays: 09:00 to 15:00 <br/> – <br/> 
           <br/> hourly <br/> 
           <br/> (Last Departure from Rosebank is at 15:00) <br/> 
           <br/> <br/> Route 6D <br/> – <br/> 
           <br/> WJ | ROSEBANK <br/> 
           <br/> WJ > ROSEBANK > WJ <br/> 
           <br/> Saturdays: 09:00 to 17:00 <br/> – <br/> 
           <br/> every hour from WJ <br/> 
           <br/> (Last Departure from Rosebank is at 17:00) <br/> 
           <br/> Sundays: 09:00 to 15:00 <br/> – <br/> 
           <br/> hourly <br/> 
           <br/> (Last Departure from Rosebank is at 15:00) <br/> 
           <br/> <br/> <br/> • <br/> 
           <br/> 6A & 6B BUSES SHOULD DROP OFF STUDENTS OPPOSITE WITS ANGLO AMERICAN DIGITAL DOME (PREVIOUSLY KNOWN AS PLANET ARIUM)<br/> 
           <br/> AND AMIC DECK BUS STOP EN ROUTE FROM ROSEBANK MALL.<br/> 
           <br/> • <br/> THE BUS SERVICE IS PROVIDED ONLY FOR WITS REGISTERED STUDENTS!<br/> 
           <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> MONDAY TO FRIDAY <br/> 
           <br/> Route 1 <br/> – <br/> 
           <br/> Full Circuit <br/> 
           <br/> AMIC > NSW > WJ > WEC > EOH > KNK > AMIC <br/> 
           <br/> 06:30 to 17:00 <br/> – <br/> 
           <br/> every 15 – 20 minutes, “drop & go” (Normal Circuit) <br/> 
           <br/> AMIC > KNK > EOH > WEC > WJ > NSW > AMIC <br/> 
           <br/> 06:30 to 18:00 <br/> – <br/> 
           <br/> every 15 – 20 minutes, “drop & go” (Reverse Circuit) <br/> 
           <br/> 18:30 to 23:30 “reverse” circuit on the half hour <br/> 
           <br/> 18:00 – 00:00 – normal circuit on the hour <br/> 
           <br/> The last reverse circuit bus departs AMIC Deck at 23:30 <br/> 
           <br/> The last normal circuit bus departs AMIC Deck at 00:00 <br/> 
           <br/> All circuit buses MUST go via Noswall (Cnr. Ameshoff St. & Jan Smuts Avenue) throughout the day. <br/> 
           <br/> All circuit buses MUST go via Rock Ridge Road throughout the day.<br/> 
           <br/> <br/> <br/> Route 2 <br/> – <br/> 
           <br/> NSW I WEC | AMIC NSW | WEC <br/> 
           <br/> 2B <br/> – <br/> 
           <br/> NSW > WEC > AMIC > NSW > WEC <br/> 
           <br/> 06:45 to 08:45 <br/> – <br/> 
           <br/> every 30 minutes (Shuttle) <br/> 
           <br/> 09:00 to 18:00 <br/> – <br/> 
           <br/> hourly on the hour from WEC <br/> 
           <br/> <br/> Route 3 <br/> – <br/> 
           <br/> WJ I WEC I AMIC <br/> 
           <br/> 3A <br/> - <br/> 
           <br/> WJ > AMIC > WJ <br/> 
           <br/> 07:00 to 09:00 <br/> – <br/> 
           <br/> every 15 – 20 minutes (Shuttle) <br/> 
           <br/> 09:00 to 17:00 <br/> – <br/> 
           <br/> hourly on the hour from WJ <br/> 
           <br/> 12:00 to 14:00 <br/> – <br/> 
           <br/> every 20 minutes (Shuttle) <br/> 
           <br/> 16:00 to 18:00 <br/> – <br/> 
           <br/> every 20 minutes (Shuttle) <br/> 
           <br/> 09:30 to 17:30 <br/> – <br/> 
           <br/> hourly on the half hour from AMIC Deck <br/> 
           <br/> 18:30; 19:30; 20:30; 21:30; 22:30; 22:30; 23:30 (Departs WJ) <br/> 
           <br/> 18:00; 19:00; 20:00; 21:00; 22:00; 22:00; 23:00 (Departs AMIC) <br/> 
           <br/> The last bus departs WJ at 23:30 <br/> 
           <br/> The last bus departs AMIC at 23:00 <br/> 
           <br/> <br/> Route 4 <br/> – <br/> 
           <br/> AMIC | EOH | WEC | AMIC <br/> 
           <br/> AMIC > EOH > WEC > AMIC <br/> 
           <br/> 07:00 to 08:45 <br/> – <br/> 
           <br/> every 30 minutes (Shuttle) <br/> 
           <br/> 09:00 to 17:00 <br/> – <br/> 
           <br/> hourly on the hour from AMIC <br/> 
           <br/> <br/> Route 5 <br/> – <br/> 
           <br/> NSW | WEC | ROSEBANK | AMIC <br/> 
           <br/> NSW > WEC > ROSEBANK > AMIC > NSW <br/> 
           <br/> 07:30 to 17:00 <br/> – <br/> 
           <br/> hourly on the hour from NSW <br/> 
           <br/> 17:00 to 18:00 <br/> – <br/> 
           <br/> every 30 minutes from WEC <br/> 
           <br/> <br/> Route 6 <br/> – <br/> 
           <br/> AMIC | ROSEBANK | AMIC <br/> 
           <br/> AMIC > ROSEBANK > AMIC <br/> 
           <br/> 08:30 to 15:00 <br/> – <br/> 
           <br/> every hour from AMIC <br/> 
           <br/> (Last Departure from AMIC is at 15:00) <br/> 
           <br/> <br/> All circuit and Rosebank buses MUST go via Noswall (Cnr. Ameshoff St. & Jan Smuts Avenue) throughout the day. <br/> 
           <br/> All circuit buses MUST go via Rock Ridge Road throughout the day.`,
    meta: {
      source: "Extracted from Wits University PDF schedule",
      updatedAt: new Date().toISOString(),
    },
  };
  res.set('Content-Type', 'application/json');
  res.json(responseData);
});


router.get('/new-schedule', (req, res) => {
    axios({
      url: newPdfUrl,
      method: 'GET',
      responseType: 'stream',
    })
      .then(response => {
        response.data.pipe(fs.createWriteStream(newPdfPath))//pipe the pdf to the file
          .on('finish', () => {
            const items = []; // Store extracted text
  
            new PdfReader().parseFileItems(newPdfPath, (err, item) => {//parse the pdf file
              if (err) {
                console.error(err);
                res.status(500).send('Error reading New Schedule PDF');
              } else if (!item) {
                res.send(items.join('<br/>'));
              } else if (item.text) {
                items.push(item.text);//push the text to the array
              }
            });
          });
      })
      .catch(err => {
        console.error('Error fetching the New Schedule PDF:', err);
        res.status(500).send('Error downloading the New Schedule PDF');
      });
  });


module.exports = router

