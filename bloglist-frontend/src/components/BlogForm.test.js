import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';
describe('<BlogForm/>', () => {
  test('calls the event handler with correct details', async () => {
    const mockHandler = jest.fn();
    const user = userEvent.setup();
    render(<BlogForm createBlog={mockHandler} />);
    const inputs = await screen.getAllByRole('textbox');
    await user.type(inputs[0], 'test');
    await user.type(inputs[1], 'tester');
    await user.type(inputs[2], 'test.com');
    const submit = await screen.getByText('Create');
    await user.click(submit);
    expect(mockHandler.mock.calls).toHaveLength(1);
  });
});
