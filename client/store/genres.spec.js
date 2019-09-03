import axios from 'axios'
import reducer, {gotAllGenres} from './genres'
import {expect} from 'Chai'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {
    genres: []
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('genres', () => {
    it('eventually dispatches the GETTING_GENRES action', async() => {
      mockAxios.onGet('/api/album').replyOnce(200, undefined)
      await store.dispatch(gotAllGenres())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GETTING_GENRES')
      expect(actions[0].data).to.be.deep.equal(undefined)
    })
    it('eventually dispatches the GET_GENRES action', async() => {
      const fakeGenres = [{text: 'sludge metal', value: 100}]
      mockAxios.onGet('/api/album').replyOnce(200, fakeGenres)
      await store.dispatch(gotAllGenres())
      const actions = store.getActions()
      expect(actions[1].type).to.be.equal('GET_GENRES')
      expect(actions[1].data.data).to.be.deep.equal(fakeGenres)
    })
  })
})
