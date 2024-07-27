## More about the Project
# Project Description
DepViz is a developer tool designed to simplify the process of understanding and managing project dependencies. It allows users to upload a project file, such as package.json for Node.js projects, and generates a visual graph of all dependencies. Users can click on each dependency to see detailed information, making it easier to track and manage complex dependency trees.

# What the Project Does
1. Upload Project File: Users can upload a project file (e.g., package.json).
2. Parse Dependencies: The backend parses the uploaded file to extract dependency information.
3. Visualize Dependencies: The frontend uses D3.js to generate a visual graph representing the dependencies and their relationships.
4. Show Dependency Details: Users can click on any node in the graph to view detailed information about that dependency, such as its version and any sub-dependencies.

# Steps you could follow to get this running on your system:
1. Clone the Repo
2. Open Terminal and run ```npx create-next-app@latest```
3. In terminal, <br>
    a. cd depviz <br>
    b. code . (if you have VS Code or use Cursor) - this should open your code editor.
4. In VS Code - Open Terminal - Run ```npm run dev``` - opens up localhost:3000

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
