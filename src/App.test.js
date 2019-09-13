import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {render, fireEvent} from '@testing-library/react'

let mock = new MockAdapter(axios)

const initialData = {
  meta: {
    status: 200
  },
  data: []
}

for (let i = 0; i < 20; i++) {
  initialData.data.push({
    id: i,
    url: `url${i}`,
    title: `Gif ${i}`,
    images: {
      fixed_height_still: { url: `http://google.com/still_url${i}.gif` },
      fixed_height: { url: `http://google.com/animated_url${i}.gif`}
  }})
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Fetches search results', async () => {
  const { getByTestId, getByPlaceholderText, findByAltText } = render(<App />)

  mock.onGet('https://api.giphy.com/v1/gifs/search').reply(200, initialData)

  fireEvent.change(getByPlaceholderText('Search for Gifs'), { target: { value: 'cats' }})
  fireEvent.click(getByTestId('search'))
  
  await findByAltText('Gif 1')
  await findByAltText('Gif 2')
})

it('Fetches more results when the user scrolls to the bottom', async () => {
  const { container, getByTestId, getByPlaceholderText, findByAltText } = render(<App />)

  const moreData = {
    meta: {
      status: 200
    },
    data: []
  }

  for (let i = 20; i < 40; i++) {
    initialData.data.push({
      id: i,
      url: `url${i}`,
      title: `Gif ${i}`,
      images: {
        fixed_height_still: { url: `http://google.com/still_url${i}.gif` },
        fixed_height: { url: `http://google.com/animated_url${i}.gif`}
    }})
  }

  mock.onGet('https://api.giphy.com/v1/gifs/search').reply(200, initialData)

  fireEvent.change(getByPlaceholderText('Search for Gifs'), { target: { value: 'cats' }})
  fireEvent.click(getByTestId('search'))

  await findByAltText('Gif 0')
  await findByAltText('Gif 19')
  
  mock.onGet('https://api.giphy.com/v1/gifs/search').reply(200, moreData)

  fireEvent.scroll(container)

  await findByAltText('Gif 20')
  await findByAltText('Gif 39')
})

it("Displays an error message when there's an error fetching results", async () => {
  const { getByTestId, getByPlaceholderText, findByText } = render(<App />)

  const errorData = {
    meta: {
      status: 400,
      msg: 'Bad request'
    },
    data: []
  }

  mock.onGet('https://api.giphy.com/v1/gifs/search').reply(400, errorData)

  fireEvent.change(getByPlaceholderText('Search for Gifs'), { target: { value: 'cats' }})
  fireEvent.click(getByTestId('search'))

  await findByText('Error 400: Bad request')
})

it("Displays an error message when there's a network error", async () => {
  const { getByTestId, getByPlaceholderText, findByText } = render(<App />)

  mock.onGet('https://api.giphy.com/v1/gifs/search').networkError()

  fireEvent.change(getByPlaceholderText('Search for Gifs'), { target: { value: 'cats' }})
  fireEvent.click(getByTestId('search'))

  await findByText('Error 500: Network Error')
})

it('Displays a loading message when results are loading', async () => {
  const { getByTestId, getByPlaceholderText, findByText } = render(<App />)

  mock.onGet('https://api.giphy.com/v1/gifs/search').reply(200, initialData)

  fireEvent.change(getByPlaceholderText('Search for Gifs'), { target: { value: 'cats' }})
  fireEvent.click(getByTestId('search'))

  await findByText('Loading...')
})

it('Displays a message when there are no more results', async () => {
  const { getByTestId, getByPlaceholderText, findByAltText, findByText } = render(<App />)

  const moreData = {
    meta: {
      status: 200
    },
    data: []
  }

  mock.onGet('https://api.giphy.com/v1/gifs/search').reply(200, initialData)

  fireEvent.change(getByPlaceholderText('Search for Gifs'), { target: { value: 'cats' }})
  fireEvent.click(getByTestId('search'))

  await findByAltText('Gif 1')
  
  mock.onGet('https://api.giphy.com/v1/gifs/search').reply(200, moreData)

  fireEvent.scroll(window)

  await findByText("That's all.")
})

it("When there's no query, shows intro/suggestion text", async () => {
  const { getByTestId, getByPlaceholderText, findByText, getByText } = render(<App />)
  await findByText('Search for gifs.')

  mock.onGet('https://api.giphy.com/v1/gifs/search').reply(200, initialData)

  fireEvent.change(getByPlaceholderText('Search for Gifs'), { target: { value: 'cats' }})
  fireEvent.click(getByTestId('search'))
  fireEvent.click(getByText('Giphy Search'))

  await findByText('Search for gifs.')
})

it('Pauses and unpauses the gif animations', async () => {
  const { getByTestId, getByPlaceholderText, findAllByTestId, getByTitle } = render(<App />)
  mock.onGet('https://api.giphy.com/v1/gifs/search').reply(200, initialData)

  fireEvent.change(getByPlaceholderText('Search for Gifs'), { target: { value: 'cats' }})
  fireEvent.click(getByTestId('search'))

  await findAllByTestId('animated')

  fireEvent.click(getByTitle('Pause animations'))

  await findAllByTestId('paused')

  fireEvent.click(getByTitle('Resume animations'))
  await findAllByTestId('animated')
})
