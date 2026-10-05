import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import Blog from './Blog'

describe('<Blog />', () => {
  const sampleBlog = {
    id: '12345',
    title: 'Component testing is done with react-testing-library',
    author: 'Full Stack Developer',
    url: 'https://fullstackopen.com',
    likes: 42,
    user: {
      id: 'user1',
      username: 'creatorUser',
      name: 'Creator Name',
    },
  }

  const otherUser = {
    username: 'someoneElse',
    name: 'Someone Else',
    token: 'token123',
  }

  const creatorUser = {
    username: 'creatorUser',
    name: 'Creator Name',
    token: 'token456',
  }

  test('5.27: blog information and likes are displayed to unauthenticated users, buttons are not displayed', () => {
    const { container } = render(
      <Blog blog={sampleBlog} user={null} />
    )

    // Blog title and author are rendered
    expect(screen.getByText(/Component testing is done with react-testing-library/)).toBeDefined()
    expect(screen.getByText(/Full Stack Developer/)).toBeDefined()

    // URL and likes are displayed
    expect(screen.getByText('https://fullstackopen.com')).toBeDefined()
    expect(screen.getByText(/42 likes/)).toBeDefined()

    // Like button and delete button are NOT rendered
    const likeBtn = container.querySelector('[data-testid="like-button"]')
    const deleteBtn = container.querySelector('[data-testid="delete-button"]')
    expect(likeBtn).toBeNull()
    expect(deleteBtn).toBeNull()
  })

  test('5.27: authenticated users who are not the blog creator see only the like button', () => {
    const { container } = render(
      <Blog blog={sampleBlog} user={otherUser} />
    )

    // Like button is shown
    const likeBtn = container.querySelector('[data-testid="like-button"]')
    expect(likeBtn).not.toBeNull()

    // Delete button is NOT shown
    const deleteBtn = container.querySelector('[data-testid="delete-button"]')
    expect(deleteBtn).toBeNull()
  })

  test('5.27: the blog creator sees both the like button and the delete button', () => {
    const { container } = render(
      <Blog blog={sampleBlog} user={creatorUser} />
    )

    // Like button is shown
    const likeBtn = container.querySelector('[data-testid="like-button"]')
    expect(likeBtn).not.toBeNull()

    // Delete button is shown
    const deleteBtn = container.querySelector('[data-testid="delete-button"]')
    expect(deleteBtn).not.toBeNull()
  })

  test('5.15: if the like button is clicked twice, the event handler is called twice', async () => {
    const mockLikeHandler = vi.fn()
    const user = userEvent.setup()

    render(
      <Blog blog={sampleBlog} user={otherUser} handleLike={mockLikeHandler} />
    )

    const likeButton = screen.getByTestId('like-button')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLikeHandler).toHaveBeenCalledTimes(2)
  })
})
