CREATE TABLE "public"."imagegallery" (
    "id" serial,
    "name" text,
    "likes" integer,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."comments1" (
    "id" serial,
    "comment" varchar(200),
    "name" text,
    PRIMARY KEY ("id"),
);
