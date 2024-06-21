// __tests__/FilterButton.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FilterButton from '@/app/components/filterButton';
import {TodoDataInterface} from '@/app/helpers/interfaces'

describe('FilterButton Component', () => {
  const data: TodoDataInterface[] = [
    { id: 1, title: 'Test Todo 1', completed: "incomplete", date: '2024-06-20' },
    { id: 2, title: 'Test Todo 2', completed: "completed", date: '2024-06-21' }
  ];
  const setDataMock = jest.fn();

  beforeEach(() => {
    render(<FilterButton data={data} setData={setDataMock} />);
  });

  test('renders filter button', () => {
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDefined();
  });

  test('toggles filter menu on button click', () => {
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    const menuElement = screen.getByText('Sort By:');
    expect(menuElement).toBeDefined();
  });

  test('sorts data by title', () => {
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    const sortByTitle = screen.getByText('Title');
    fireEvent.click(sortByTitle);

    expect(setDataMock).toHaveBeenCalledWith(expect.arrayContaining(data));
  });

  test('sorts data by date', () => {
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    const sortByDate = screen.getByText('Date');
    fireEvent.click(sortByDate);

    expect(setDataMock).toHaveBeenCalledWith(expect.arrayContaining(data));
  });

  test('sorts data by completed status', () => {
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    const sortByCompleted = screen.getByText('Completed');
    fireEvent.click(sortByCompleted);

    expect(setDataMock).toHaveBeenCalledWith(expect.arrayContaining(data));
  });
});
