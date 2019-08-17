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
      if (error) {
        console.error(err)
        return
      }
      console.log(record.getId())
      return
    }
  )

  console.log(response)

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  }

  /* if (err) {
    return {
      statusCode: error.statusCode || 500,
      body: String(error),
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify(record),
  } */
}
