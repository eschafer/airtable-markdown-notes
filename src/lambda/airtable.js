exports.handler = async (event, context) => {
  const Airtable = require('airtable')
  await Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY,
  })
  const base = await Airtable.base(process.env.BASE_ID)
  const table = await base('test-table')

  table.create(JSON.parse(event.body)).then((error, record) => {
    if (error) {
      return {
        statusCode: error.statusCode || 500,
        body: JSON.stringify({ error, record }),
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ error, record }),
    }
  })

  /* if (response && response.error) {
    return {
      statusCode: response.error.statusCode || 500,
      body: JSON.stringify(response),
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  } */

  /* return {
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
