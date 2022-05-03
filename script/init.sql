
CREATE TABLE characters (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(100),
    pic VARCHAR(200),
    homeworld VARCHAR(100)
);

INSERT INTO characters(id,name,pic,homeworld) VALUES (1,'Luke Skywalker','https://vignette.wikia.nocookie.net/starwars/images/2/20/LukeTLJ.jpg','tatooine');
INSERT INTO characters(id,name,pic,homeworld) VALUES (2,'C-3PO','https://vignette.wikia.nocookie.net/starwars/images/3/3f/C-3PO_TLJ_Card_Trader_Award_Card.png','tatooine');
INSERT INTO characters(id,name,pic,homeworld) VALUES (3,'R2-D2','https://vignette.wikia.nocookie.net/starwars/images/e/eb/ArtooTFA2-Fathead.png','naboo');
INSERT INTO characters(id,name,pic,homeworld) VALUES (4,'Darth Vader','https://vignette.wikia.nocookie.net/fr.starwars/images/3/32/Dark_Vador.jpg','tatooine');
INSERT INTO characters(id,name,pic,homeworld) VALUES (5,'Leia Organa','https://vignette.wikia.nocookie.net/starwars/images/f/fc/Leia_Organa_TLJ.png','alderaan');
INSERT INTO characters(id,name,pic,homeworld) VALUES (6,'Owen Lars','https://vignette.wikia.nocookie.net/starwars/images/e/eb/OwenCardTrader.png','tatooine');
INSERT INTO characters(id,name,pic,homeworld) VALUES (7,'Beru Whitesun lars','https://vignette.wikia.nocookie.net/starwars/images/c/cc/BeruCardTrader.png','tatooine');
INSERT INTO characters(id,name,pic,homeworld) VALUES (8,'R5-D4','https://vignette.wikia.nocookie.net/starwars/images/c/cb/R5-D4_Sideshow.png','tatooine');
INSERT INTO characters(id,name,pic,homeworld) VALUES (9,'Biggs Darklighter','https://vignette.wikia.nocookie.net/starwars/images/0/00/BiggsHS-ANH.png','tatooine');
INSERT INTO characters(id,name,pic,homeworld) VALUES (10,'Obi-Wan Kenobi','https://vignette.wikia.nocookie.net/starwars/images/4/4e/ObiWanHS-SWE.jpg','stewjon');
INSERT INTO characters(id,name,pic,homeworld) VALUES (11,'Anakin Skywalker','https://vignette.wikia.nocookie.net/starwars/images/6/6f/Anakin_Skywalker_RotS.png','tatooine');
INSERT INTO characters(id,name,pic,homeworld) VALUES (12,'Wilhuff Tarkin','https://vignette.wikia.nocookie.net/starwars/images/c/c1/Tarkininfobox.jpg','eriadu');
INSERT INTO characters(id,name,pic,homeworld) VALUES (13,'Chewbacca','https://vignette.wikia.nocookie.net/starwars/images/4/48/Chewbacca_TLJ.png','kashyyyk');
INSERT INTO characters(id,name,pic,homeworld) VALUES (14,'Han Solo','https://vignette.wikia.nocookie.net/starwars/images/e/e2/TFAHanSolo.png','corellia');
INSERT INTO characters(id,name,pic,homeworld) VALUES (15,'Greedo','https://vignette.wikia.nocookie.net/starwars/images/c/c6/Greedo.jpg','Rodia');
INSERT INTO characters(id,name,pic,homeworld) VALUES (16,'Jabba Desilijic Tiure','https://vignette.wikia.nocookie.net/starwars/images/7/7f/Jabba_SWSB.png','tatooine');
INSERT INTO characters(id,name,pic,homeworld) VALUES (18,'Wedge Antilles','https://vignette.wikia.nocookie.net/starwars/images/6/60/WedgeHelmetless-ROTJHD.jpg','corellia');
INSERT INTO characters(id,name,pic,homeworld) VALUES (19,'Jek Tono Porkins','https://vignette.wikia.nocookie.net/starwars/images/e/eb/JekPorkins-DB.png','bestine');
INSERT INTO characters(id,name,pic,homeworld) VALUES (20,'Yoda','https://vignette.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png',NULL);
INSERT INTO characters(id,name,pic,homeworld) VALUES (21,'Palpatine','https://vignette.wikia.nocookie.net/starwars/images/d/d8/Emperor_Sidious.png','naboo');

CREATE TABLE users (
    id INT PRIMARY KEY NOT NULL,
    username VARCHAR(40) NOT NULL,
    password VARCHAR(50)
);

CREATE TABLE tokens (
    value VARCHAR(200) PRIMARY KEY NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expire_on TIMESTAMP NOT NULL,
    id_user INT REFERENCES users(id)
);

CREATE TABLE votes ( -- change on this table impact the "organization" of the vote (eg: vote one or may times ?)
    id INT PRIMARY KEY NOT NULL,
    id_char INT REFERENCES charActers(id),
    id_voter INT REFERENCES users(id),
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)