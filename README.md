# Irish Lotto Results

A modern, responsive web application built with Next.js 14 that displays Irish Lotto results, including the main draw, Plus 1, Plus 2, and raffle results.

## Features

- 🎯 Real-time lottery results display
- 📱 Fully responsive design for all devices
- 🔍 SEO optimized with meta tags and structured data
- ⚡ Fast loading with skeleton states
- 📅 Historical results with date navigation
- 💰 Detailed prize breakdowns
- 🎲 Raffle results
- 🌙 Smooth animations and transitions
- ♿ Accessibility focused with ARIA labels
- 🔄 Automatic updates for latest results

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org)
- **Database**: [MongoDB](https://www.mongodb.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Deployment**: [Vercel](https://vercel.com)
- **Icons**: [Lucide Icons](https://lucide.dev)
- **Date Handling**: [date-fns](https://date-fns.org)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/ZellRaihan/irishlotto.git
```

2. Install dependencies:
```bash
cd irishlotto
npm install
```

3. Set up environment variables:
Create a `.env.local` file with the following:
```
MONGODB_URI=your_mongodb_connection_string
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

- `/app` - Next.js 14 app directory with route handlers and pages
- `/components` - Reusable UI components
- `/lib` - Database and utility functions
- `/public` - Static assets
- `/utils` - Helper functions and formatters

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

- Raihan ([GitHub](https://github.com/ZellRaihan))

## Acknowledgments

- Irish National Lottery for the data
- Next.js team for the amazing framework
- Vercel for hosting
