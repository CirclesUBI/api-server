-- migrate:up

UPDATE "BusinessCategory" SET name = 'dapps.o-marketlisting.pages.marketlisting.category.TokoKelontong' WHERE id = 1; 
UPDATE "BusinessCategory" SET name = 'dapps.o-marketlisting.pages.marketlisting.category.MakananMinuman' WHERE id = 2; 
UPDATE "BusinessCategory" SET name = 'dapps.o-marketlisting.pages.marketlisting.category.KebunPertanian' WHERE id = 3; 
UPDATE "BusinessCategory" SET name = 'dapps.o-marketlisting.pages.marketlisting.category.HasilLaut' WHERE id = 4; 
UPDATE "BusinessCategory" SET name = 'dapps.o-marketlisting.pages.marketlisting.category.AlatPerangkat' WHERE id = 5; 
UPDATE "BusinessCategory" SET name = 'dapps.o-marketlisting.pages.marketlisting.category.Upakara' WHERE id = 6; 
UPDATE "BusinessCategory" SET name = 'dapps.o-marketlisting.pages.marketlisting.category.Utilitas' WHERE id = 7; 
UPDATE "BusinessCategory" SET name = 'dapps.o-marketlisting.pages.marketlisting.category.KesehatanPengobatan' WHERE id = 8; 
UPDATE "BusinessCategory" SET name = 'dapps.o-marketlisting.pages.marketlisting.category.TransportasiAngkut' WHERE id = 9; 
UPDATE "BusinessCategory" SET name = 'dapps.o-marketlisting.pages.marketlisting.category.PerbaikanKonstruksi' WHERE id = 10 ; 
UPDATE "BusinessCategory" SET name = 'dapps.o-marketlisting.pages.marketlisting.category.SalonTukangCukur' WHERE id = 11; 
UPDATE "BusinessCategory" SET name = 'dapps.o-marketlisting.pages.marketlisting.category.PenjahitLaundry' WHERE id = 12; 
UPDATE "BusinessCategory" SET name = 'dapps.o-marketlisting.pages.marketlisting.category.PendidikanLes' WHERE id = 13; 

-- migrate:down
