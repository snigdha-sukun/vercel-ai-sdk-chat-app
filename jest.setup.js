// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

// Mock fetch for API requests
fetchMock.enableMocks();

// Mock the Vercel AI SDK hooks
jest.mock('@ai-sdk/react', () => ({
    useChat: jest.fn(),
    useSpeechRecognition: jest.fn(),
}));

// Mock Next.js router
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
        back: jest.fn(),
        pathname: '/',
        query: {},
    })),
    usePathname: jest.fn(() => '/'),
}));