exports.handler = async (event, context) => {
  try {
    const Airtable = require('airtable')
    await Airtable.configure({
      endpointUrl: 'https://api.airtable.com',
      apiKey: process.env.AIRTABLE_API_KEY,
    })
    const base = await Airtable.base(process.env.BASE_ID)
    const table = await base('test-table')

    const record = await table.create(JSON.parse(event.body))

    return {
      statusCode: 200,
      body: JSON.stringify({ record }),
    }
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error }),
    }
  }
}
