import { render, screen } from '@testing-library/react';
import App from './App';
  
import React from 'react';
import { Link } from 'react-router-dom';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe('<Nav />', () => {
  let wrapper
  beforeEach(() => {
      wrapper = shallow(<Landing />)
  })

  it('Deberia renderizar un boton', () => {
      expect(wrapper.find('button')).toHaveLength(1);
  });
  it('Deberia renderizar un <Link>', () => {
      expect(wrapper.find(Link)).toHaveLength(1);

  });
  it('El Link debe cambiar la ruta hacia "/home"', () => {
      expect(wrapper.find(Link).prop('to')).toEqual('/home');
  });
})