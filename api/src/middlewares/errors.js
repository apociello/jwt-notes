// No route matched the request
export const notFound = (req, res) => {
  res.status(404).json({ error: 'Not found' });
};

// Every error ends up here: thrown in a controller (Express 5 forwards async
// errors on its own) or passed to next(err). The client always gets JSON.
export const errorHandler = (err, req, res, next) => {
  // The body sent as JSON couldn't be parsed by express.json()
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  // Prisma: a @unique field already has that value (username is the only one)
  if (err.code === 'P2002') {
    return res.status(409).json({ error: 'Username already taken' });
  }

  // Unexpected: the details stay in the server log, never in the response
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
};
