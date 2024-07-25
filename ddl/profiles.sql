CREATE TABLE IF NOT EXISTS profiles (
    id uuid DEFAULT gen_random_uuid(),
    created_at timestamp NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);

-- to insert fake data
-- INSERT INTO profiles (id) VALUES (gen_random_uuid());
