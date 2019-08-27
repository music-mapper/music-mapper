import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow, render} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import store from '../store'
import AllGraphPage from './allGraphPage'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllGraphPage', () => {
  // let renderAllGraphPage

  // beforeEach(() => {
  //   renderAllGraphPage = render(<AllGraphPage store={store} />)
  // })

  xit('returns the top level div', () => {
    const wrapper = shallow(<AllGraphPage/>)
    // const returnVal = wrapper.find('#app')
    // console.log(returnVal)
    expect(wrapper.find('.app')).to.have.lengthOf(1)
  })
})
