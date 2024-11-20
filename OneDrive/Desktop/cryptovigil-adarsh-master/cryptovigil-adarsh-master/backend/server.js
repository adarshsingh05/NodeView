import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/SignUp', (req, res) => {
    res.send('Signup Page');

});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});