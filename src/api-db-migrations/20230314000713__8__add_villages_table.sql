-- migrate:up

DROP TABLE IF EXISTS BaliVillage;

CREATE TABLE "BaliVillage" (
	id serial PRIMARY KEY,
	desa VARCHAR(255) UNIQUE NOT NULL,
	kecamatan VARCHAR(255) NOT NULL,
	kabupaten VARCHAR(255) NOT NULL
);
