BEGIN;

CREATE TABLE puppies (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  likes INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT current_timestamp
);

COPY puppies (name, url)
-- UPDATE THIS PATH WITH YOUR OWN!
FROM '/Users/krystynamalewski/code/wdi/labs/puppiesapi/db/puppies.csv' with (format csv, delimiter ',');

COMMIT;
