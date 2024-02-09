const { default: mongoose } = require('mongoose');

//Connect to mongodb
mongoose.set('toJSON', {
  transform: (document, resultObject) => {
    resultObject.id = resultObject._id.toString();
    delete resultObject._id;
    delete resultObject.__v;
  }
});

// eslint-disable-next-line no-undef
const url = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@go-databases.8lffn.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(url).then(() => {
  console.log('connect to MongoDB');
}).catch((error) => {
  console.log('error connecting to MongoDB:' + error.message);
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    required: true
  },
  number: Number,
});

module.exports = mongoose.model('Person', personSchema);