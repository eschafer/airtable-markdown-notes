const fetch = require('node-fetch')

exports.handler = async (event, context) => {
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.BASE_ID}/Table%20(testing)`,
      {
        method: event.httpMethod,
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: event.body,
      }
    );
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: String(error)
    };
  }
}
