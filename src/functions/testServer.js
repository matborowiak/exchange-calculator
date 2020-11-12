import { rest } from 'msw'
import { setupServer } from 'msw/node'

const fakeServerResponse = { rates: { EUR: 0.9, GBP: 0.65 } }
const server = setupServer(
  rest.get('https://openexchangerates.org/api/latest.json', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(fakeServerResponse))
  })
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => {
  server.resetHandlers()
})

export { server, rest }
