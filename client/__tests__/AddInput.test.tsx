// __tests__/AddInput.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddInput from '@/app/components/addItemButton/addInput';

describe('AddInput Component', () => {
  const onCompleteMock = jest.fn();
  const addItemsMock = jest.fn();

  beforeEach(() => {
    render(<AddInput onComplete={onCompleteMock} addItems={addItemsMock} />);
  });

  test('renders input and button', () => {
    const inputElement = screen.getByPlaceholderText('Type here');
    const buttonElement = screen.getByRole('button');

    expect(inputElement).toBeDefined();
    expect(buttonElement).toBeDefined();
  });

  test('displays alert when trying to add empty item', () => {
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    const alertElement = screen.getByText('Cannot add empty item');
    expect(alertElement).toBeDefined();
  });

  test('calls addItems and onComplete with valid input', () => {
    const inputElement = screen.getByPlaceholderText('Type here');
    fireEvent.change(inputElement, { target: { value: 'New Todo Item' } });

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    expect(addItemsMock).toHaveBeenCalledWith(expect.any(Function));
    expect(onCompleteMock).toHaveBeenCalledWith(expect.any(Function));
  });
});
