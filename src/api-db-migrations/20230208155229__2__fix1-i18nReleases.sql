-- migrate:up

INSERT INTO public."i18nReleases" ("releaseVersion", lang) VALUES (1, 'en') ON CONFLICT DO NOTHING;
INSERT INTO public."i18nReleases" ("releaseVersion", lang) VALUES (0, 'id') ON CONFLICT DO NOTHING;
INSERT INTO public."i18nReleases" ("releaseVersion", lang) VALUES (1, 'de') ON CONFLICT DO NOTHING;
INSERT INTO public."i18nReleases" ("releaseVersion", lang) VALUES (0, 'de') ON CONFLICT DO NOTHING;
INSERT INTO public."i18nReleases" ("releaseVersion", lang) VALUES (0, 'en') ON CONFLICT DO NOTHING;
INSERT INTO public."i18nReleases" ("releaseVersion", lang) VALUES (2, 'en') ON CONFLICT DO NOTHING;

INSERT INTO db_version (version, comment) VALUES ('2_0.1.504-fix1-i18nReleases.sql', 'Add i18nReleases');
