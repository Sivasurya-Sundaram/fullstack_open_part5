import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog/>', () => {
  let container;
  let handleLinkUpdate;
  let handleDelete;
  beforeEach(() => {
    const blog = {
      title: 'test',
      author: 'tester',
      url: 'test.com',
      likes: 2,
      user: { name: 'siva', userName: 'siva' },
    };
    handleLinkUpdate = jest.fn();
    handleDelete = jest.fn();
    container = render(
      <Blog
        blog={blog}
        handleLinkUpdate={handleLinkUpdate}
        handleDelete={handleDelete}
      />
    ).container;
  });
  test('renders title and author name  but not its url or number by default', async () => {
    const simpleView = container.querySelector('.simpleView');
    expect(simpleView).toHaveTextContent('test');
    //await screen.findByText('test');
    const viewButton = await screen.queryByText('View');
    expect(viewButton).not.toBeNull();
    const likebutton = await screen.queryByText('like');
    expect(likebutton).toBeNull();
  });
  test('renders url and likes when view button is clicked', async () => {
    const user = userEvent.setup();
    await user.click(screen.queryByText('View'));
    screen.findByText('test.com');
    screen.findByText('like');
  });
  test('when like button is clicked twice the event handler is fired twice', async () => {
    const user = userEvent.setup();
    await user.click(screen.queryByText('View'));
    const likebutton = await screen.queryByText('like');
    await user.dblClick(likebutton);
    console.log(handleLinkUpdate.mock.calls[0]);
    expect(handleLinkUpdate.mock.calls).toHaveLength(2);
    expect(handleLinkUpdate.mock.calls[0][0].likes).toBe(3);
    expect(handleLinkUpdate.mock.calls[1][0].likes).toBe(4);
  });
});
