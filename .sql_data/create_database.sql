CREATE TABLE IF NOT EXISTS "Counter" (
    id SERIAL PRIMARY KEY,
    looked_overall INT DEFAULT 0,
    tapped_overall INT DEFAULT 0
);

INSERT INTO "Counter" (looked_overall, tapped_overall)
SELECT 0, 0
WHERE NOT EXISTS (SELECT 1 FROM "Counter");