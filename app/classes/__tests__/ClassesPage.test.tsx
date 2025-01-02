// app/__tests__/ClassesPage.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import ClassesPage from '../pages/classes/page';
import { SessionProvider } from 'next-auth/react';
import '@testing-library/jest-dom/extend-expect';

// Mocking SWR to provide controlled test data
jest.mock('swr', () => {
  return {
    __esModule: true,
    default: (key: string, fetcher: Function) => {
      if (key === '/api/classes/available') {
        return {
          data: [
            {
              id: 3,
              title: 'Leadership Essentials',
              description: 'Develop the core skills to lead effectively.',
              image: '/images/class-leadership.jpg',
            },
          ],
          error: null,
        };
      }
      if (key === '/api/classes/purchased') {
        return {
          data: [
            {
              id: 1,
              title: 'Introduction to Business Management',
              description: 'Learn the basics of managing a successful business.',
              image: '/images/class-business-management.jpg',
              lessons: [
                { id: 1, title: 'Lesson 1: Understanding Management', duration: '10 min' },
              ],
            },
          ],
          error: null,
        };
      }
      return { data: null, error: null };
    },
  };
});

describe('ClassesPage Component', () => {
  it('renders without crashing and displays the header', () => {
    render(
      <SessionProvider session={null}>
        <ClassesPage />
      </SessionProvider>
    );
    expect(screen.getByText('Our Classes')).toBeInTheDocument();
  });

  it('displays available classes', async () => {
    render(
      <SessionProvider session={null}>
        <ClassesPage />
      </SessionProvider>
    );
    expect(await screen.findByText('Leadership Essentials')).toBeInTheDocument();
  });

  it('allows searching for classes', async () => {
    render(
      <SessionProvider session={null}>
        <ClassesPage />
      </SessionProvider>
    );

    const searchInput = screen.getByPlaceholderText('Search classes...');
    expect(searchInput).toBeInTheDocument();

    // Simulate user typing 'Leadership' into the search bar
    fireEvent.change(searchInput, { target: { value: 'Leadership' } });

    // Verify that the searched class is displayed
    expect(await screen.findByText('Leadership Essentials')).toBeInTheDocument();
  });

  it('shows purchased classes when authenticated', async () => {
    const mockSession = {
      user: { name: 'Test User', email: 'test@example.com' },
      accessToken: 'mock-token',
    };

    render(
      <SessionProvider session={mockSession}>
        <ClassesPage />
      </SessionProvider>
    );

    expect(await screen.findByText('Your Purchased Classes')).toBeInTheDocument();
    expect(await screen.findByText('Introduction to Business Management')).toBeInTheDocument();
  });
});