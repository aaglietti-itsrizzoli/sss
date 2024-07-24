CREATE TABLE IF NOT EXISTS Profiles (
    id uuid DEFAULT gen_random_uuid(),
    PRIMARY KEY (id)
);

-- to insert fake data
-- INSERT INTO profiles (id) VALUES (gen_random_uuid());
