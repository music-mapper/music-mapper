import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow, render} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import store from '../store'
import AuthForm from './authForm'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AuthForm', () => {
  let renderAuthForm

  beforeEach(() => {
    renderAuthForm = render(<AuthForm store={store} />)
  })

  it('renders the motto in an h1', () => {
    expect(renderAuthForm.find('h1').text()).to.be.equal(
      'Visualize Your Taste in Music'
    )
  })

  it(`renders a '.container'`, () => {
    const wrapper = shallow(<AuthForm />)
    expect(wrapper.find('.container')).to.have.lengthOf(1)
  })
})
