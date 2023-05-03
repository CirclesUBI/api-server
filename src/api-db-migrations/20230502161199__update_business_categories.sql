-- migrate:up

TRUNCATE TABLE "BusinessCategory";

INSERT INTO "BusinessCategory" (name) VALUES ('dapps.o-marketlisting.pages.marketlisting.category.TokoKelontong'),('dapps.o-marketlisting.pages.marketlisting.category.MakananMinuman'),('dapps.o-marketlisting.pages.marketlisting.category.KebunPertanian'),('dapps.o-marketlisting.pages.marketlisting.category.HasilLaut'),('dapps.o-marketlisting.pages.marketlisting.category.AlatPerangkat'),('dapps.o-marketlisting.pages.marketlisting.category.Upakara'),('dapps.o-marketlisting.pages.marketlisting.category.Utilitas'),('dapps.o-marketlisting.pages.marketlisting.category.KesehatanPengobatan'),('dapps.o-marketlisting.pages.marketlisting.category.TransportasiAngkut'),('dapps.o-marketlisting.pages.marketlisting.category.PerbaikanKonstruksi'),('dapps.o-marketlisting.pages.marketlisting.category.SalonTukangCukur'),('dapps.o-marketlisting.pages.marketlisting.category.PenjahitLaundry'),('dapps.o-marketlisting.pages.marketlisting.category.PendidikanLes');

-- migrate:down
