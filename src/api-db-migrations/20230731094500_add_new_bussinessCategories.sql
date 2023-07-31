-- migrate:up
INSERT INTO public."BusinessCategory"(name)
  VALUES ('dapps.o-marketlisting.pages.marketlisting.category.JasaPenitipanAnak');

INSERT INTO public."BusinessCategory"(name)
  VALUES ('dapps.o-marketlisting.pages.marketlisting.category.JasaPanjatPohon');

INSERT INTO public."BusinessCategory"(name)
  VALUES ('dapps.o-marketlisting.pages.marketlisting.category.Lainnya');

-- migrate:down
