import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SCButton as Button } from '../stories/Button.stories';

describe('Button', () => {
  it('should render the button without crashing', () => {
    // render the button and get the getByRole method
    const { getByRole } = render(<Button text="test" />);

    // getByRole as its name gets a selector by its role.
    // in this case we're looking for a `button`.
    // then we make sure it's in the document
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('should call the onClick method when a user clicks on the button', () => {
    // mock out our OnClick function
    const mockClick = jest.fn();

    const { getByRole } = render(<Button text="test" onClick={mockClick} />);

    // we store a variable with the button element
    const buttonElement = getByRole('button', { name: 'test' });

    // Simulate a user clicking on the button
    fireEvent.click(buttonElement);

    // check that the function was called once;
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('should have the right text color class name for variants', () => {
    // we extract the "rerender" method to test both variants
    const { getByRole, rerender } = render(<Button text="test" />);

    const buttonElement = getByRole('button', { name: 'test' });

    // if you recall, passing no variant, defaults to "default" variant.
    // this is a bit robust, but it serves to illustarte the point
    expect(buttonElement.classList.contains('text-white')).toBe(true);
    expect(buttonElement.classList.contains('text-red-700')).toBe(false);

    // render the other "warning" variant
    rerender(<Button text={'test'} variant="warning" />);

    // test the opposite of the above:
    expect(buttonElement.classList.contains('text-white')).toBe(false);
    expect(buttonElement.classList.contains('text-red-700')).toBe(true);
  });
});
