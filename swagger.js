const swaggerAutoGen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'Products Api',
    description: 'Products Api for my Byu Class'
  },
  host: 'https://cse341-project2-1.onrender.com/api/v1/api/v1',
  schemes: ['https']
}

const outputFile = './swagger.json'
const endpointsFiles = ['./src/routes/index.js']


//generate swagger file
swaggerAutoGen(outputFile, endpointsFiles, doc)

