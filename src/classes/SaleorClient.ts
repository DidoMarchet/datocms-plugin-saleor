export type Config = {
  backendUrl: string
  dashboardUrl?: string
  channel: string
  token?: string
}

export type Media = {
  url: string
  type: string
}

export type Product = {
  id: string
  name: string
  slug: string
  variants: [
    {
      sku: string
    },
  ]
  media: [Media]
}

export type Node = {
  node: Product
}

export type Products = {
  edges: Node[]
}

export type ErrorApi = {
  message: string
}

const productFragment = `
  id
  name
  slug
  variants {
    sku
  }
  media{
    url
    type
  }
`

const getProducts = `
  query getProducts($search: String, $channel: String) {
    products(first: 100, filter: { search: $search}, channel: $channel){
      edges{
        node{
          ${productFragment}
        }
      }
    }
  }
`

const getProduct = `
  query getProducts($id: ID, $channel: Strin) {
    product(id: $id, channel: $channel){
      ${productFragment}
    }
  }
`

export default class SaleorClient {
  backendUrl: string
  dashboardUrl?: string
  channel: string
  token?: string

  constructor({ backendUrl, dashboardUrl, channel, token }: Config) {
    this.backendUrl = backendUrl.endsWith('/') ? backendUrl.slice(0, -1) : backendUrl
    this.dashboardUrl =
      dashboardUrl && dashboardUrl.endsWith('/') ? dashboardUrl.slice(0, -1) : dashboardUrl
    this.channel = channel
    this.token = token
  }

  async productsMatching(search: string) {
    const response = await this.fetch({
      query: getProducts,
      variables: { search, channel: this.channel },
    })

    return response
  }

  async productMatching(id: string) {
    const response = await this.fetch({
      query: getProduct,
      variables: { id, channel: this.channel },
    })

    return response
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  async fetch(requestBody: any) {
    const res = await fetch(`${this.backendUrl}/graphql/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(requestBody),
    })

    if (res.status !== 200) {
      throw new Error(`Invalid status code: ${res.status}`)
    }

    const contentType = res.headers.get('content-type')

    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Invalid content type: ${contentType}`)
    }

    const body = await res.json()

    if (body.errors) {
      body.errors.forEach(({ message }: ErrorApi) => {
        throw new Error(message)
      })
    }

    return body.data
  }
}
