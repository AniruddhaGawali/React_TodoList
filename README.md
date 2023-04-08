This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Detail about Submission

The table should have the following columns:
a. Timestamp created: Timestamp at which a task was created.
Should be auto set when creating a new entry. A user should not be able to edit this.
b. Title: Title of the task to be done.
i. A user can set this while creating a new entry. A user can also change
this updating existing entry.
ii. Max length: 100 characters.
iii. Mandatory field
c. Description: Description of the task to be done.
i. A user can add details about this task.
ii. Max length: 1000 characters
iii. Mandatory field
d. Due Date: Expected due date to finish the task
i. A user can set this while creating a new entry. A user can also change this updating existing entry.
ii. Optional field
e. Tag: One or more tags which user can add to the entry
i. A user can set this while creating a new entry. A user can also change this updating existing entry. Multiple tags can be added to the same entry
ii. Optional field
iii. Multiple tags with the same value should be saved only once.
f. Status: Shows status of a task
i. Should be one of these values.

1. OPEN (Default value) 2. WORKING
2. DONE
3. OVERDUE
   ii. Mandatory field
4. The table should support pagination.
5. User should be able to perform the following operations:
   a. ADD a new to-do entry

b. MODIFY an existing to-do entry
c. DELETE an existing to-do entry
d. SORT the table using columns a., b., c. and d. given above in both ascending
and descending formats
e. FILTER the table using e. and f. Columns. 5. Provide a search bar on the top where a user can perform a case-insensitive search for any task based on the data in any of the above-mentioned columns. 6. Make use of mock APIs to ensure that the app is fully functional. [No database or backend coding required.]
