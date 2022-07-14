export type Config = {
  endpoint: string
  channel: string
  token?: string
}

export type Product = {
  node: {
    id: string
    name: string
    slug: string
    media: [
      {
        url: string
        type: string
      },
    ]
  }
}

export type Products = {
  edges: Product[]
}

const productFragment = `
  id
  name
  slug
  media{
    url
    type
  }
`

const getProducts = `
  query getProducts($search: String) {
    products(first: 100, filter: { search: $search}){
      edges{
        node{
          ${productFragment}
        }
      }
    }
  }
`

export default class SaleorClient {
  endpoint: string
  channel: string
  token?: string

  constructor({ endpoint, channel, token }: Config) {
    this.endpoint = endpoint
    this.channel = channel
    this.token = token
  }

  async productsMatching(search: string) {
    const response = await this.fetch({
      query: getProducts,
      variables: { search },
    })

    return response
  }

  async fetch(requestBody: any) {
    const res = await fetch(this.endpoint, {
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

    return body.data
  }
}
