import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

import { initAuth } from '../app/services/auth'
initAuth()

class IndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <SEO title="Home" />
        <Link to="/app/">
          Go to App (with Netlify Identity)
        </Link>
      </Layout>
    )
  }
}

export default IndexPage
