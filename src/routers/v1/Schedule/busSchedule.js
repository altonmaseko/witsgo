const express = require('express');
const router = express.Router();
const BusScheduleController = require('../../../controllers/BusSchedule/busSchedule');

router.get('/api/bus-schedule', async (req, res) => {
    try {
        const result = await BusScheduleController.getDoc({});
        if (result.success) {
            res.json(result.data);
        } else {
            res.status(404).json({ message: result.message });
        }
    } catch (error) {
        console.error('Error fetching bus schedule:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;



// const express = require('express');
// const router = express.Router();
// //get the bus schedule pdf from site
// const pdfUrl = 'https://www.wits.ac.za/media/wits-university/campus-life/documents/CampusBusSchedule24.pdf';
// const pdfPath = 'downloadedSchedule.pdf';

// const newPdfUrl = 'https://witsgobackend.azurewebsites.net/v1/schedule/pdf-text';
// const newPdfPath = 'downloadedNewSchedule.pdf';

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
//               res.send(items.join('<br/>'));
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

// router.get('/new-schedule', (req, res) => {
//     axios({
//       url: newPdfUrl,
//       method: 'GET',
//       responseType: 'stream',
//     })
//       .then(response => {
//         response.data.pipe(fs.createWriteStream(newPdfPath))//pipe the pdf to the file
//           .on('finish', () => {
//             const items = []; // Store extracted text
  
//             new PdfReader().parseFileItems(newPdfPath, (err, item) => {//parse the pdf file
//               if (err) {
//                 console.error(err);
//                 res.status(500).send('Error reading New Schedule PDF');
//               } else if (!item) {
//                 res.send(items.join('<br/>'));
//               } else if (item.text) {
//                 items.push(item.text);//push the text to the array
//               }
//             });
//           });
//       })
//       .catch(err => {
//         console.error('Error fetching the New Schedule PDF:', err);
//         res.status(500).send('Error downloading the New Schedule PDF');
//       });
//   });


// module.exports = router;