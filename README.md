# hckrnws - A cleaner reading experience for HackerNews

<img width="1024" height="989" alt="Screenshot 2026-03-27 at 12 18 16" src="https://github.com/user-attachments/assets/c8dc114b-d3c8-4625-9c9c-9e21007c9353" />
<img width="1024" height="989" alt="Screenshot 2026-03-27 at 12 18 09" src="https://github.com/user-attachments/assets/a2f0cb7f-c56b-4483-9399-85280550314b" />
<img width="1024" height="989" alt="Screenshot 2026-03-27 at 12 18 01" src="https://github.com/user-attachments/assets/0e93e6ac-8c68-42fc-b9d2-97810f0f698f" />


## Getting Started

First, run the development server:

```bash
pnpm run dev
```

Build for production:

```bash
pnpm run build
```

## Tech Stack

- [React Router v7](https://reactrouter.com/) - Full-stack React framework
- [React 19](https://react.dev/) - UI library
- [Vite](https://vite.dev/) - Build tool
- [Tailwind CSS v4](https://tailwindcss.com/) - Styling
- [Algolia HN API](https://hn.algolia.com/api) - Hacker News data & search

## Features

- Dark mode (with query parameter support)
- Search across stories and comments via Algolia
- Keyboard shortcuts for navigation
- Comment lines for easier tracking of nested comments
- Quotes are easily identifiable
- Post author tags for identification
- Star stories for reading later
- Multiple feeds: Top, New, Ask HN, Show HN
- Pagination across all feeds

This project is in no way affiliated with YCombinator or Hacker News. All content is sourced from and accredited to them.
