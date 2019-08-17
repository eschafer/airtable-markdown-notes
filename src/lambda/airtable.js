exports.handler = async (event, context) => {
  const Airtable = require('airtable')
  await Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY,
  })
  const base = await Airtable.base(process.env.BASE_ID)
  const table = await base('test-table')

  const response = await table.create(
    JSON.parse(event.body),
    (error, record) => {
      console.log('error', error)
      console.log('record', record)
      return new Promise((resolve, reject) => {
        resolve({ error, record })
      })
    }
  )

  if (response.error) {
    return {
      statusCode: response.error.statusCode || 500,
      body: String(response.error),
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify(response.record),
  }
}
