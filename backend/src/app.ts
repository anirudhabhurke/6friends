import express from 'express';
import { connect } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_ATLAS_URI!;
const PORT_NO = process.env.PORT || 8000;

const app = express();

app.use('/graphql');

connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
      .then(() => {
            app.listen(PORT_NO, () => {
                  console.log(`Server started at http://localhost:${PORT_NO}`);
            });
      })
      .catch((error) => console.log(error));
