-- migrate:up

COPY public."BusinessCategory" (id, name) FROM stdin;
1       dapps.o-marketlisting.pages.marketlisting.category.TokoKelontong
2       dapps.o-marketlisting.pages.marketlisting.category.MakananMinuman
3       dapps.o-marketlisting.pages.marketlisting.category.KebunPertanian
4       dapps.o-marketlisting.pages.marketlisting.category.HasilLaut
5       dapps.o-marketlisting.pages.marketlisting.category.AlatPerangkat
6       dapps.o-marketlisting.pages.marketlisting.category.Upakara
7       dapps.o-marketlisting.pages.marketlisting.category.Utilitas
8       dapps.o-marketlisting.pages.marketlisting.category.KesehatanPengobatan
9       dapps.o-marketlisting.pages.marketlisting.category.TransportasiAngkut
10      dapps.o-marketlisting.pages.marketlisting.category.PerbaikanKonstruksi
11      dapps.o-marketlisting.pages.marketlisting.category.SalonTukangCukur
12      dapps.o-marketlisting.pages.marketlisting.category.PenjahitLaundry
13      dapps.o-marketlisting.pages.marketlisting.category.PendidikanLes
\.

-- migrate:down
