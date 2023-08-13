-- db_auth_service.sql

BEGIN;

CREATE EXTENSION IF NOT EXISTS moddatetime;
CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- TEST TABLE

DROP TABLE IF EXISTS test_table;

CREATE TABLE test_table (
	id serial NOT NULL PRIMARY KEY,
	name text NOT NULL
);

INSERT INTO test_table
(name)
VALUES
('hello database');



-- IDENTITY ENTITY

DROP TABLE IF EXISTS identity;

CREATE TABLE identity (
	id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
	user_name character varying(255) NOT NULL,
	passw character varying(255) NOT NULL,
	status boolean NOT NULL DEFAULT true,
	created timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER identity_update_ts
    BEFORE UPDATE ON identity
    FOR EACH ROW
    EXECUTE PROCEDURE moddatetime (updated);

CREATE UNIQUE INDEX identity_user_name_idx ON identity (user_name);


-- DATA INSERT

INSERT INTO public.identity (id, user_name, passw, status, created, updated) VALUES ('ef02829a-1d74-4451-a218-39fc03359ea6', 'efinkle0', '$2a$04$ZrWL39sXeWKQWJduQzKuFO9f9iaLNbvOzyGGgE8f5eJ4QwDmwxTvC', true, '2023-08-13 23:15:38.408421+02', '2023-08-13 23:15:38.408421+02');
INSERT INTO public.identity (id, user_name, passw, status, created, updated) VALUES ('b0939f24-6daa-413b-82f9-41436263e115', 'varkcoll1', '$2a$04$ucRTQeYXa7bDCw..4iL9U.U44oIk/xRL8I3fzbj3z/g9SaKKIKfFS', true, '2023-08-13 23:15:38.408421+02', '2023-08-13 23:15:38.408421+02');
INSERT INTO public.identity (id, user_name, passw, status, created, updated) VALUES ('9d80b09b-a6bd-48a6-90c5-b493e98e1e10', 'bbydaway2', '$2a$04$5N7dgv5tGjp4v4AEmTMZ6eEy641U4COL6ZnYxQv7Eq4nF8HAezfoe', true, '2023-08-13 23:15:38.408421+02', '2023-08-13 23:15:38.408421+02');
INSERT INTO public.identity (id, user_name, passw, status, created, updated) VALUES ('426d80d3-967a-4fde-812e-5e0dd739b59c', 'hcrumbie3', '$2a$04$09A4X5yWlX.dFmsUrLBFyeHiscHfNgG2U5ZfBdudHmbutiBb7Lqia', true, '2023-08-13 23:15:38.408421+02', '2023-08-13 23:15:38.408421+02');
INSERT INTO public.identity (id, user_name, passw, status, created, updated) VALUES ('5901075d-9930-48cf-ab09-465e9cb881c4', 'gcurnucke4', '$2a$04$jOpSCVR3oCPsl/csIos8p.bxGL5l5UAqLdJwJoJO5G9F32VFVEjfW', true, '2023-08-13 23:15:38.408421+02', '2023-08-13 23:15:38.408421+02');
INSERT INTO public.identity (id, user_name, passw, status, created, updated) VALUES ('47334926-d410-4361-9dd4-3b4937e01ce6', 'omaggorini5', '$2a$04$igI.6bWHt4eH3ioaVQQDVuFpg0MDaeBIQRrhfcE7mphQZGnGgDNRy', true, '2023-08-13 23:15:38.408421+02', '2023-08-13 23:15:38.408421+02');
INSERT INTO public.identity (id, user_name, passw, status, created, updated) VALUES ('8de7429a-bb21-43dd-8223-3935ed6ca021', 'bmorfey6', '$2a$04$n7Wc4Jyg7xvvZKAi8jzMG.jjB5q7HOZm2a6q4C1U0JH7ZQEHopQpC', true, '2023-08-13 23:15:38.408421+02', '2023-08-13 23:15:38.408421+02');
INSERT INTO public.identity (id, user_name, passw, status, created, updated) VALUES ('5fbcfaa8-d934-425f-bd0a-5dc60631c3c5', 'jvideneev7', '$2a$04$drlnx0ZoP8fjYwSmbmFP9uwHUXuZiVtLoDB3qzJav17vSaYxy93ci', true, '2023-08-13 23:15:38.408421+02', '2023-08-13 23:15:38.408421+02');
INSERT INTO public.identity (id, user_name, passw, status, created, updated) VALUES ('d37ab723-494e-4aac-a7c7-c8028dd20daa', 'bcannam8', '$2a$04$YsNbwwABWj70M1MHcudo8OlvYZCNbCN4dE1Jbb9vNZ5glJS3DX1VW', true, '2023-08-13 23:15:38.408421+02', '2023-08-13 23:15:38.408421+02');


COMMIT;
