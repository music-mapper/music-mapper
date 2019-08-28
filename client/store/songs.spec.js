import axios from 'axios'
import reducer, {gotAllLyrics} from './songs'
import {expect} from 'Chai'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const songs = {
    lyrics: []
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(songs)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('songs', () => {
    it('eventually dispatches the GET_LYRICS action', async() => {
      const fakeLyrics = [{Name: 'SAY', Count: 100}]
      mockAxios.onGet('/api/tracks').replyOnce(200, fakeLyrics)
      await store.dispatch(gotAllLyrics())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_LYRICS')
      expect(actions[0].data.data).to.be.deep.equal(fakeLyrics)
    })
  })
})
