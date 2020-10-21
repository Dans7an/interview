CREATE TABLE "public"."user_movie"("user_id" integer NOT NULL, "movie_id" integer NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("user_id","movie_id") );
