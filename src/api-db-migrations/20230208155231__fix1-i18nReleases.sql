-- migrate:up

-- Add i18nReleases

INSERT INTO public."i18nReleases" ("releaseVersion", lang) VALUES (1, 'en') ON CONFLICT DO NOTHING;
INSERT INTO public."i18nReleases" ("releaseVersion", lang) VALUES (0, 'id') ON CONFLICT DO NOTHING;
INSERT INTO public."i18nReleases" ("releaseVersion", lang) VALUES (1, 'de') ON CONFLICT DO NOTHING;
INSERT INTO public."i18nReleases" ("releaseVersion", lang) VALUES (0, 'de') ON CONFLICT DO NOTHING;
INSERT INTO public."i18nReleases" ("releaseVersion", lang) VALUES (0, 'en') ON CONFLICT DO NOTHING;
INSERT INTO public."i18nReleases" ("releaseVersion", lang) VALUES (2, 'en') ON CONFLICT DO NOTHING;

-- migrate:down
