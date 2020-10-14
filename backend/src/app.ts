import express from 'express';
import { connect } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_ATLAS_URI!;

const app = express();

app.use('/graphql');

connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
      .then(() => {
            app.listen(8000, () => {
                  console.log('Server started at http://localhost:8000');
            });
      })
      .catch((error) => console.log(error));
