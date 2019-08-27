import axios from 'axios'
import reducer, {gotArtistsFreq} from './artists'
import {expect} from 'Chai'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const artists = {
    frequency: [],
    popularity: []
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(artists)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('artists', () => {
    it('eventually dispatches the GET_ARTISTS_FREQ action', async() => {
      const fakeArtists = [{name: 'Selena', value: 1}]
      mockAxios.onGet('/api/artistsFreq').replyOnce(200, fakeArtists)
      await store.dispatch(gotArtistsFreq())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ARTISTS_FREQ')
      expect(actions[0].data).to.be.deep.equal(fakeArtists)
    })
  })
})
