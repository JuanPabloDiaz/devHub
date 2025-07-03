# Contributing to DevHub

Thank you for considering contributing to DevHub! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and considerate of others.

## How Can I Contribute?

### Reporting Bugs

If you find a bug, please create an issue with the following information:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Your environment (browser, OS, etc.)

### Suggesting Enhancements

We welcome suggestions for improvements! Please create an issue with:
- A clear, descriptive title
- A detailed description of the proposed enhancement
- Any relevant examples or mockups

### Pull Requests

We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Submit your pull request!

## Development Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd flags
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Style Guide

### JavaScript/React

- Use ES6+ features
- Follow the existing code style
- Use functional components with hooks
- Add JSDoc comments for functions and components

### CSS/Styling

- Use Tailwind CSS utility classes
- Follow the existing color scheme and design patterns

## Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests after the first line

## Adding New Countries or Data

When adding new country data:
1. Ensure the data is accurate and from reliable sources
2. Follow the existing data structure in `data/countries.json`
3. Verify that all URLs for images are valid and accessible
4. Add appropriate attribution for data sources

## Testing

- Run tests before submitting a pull request:
```bash
npm run test
```

- Ensure your changes don't break existing functionality

## Documentation

- Update the README.md if you change functionality
- Comment your code where necessary
- Update API documentation if you modify endpoints

## Questions?

If you have any questions about contributing, please open an issue with your question.

Thank you for contributing to Countries Explorer!
