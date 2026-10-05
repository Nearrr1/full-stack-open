import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('5.16: calls event handler with right details when a new blog is created', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('write blog title here')
    const authorInput = screen.getByPlaceholderText('write blog author here')
    const urlInput = screen.getByPlaceholderText('write blog url here')
    const sendButton = screen.getByText('create')

    await user.type(titleInput, 'Testing React Components with Vitest')
    await user.type(authorInput, 'Vitest Master')
    await user.type(urlInput, 'https://vitest.dev')
    await user.click(sendButton)

    expect(createBlog).toHaveBeenCalledTimes(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: 'Testing React Components with Vitest',
      author: 'Vitest Master',
      url: 'https://vitest.dev',
    })
  })
})
