const swaggerAutoGen = require('swagger-autogen')()
const dotenv = require('dotenv')
dotenv.config()

const doc = {
  info: {
    title: 'Products Api',
    description: 'Products Api for my Byu Class'
  },
  host: `${process.env.BASE_URL}/api/v1`,
  schemes: ['https', 'http']
}

const outputFile = './swagger.json'
const endpointsFiles = ['./src/routes/index.js']


//generate swagger file
swaggerAutoGen(outputFile, endpointsFiles, doc)

