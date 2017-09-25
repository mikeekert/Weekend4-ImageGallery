CREATE TABLE "public"."imagegallery" (
    "id" serial,
    "name" text,
    "likes" integer,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."comments" (
    "id" serial,
    "comment" varchar(200),
    "image_id" integer,
    PRIMARY KEY ("id"),
    CONSTRAINT "name" FOREIGN KEY ("image_id") REFERENCES "public"."gallery"("id") ON DELETE CASCADE
);
