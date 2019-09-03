import axios from 'axios'
import reducer, {gotAllFeatures} from './features'
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
    features: []
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('features', () => {
    it('eventually dispatches the GETTING_FEATURES action', async() => {
      mockAxios.onGet('/api/features').replyOnce(200, undefined)
      await store.dispatch(gotAllFeatures())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GETTING_FEATURES')
      expect(actions[0].data).to.be.deep.equal(undefined)
    })
    it('eventually dispatches the GET_FEATURES action', async() => {
      const fakeFeatures = [{name: 'danceability', value: 1}]
      mockAxios.onGet('/api/features').replyOnce(200, fakeFeatures)
      await store.dispatch(gotAllFeatures())
      const actions = store.getActions()
      expect(actions[1].type).to.be.equal('GET_FEATURES')
      expect(actions[1].data.data).to.be.deep.equal(fakeFeatures)
    })
  })
})
