const express = require('express');
const app =  express();

app.use(express.json())

const reservations = [
    { id: 1, name: 'Ranou'},
    { id: 2, name: 'Sayou'},
    { id: 3, name: 'Willy'},
    { id: 4, name: 'Sisi'},
    { id: 5, name: 'Lilurace'}

];

app.get('/', (req, res) => {
    res.send('Hey You');
});
//GET-Request um alle Buchungen anzuzeigen
app.get('/api/reservations', (req, res) => {
    res.send(reservations);

});
//GET-Request um eine Buchung anzuzeigen
app.get('/api/reservations/:id', (req, res) => {
    const reservation = reservations.find(c =>  c.id === parseInt(req.params.id));
    if (!reservation) res.status(404).send('The reservation with the given ID was not found.');
    res.send(reservation);
});
//POST-Request um eine Buchung zu erzeugen
app.post('/api/reservations', (req, res) => {

    if(!req.body.name || req.body.name.lengt < 3) {
        //400 Request
         res.status(400).send(' Name is required and should be minimum 3 characters.');
         return;
    };

    const reservation = {  //ich benutze einen const, weil ich ja brauche das objekt reservation später nicht mehr zurückzusetzen
        id: reservations.lenght + 1,
        name: req.body.name
    };
    reservations.push(reservation);
    res.send(reservation);
});
//PUT-Request um eine Buchung zu ändern


app.put('/api/reservations/:id', (req, res) => {

    // look up the reservation

    const reservation = reservations.find(c => c.id === parseInt(req.params.id));
    if(!reservation) res.status(404).send('The reservation with the given Id was not found');


                                        // if not existing, return 404
                                       // if existing, validate
                                      // if invalid, return 404


    reservation.name = req.body.name;  // update the reservation
    res.send(reservation);            // and return the updated reservation to the client

});

app.delete('/api/reservations/:id', (req, res) => {

    //  Look up the reservavtion
    // Not existing, return 404 Error

    const reservation = reservations.find(c => c.id === parseInt(req.params.id));
    if(!reservation) res.status(404).send('The reservation with the given Id was not found');

    // To Delete
    // We store the index in a constant, we find the index of the reservation in the reservation_array
    const index = reservations.indexOf(reservation);
    reservations.splice(index, 1); // With the splice_Method we go to the index and remove one Object from our reservation_array

    // Return the deleted reservation
    res.send(reservation);
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...` ));
